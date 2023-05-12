import React, { useState, useEffect, useRef } from "react";
import { View, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import NotificationModal from "./NotificationModal";
import { setTokenApi } from "../api/BackEnd";
import useAuth from "../hooks/useAuth";
import { APP_URL } from "../assets/Const";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationApp(props) {
  const { children } = props;
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  const acept = (url) => {
    Linking.openURL(APP_URL + url);
    setShowModal(false);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response?.notification?.request?.content?.body) {
          setShowModal(true);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  React.useEffect(() => {
    if (notification?.request?.trigger) {
      setShowModal(true);
    }
  }, [notification]);

  React.useEffect(() => {
    if (expoPushToken) {
      setToken = async () => {
        try {
          const response = await setTokenApi(
            expoPushToken,
            auth?.user?.username
          );
        } catch (error) {
          console.error(error);
        }
      };
      setToken();
    }
  }, [expoPushToken]);

  return (
    <View style={{ flex: 1 }}>
      <NotificationModal
        visible={showModal}
        title={notification?.request?.content?.title}
        body={notification?.request?.content?.body}
        acept={() => acept(notification?.request?.content?.data?.url)}
      />

      {children}
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync({
        projectId: "7567f58a-32d8-4b82-afae-6f660735ed8a",
      });
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
