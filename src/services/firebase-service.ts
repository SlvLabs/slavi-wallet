import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import PushNotification, {Importance, ReceivedNotification} from 'react-native-push-notification';
import {NavigationContainerRef} from '@react-navigation/core/src/types';
import ROUTES from '../navigation/config/routes';

export type NavigationFunction = (route: string) => void;

export class FirebaseService {
  private readonly navigation: NavigationFunction;

  constructor(navigation: NavigationFunction) {
    this.navigation = navigation;
  }

  init() {
    messaging().onMessage(this.onMessage.bind(this));
    messaging().onNotificationOpenedApp(this.onOpen.bind(this));

    PushNotification.channelExists('slavi-channel-id', (exists) => {
      if(exists) {
        return;
      }

      PushNotification.createChannel(
        {
          channelId: "slavi-channel-id",
          channelName: 'slavi wallet channel',
          soundName: "default",
          importance: Importance.HIGH,
          vibrate: true,
        },
        () => {}
      );
    });

    PushNotification.configure({
      onAction: this.onLocalNotification.bind(this),
    });
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
    return messaging().getToken();
  }

  onTokenRefresh(listener: (token: string) => void) {
    messaging().onTokenRefresh(listener);
  }

  private onOpen(message: FirebaseMessagingTypes.RemoteMessage): void {
    console.log('initial message', message);
    this.navigate(message?.data?.type);
  }

  private onMessage(message: FirebaseMessagingTypes.RemoteMessage): void {
    if(!message.notification?.body) {
      return;
    }

    PushNotification.localNotification({
      channelId: 'slavi-channel-id',
      ticker: 'My Notification Ticker',
      title: message.notification?.title,
      message: message.notification?.body,
      userInfo: message.data,
    });

    console.log('new message',message);
  }

  private onLocalNotification(notification: ReceivedNotification) {
    console.log(notification)
    console.log("NOTIFICATION:", notification);
  }

  private navigate(notificationType?: string) {
    console.log(notificationType);
    if(!this.navigation) {
      return;
    }

    console.log('navigate');
    this.navigation(ROUTES.OPERATIONS.LIST);
  }

}
