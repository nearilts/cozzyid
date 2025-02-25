import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BASE_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageProfil from './ImageProfil';

export default function UpdateProfil({navigation}) {
    const url = BASE_URL;
    const [profil, setprofil] = useState({})
  const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        new_password: '',
        password: '',
    });

      const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
      };
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
            setFormData({
              ...formData,
              phone: response.data.data.phone,
              name: response.data.data.name,
          });
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
    const HandledLogout = () => {
        console.log('Form Data:', formData);
        kirimdata()
        
      };

      const kirimdata = async () => {
        try {
          setIsLoading(true)
          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);
          let token = userInfo.access_token.split('|')[1];
          console.log('formData', formData);
    
          const response = await axios.post(`${url}update_profil`, {
            name: formData.name,
            phone: formData.phone,
            new_password: formData.new_password,
            password: formData.password,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsLoading(false)
    
          console.log('response', response.data);
          if (response.data.code == 1) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error(error);
          setIsLoading(false)
        }
      };
    return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor={COLORS.transparent} />
        <View style={{marginLeft: 10, flexDirection: "row", width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
            <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={navigation.goBack} />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginLeft: 120, marginTop: 5, fontSize: 18, color: COLORS.dark }}>Ubah Profil</Text>
            </View>
        </View>
      <ScrollView>
               
          <View style={{ alignItems: 'center', top: 10 }}>
            <ImageProfil />
                <View style={{
                    backgroundColor: COLORS.white,
                    width: '90%',
                    borderRadius: 10,
                    padding: 10,
                    marginBottom:10
                }}>
                <View style={{ marginTop: 5 }}>
                    <Text style={style.labels}>Nama Pengguna</Text>
                    <TextInput
                        style={style.inputs}
                        defaultValue={profil.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={style.labels}>Nama Depan</Text>
                        <TextInput
                            style={style.inputdisables}
                            defaultValue={profil.first_name}
                            multiline={true}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={style.labels}>Nama Akhir</Text>
                        <TextInput
                            style={style.inputdisables}
                            defaultValue={profil.last_name}
                            multiline={true}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={style.labels}>Email</Text>
                        <TextInput
                            style={style.inputdisables}
                            defaultValue={profil.email}
                            multiline={true}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={style.labels}>Phone</Text>
                        <TextInput
                            style={style.inputs}
                            defaultValue={profil.phone}
                            onChangeText={(value) => handleInputChange('phone', value)}
                            placeholder="Isi No Telpon"
                            placeholderTextColor={COLORS.dark}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={style.labels}> Password Baru</Text>
                        <TextInput
                            style={style.inputs}
                            multiline={true}
                            onChangeText={(value) => handleInputChange('new_password', value)}
                            placeholder="Kosongkan Untuk Tidak Mengganti"
                            placeholderTextColor={COLORS.dark}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={style.labels}>Konfirmasi Password</Text>
                        <TextInput
                            style={style.inputs}
                            multiline={true}
                            onChangeText={(value) => handleInputChange('password', value)}
                            placeholder="Kosongkan Untuk Tidak Mengganti"
                            placeholderTextColor={COLORS.dark}
                        />
                    </View>

                    
                </View>

            </View>
            <View style={{ marginHorizontal: 30, top: 20, marginBottom:30 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={HandledLogout}>
                <View style={{ ...style.btnContainer,  }}>
                    <Text style={{ ...style.title, color: COLORS.white }} >Simpan</Text>
                </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor: COLORS.primary,
      paddingBottom: 15
  },
  title: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 },
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  labels:{
    color: COLORS.dark, fontSize: 22, marginBottom: 5,fontWeight:'bold'
  },
  inputs:{
    backgroundColor: COLORS.lightgrey,color: COLORS.dark, height:60, fontSize:18
  },
  inputdisables:{
    backgroundColor: COLORS.secondgrey,color: COLORS.dark, height:60, fontSize:18
  }

})
const styles = StyleSheet.create({})