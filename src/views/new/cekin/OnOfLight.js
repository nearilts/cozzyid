import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, StyleSheet, Linking } from 'react-native';
import COLORS from '../../../const/color';
import * as Clipboard from 'expo-clipboard';
import { BASE_URL, URLS } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const OnOfLight = ({navigation, route}) => {
  const item = route.params;
  const url = BASE_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [profil, setProfil] = useState([]);
    
    const setData = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            console.log(`${url}listDevicesThing`);

            let token = userInfo.access_token.split('|')[1];
            const response = await axios.get(`${url}listDevicesThing/${item.light.deviceid}`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('response', response.data);
            setProfil(response.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setData();
        });
        setData();

        return unsubscribe;
    }, [navigation]);



  const fetchProfil = async () => {
    setIsLoading(true);

    try {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        const response = await axios.post(`${url}nyala/${item.token}/${profil?.params.switch}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('response lampu', response.data.cek.data);
            setProfil(response.data.cek.data);
            Alert.alert("Lampu ", response.data.cek.data.params.switch);
        setIsLoading(false);

    } catch (error) {
      setIsLoading(false);

        console.error(error);
    }
};
  console.log(route.params)
  const handleOpenDoor = () => {
    fetchProfil()
    
  };

  const handleCopyLink = () => {
    Clipboard.setStringAsync(URLS+'light/' +item.token);

    Alert.alert("Copy Link", "Link has been copied!");
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <Text style={styles.headerText}>{item.light.device_name}</Text>
      <Text style={styles.subText}>Klik Tombol Lampu</Text>
      
      <TouchableOpacity
        style={profil?.params?.switch === 'on' ? styles.lockButton : styles.lockButtonoff}
        onPress={handleOpenDoor}
      >
        <Text style={styles.lockText}>Lampu {profil?.params?.switch ?? 'tidak tersedia'}</Text>
      </TouchableOpacity>
      
      <View style={styles.passwordBox}>
      <Text style={styles.warningText}>Klik Tombol Lampu Untuk On/Off Lampu</Text>
      </View>
      
      <TouchableOpacity style={styles.copyLinkButton} onPress={handleCopyLink}>
        <Text style={styles.copyLinkText}>Copy Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:COLORS.dark
  },
  subText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  lockButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00796b',
  },
  
  lockButtonoff: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00796b',
  },
  lockText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  passwordBox: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#d32f2f',
  },
  copyLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius:10,
    backgroundColor:COLORS.primary
  },
  copyLinkText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default OnOfLight;
