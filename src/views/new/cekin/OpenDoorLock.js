import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, StyleSheet, Image, SafeAreaView } from 'react-native';
import COLORS from '../../../const/color';
import * as Clipboard from 'expo-clipboard';
import { BASE_URL, URLS } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import BackButtonHeader from '../../../component/BackButtonHeader';

const OpenDoorLock = ({navigation, route}) => {
  const item = route.params;
  const url = BASE_URL;
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfil = async () => {
    setIsLoading(true);

    try {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        const response = await axios.post(`${url}openDoor/${item.token}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('response', response.data.data.no_kamar);
        Alert.alert("Buka Pintu", (response.data.data.no_kamar));
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
    Clipboard.setStringAsync(URLS+'cekin/' +item.token);

    Alert.alert("Copy Link", "Link has been copied!");
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <BackButtonHeader title="Door Lock" backgroundColor={COLORS.primary} arrowColor="#fff" />

    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <Text style={styles.headerText}>{item.room.name}</Text>
      <Text style={styles.subText}>Klik Tombol Buka Pintu</Text>
      
      <TouchableOpacity style={styles.lockButton} onPress={handleOpenDoor}>
      <Image
            source={require('../../../assets/images/doorlock.png')}
            resizeMode='contain'
            style={{
              width: 120,
              height: 120,
                
            }}
        />
        {/* <Text style={styles.lockText}>Buka Pintu</Text> */}
      </TouchableOpacity>
      
      <View style={styles.passwordBox}>
      {item.room.tipe === 'Bardi' ? (
        <Text style={styles.warningText}>Klik Buka Pintu untuk mendapatkan password</Text>
      ) : item.room.tipe === 'Cirlo' ? (
        <Text style={styles.warningText}>Tekan angka 000 di pintu kemudian klik tombol di atas</Text>
      ) : (
        <Text style={styles.warningText}>Room tipe tidak dikenal</Text>
      )}
      </View>
      
      <TouchableOpacity style={styles.copyLinkButton} onPress={handleCopyLink}>
        <Text style={styles.copyLinkText}>Copy Link</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>

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
    backgroundColor: '#e0f7fa',
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

export default OpenDoorLock;
