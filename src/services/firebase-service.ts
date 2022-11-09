import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import ROUTES from '../navigation/config/routes';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Event, EventType} from '@notifee/react-native/src/types/Notification';
import NotificationSounds, {Sound} from 'react-native-notification-sounds';
import {AndroidLaunchActivityFlag} from '@notifee/react-native/src/types/NotificationAndroid';
import { navigate } from '../navigation/navigate';

export class FirebaseService {
  private sounds: Sound[] = [];

  private static channelId = 'slavi-wallet-channel';
  private static channelName = 'slavi-wallet-channel';

  constructor() {
    messaging().onMessage(this.onMessage.bind(this));
    messaging().onNotificationOpenedApp(FirebaseService.onOpen);

    notifee.onForegroundEvent(FirebaseService.onLocalNotification);
    notifee.onBackgroundEvent(FirebaseService.onLocalNotification);
  }

  async init() {
    await this.requestPermission();

    this.sounds = await NotificationSounds.getNotifications('notification');

    if(!await notifee.isChannelCreated('slavi-wallet-channel')) {
      await notifee.createChannel({
        id: FirebaseService.channelId,
        name: FirebaseService.channelName,
        sound: this.sounds[0].url,
        vibration: true,
        vibrationPattern: [300, 500],
        badge: true,
        importance: AndroidImportance.HIGH,
      });
    }

    await FirebaseService.processInitialNotification();

    await notifee.setBadgeCount(0);
  }

  async requestPermission() {
    await notifee.requestPermission();

    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  async getToken() {
    return messaging().getToken();
  }

  async deleteToken() {
    return messaging().deleteToken();
  }

  onTokenRefresh(listener: (token: string) => void) {
    messaging().onTokenRefresh(listener);
  }

  private async onMessage(message: FirebaseMessagingTypes.RemoteMessage): Promise<void> {
    if(!message.notification?.body) {
      return;
    }

    await notifee.displayNotification({
      title: message.notification?.title,
      body: message.notification?.body,
      android: {
        sound: this.sounds[0].url,
        channelId: FirebaseService.channelId,
        vibrationPattern: [300, 500],
        pressAction: {
          id: message.messageId || 'default',
          launchActivity: 'com.defiwalletmobile.MainActivity',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP]
        }
      },
      ios: {
        sound: this.sounds[0].url,
        foregroundPresentationOptions: {
          alert: true,
          badge: false,
          sound: true,
        },
      },
      data: message.data,
    });

  }

  private static onOpen(message: FirebaseMessagingTypes.RemoteMessage): void {
    FirebaseService.navigateNotification(message.data);
  }

  private static async onLocalNotification(notification: Event) {
    console.log('onLocalNotification', notification)
    await notifee.setBadgeCount(0);
    if(notification.type === EventType.PRESS) {
      FirebaseService.navigateNotification(notification.detail.notification?.data);
    }
  }

  private static async navigateNotification(data?: { [key: string]: string }) {
    console.log('navigateNotification: ', data)
    if(!data?.type) {
      return;
    }

    switch (data?.type) {
      case 'operations':
        navigate(ROUTES.TABS.OPERATIONS);
        if(data?.operationId) {
          navigate(ROUTES.TABS.OPERATIONS, {
            screen: ROUTES.OPERATIONS.DETAILS,
            params: {
              id: +data.operationId,
            }
          });
        }
        break;
      case 'swap':
        navigate(ROUTES.TABS.SWAP);
        break;
      case 'main':
        navigate(ROUTES.TABS.COINS);
        break;
    }
  }

  private static async processInitialNotification() {
    const initialNotification  = await notifee.getInitialNotification();
    if(initialNotification && initialNotification.notification?.data?.type) {
      FirebaseService.navigateNotification(initialNotification.notification.data);
    }

    const remoteInitialNotification = await messaging().getInitialNotification();
    FirebaseService.navigateNotification(remoteInitialNotification?.data)
  }

}
