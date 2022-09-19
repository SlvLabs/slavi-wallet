import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import ROUTES from '../navigation/config/routes';
import notifee, {AndroidImportance, AuthorizationStatus} from '@notifee/react-native';
import {Event} from '@notifee/react-native/src/types/Notification';
import NotificationSounds, {Sound} from 'react-native-notification-sounds';

export type NavigationFunction = (route: string) => void;

export class FirebaseService {
  private readonly navigation: NavigationFunction;
  private sounds: Sound[] = [];

  private static channelId = 'slavi-wallet-channel';
  private static channelName = 'slavi-wallet-channel';

  constructor(navigation: NavigationFunction) {
    this.navigation = navigation;
  }

  async init() {
    messaging().onMessage(this.onMessage.bind(this));
    messaging().onNotificationOpenedApp(this.onOpen.bind(this));

    this.sounds = await NotificationSounds.getNotifications('notification');

    await notifee.requestPermission();

    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
    }

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

    notifee.onForegroundEvent(this.onLocalNotification.bind(this));
    notifee.onBackgroundEvent(this.onLocalNotification.bind(this));

    // TODO: process initial notification
  }

  async requestPermission() {
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
    console.log('token: ', await messaging().getToken())
    return messaging().getToken();
  }

  onTokenRefresh(listener: (token: string) => void) {
    messaging().onTokenRefresh(listener);
  }

  private onOpen(message: FirebaseMessagingTypes.RemoteMessage): void {
    console.log('initial message', message);
    this.navigate(message?.data?.type);
  }

  private async onMessage(message: FirebaseMessagingTypes.RemoteMessage): Promise<void> {
    console.log(message)
    if(!message.notification?.body) {
      return;
    }

    await notifee.displayNotification({
      title: message.notification?.title,
      body: message.notification?.body,
      android: {
        sound: this.sounds[0].url,
        channelId: FirebaseService.channelId,
        pressAction: {
          id: message.messageId || 'default',
          launchActivity: message.data?.type,
        },
        vibrationPattern: [300, 500],
      },
      ios: {
        badgeCount: 1,
        sound: this.sounds[0].url,
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      },
      data: message.data,
    });

    console.log('new message',message);
  }

  private async onLocalNotification(notification: Event) {
    console.log('NOTIFICATION', notification);
    this.navigate(notification.detail.pressAction?.launchActivity);
  }

  private navigate(notificationType?: string) {
    console.log('NAVIGATE:', notificationType);
    if(!this.navigation) {
      return;
    }

    switch (notificationType) {
      case 'operations':
        this.navigation(ROUTES.TABS.OPERATIONS);
        break;
      case 'swap':
        this.navigation(ROUTES.TABS.SWAP);
        break;
      case 'main':
        this.navigation(ROUTES.TABS.COINS);
        break;
    }
  }

}
