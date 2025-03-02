import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';

import COLORS from '../../../const/color';
import { BASE_URL } from '../../../config';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ImageResizer from 'react-native-image-resizer';
import * as FileSystem from 'expo-file-system';

const ProfilFoto = () => {
        const navigation = useNavigation();
    const url = BASE_URL;
    const [profil, setprofil] = useState({})
    const fetchprofil = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]
            const response = await axios.get(`${url}auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response.data)
            setprofil(response.data.data)

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchprofil();
        });
        fetchprofil();

        return unsubscribe;
    }, [navigation]);


    console.log('profil', profil)


  const renderProfile = () => {
    const [image, setImage] = useState(profil.avatar_url)

    
  const kirim_file = async (file) => {
    try {
      if (!file || !file.uri) {
        Alert.alert('No file selected', 'Please select a file to upload.');
        return;
      }

      // Cek apakah file benar-benar ada di penyimpanan
      const fileInfo = await FileSystem.getInfoAsync(file.uri);
      if (!fileInfo.exists) {
        Alert.alert('File Not Found', 'The selected file does not exist.');
        return;
      }

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];

      const formDatas = new FormData();
      const fileBlob = {
        uri: file.uri,
        name: file.name || file.uri.split('/').pop(), // Ambil nama file dari URI jika tidak ada
        type: file.type || 'image/jpeg',
      };

      formDatas.append('file', fileBlob);

      console.log('Uploading to:', `${url}upload_foto`);
      console.log('File URI:', file.uri);
      console.log('File Name:', fileBlob.name);
      console.log('File Type:', fileBlob.type);
      console.log('FormData:', formDatas);

      const response = await axios.post(`${url}upload_foto`, formDatas, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',

        },
      });

      console.log('Upload Success:', response.data);
      fetchprofil();

    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
    // Image Profile handler
    const pickImage = async () => {
      Alert.alert(
        "Pilih Sumber Gambar",
        "Pilih Kamera atau Galeri",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Camera",
            onPress: async () => {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert("Izin Ditolak", "Aplikasi membutuhkan izin untuk mengakses kamera.");
                return;
              }
    
              try {
                const result = await ImagePicker.launchCameraAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 1,
                  allowsEditing: true,
                });
    
                if (!result.canceled) {
                  // const resizedImage = await ImageResizer.createResizedImage(result.assets[0].uri, 800, 600, 'JPEG', 80);
                  // console.log('Resized Image:', resizedImage);
                  kirim_file(result.assets[0]);
                }
              } catch (error) {
                console.error("Error membuka kamera:", error);
              }
            },
          },
          {
            text: "Gallery",
            onPress: async () => {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert("Izin Ditolak", "Aplikasi membutuhkan izin untuk mengakses galeri.");
                return;
              }
    
              try {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 1,
                  allowsEditing: true,
                });
    
                if (!result.canceled) {
                  // const resizedImage = await ImageResizer.createResizedImage(result.assets[0].uri, 800, 600, 'JPEG', 80);
                  // console.log('Resized Image:', resizedImage);
                  kirim_file(result.assets[0]);
                }
              } catch (error) {
                console.error("Error membuka galeri:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
    };

    return (
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={{ alignItems:'center'}}>
          <Image
            source={{uri : profil.avatar_url}}
            resizeMode='cover'
            style={{width:80, height:80, borderRadius:50}}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={{
                width: 25,
                height: 25,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                position: "absolute",
                right: 0,
                bottom: 2
            }}>
            <MaterialIcons name="edit" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginLeft: 15 }}>
            <Text style={{fontSize:18, color:COLORS.dark, fontWeight:'bold'}}>{profil.first_name}</Text>
            <Text style={{ color:COLORS.dark,}}>{profil.name}</Text>
            <Text style={{ color:COLORS.dark,}}>{profil.email}</Text>
            <Text style={{ color:COLORS.dark,fontWeight: 'bold'}}>Point Credit : {formatPrice(profil.credit_balance)}</Text>
        </View>
        <View style={{ marginRight: 15 }}>
             <TouchableOpacity
                onPress={pickImage}>
                <MaterialIcons name="arrow-forward-ios" size={30} color={COLORS.grey} />
            </TouchableOpacity>
        </View>
        
      </View>
    )
  }

  
    return (
        <View style={{}}>
           {renderProfile()}
        </View>
    );
};

const styles = StyleSheet.create({
 
});

export default ProfilFoto;
