import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';

import COLORS from '../../../const/color';
import { BASE_URL } from '../../../config';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import { useNavigation } from '@react-navigation/native';


const ImageProfil = () => {
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

    const kirim_file = async (files) => {
      try {
        if (!files) {
          Alert.alert('No file selected', 'Please select a file to upload.');
          return;
        }
    
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        const formDatas = new FormData();
        formDatas.append('file', {
          uri: files.uri,
          name: files.fileName || 'default.jpg',
          type: files.type || 'image/jpeg',
        });
        console.log(`${url}upload_foto`);
        console.log('File URI:', files.uri);
        console.log('File Name:', files.fileName);
        console.log('File Type:', files.type);
        console.log('formDatas:', formDatas);
    
        const response = await axios.post(`${url}upload_foto`, formDatas, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
          }
        });
    
        console.log('File', response.data);
        fetchprofil();
    
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };
    // Image Profile handler
    const pickImage = () => {
      Alert.alert(
        "Pilih Sumber Gambar",
        "Pilih Kamera Atau Galeri",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Camera",
            onPress: () => launchCamera({ mediaType: 'photo', quality: 1 }, async (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
              } else {
                // setFile(response.assets[0]);
              const resizedImage = await ImageResizer.createResizedImage(response.assets[0].uri, 800, 600, 'JPEG', 80);
              console.log('resizedImage',resizedImage);

                kirim_file(resizedImage);
              }
            })
          },
          {
            text: "Gallery",
            onPress: () => launchImageLibrary({ mediaType: 'photo', quality: 1 },async (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
              } else {
                const resizedImage = await ImageResizer.createResizedImage(response.assets[0].uri, 800, 600, 'JPEG', 80);
                console.log('resizedImage',resizedImage);
                kirim_file(resizedImage);
              }
            })
          }
        ],
        { cancelable: true }
      );
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

export default ImageProfil;
