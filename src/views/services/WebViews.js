import React, { useEffect, useState } from 'react';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import COLORS from '../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViews = ({ navigation, route }) => {
  const [token, setToken] = useState(null);
  const uri = route.params;

  useEffect(() => {
    const getToken = async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const userToken = parsedUserInfo.access_token.split('|')[1];
        setToken(userToken);
      }
    };

    getToken();
  }, []);

  const handleHomePress = () => {
    navigation.navigate('MainTab');
  };

  if (!token) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, top: 20, marginBottom: 20 }}>
      <TouchableOpacity
        onPress={handleHomePress}
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
          backgroundColor: COLORS.primary,
          width: 150,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Text style={{ color: COLORS.white, fontSize: 16 }}>Back To Home</Text>
      </TouchableOpacity>
      <WebView
        source={{
          uri,
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default WebViews;
