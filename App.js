import React, { useEffect } from "react";
import "react-native-gesture-handler";
import Navigation from "./src/component/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";
import Constants from "expo-constants";
import { enableScreens } from 'react-native-screens';
const App = () => {
  enableScreens();
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert("Permission required", "Please enable notifications");
          return;
        }

        // Dapatkan token Expo Push Notification
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);
      } else {
        Alert.alert("Error", "Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
