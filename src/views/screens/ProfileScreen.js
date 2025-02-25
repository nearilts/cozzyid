import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import profils from '../../const/profils';
import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ProfileScreen({navigation}) {
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
    <SafeAreaView>
      <StatusBar translucent backgroundColor={COLORS.primary} />
      <Spinner visible={isLoading} />
      <ScrollView>
      <View style={style.header}>
                <View>
                    <View style={{ flexDirection: 'row', top: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 28, color: COLORS.white }}>Profil</Text>
                        </View>
                        <Text style={{ fontSize: 28, color: COLORS.white, marginLeft: 10 }}>
                            Page
                        </Text>
                    </View>
                </View>
            </View>

          <View style={{ alignItems: 'center', top: 10 }}>
                <View style={{
                    backgroundColor: COLORS.secondary,
                    width: '90%',
                    borderRadius: 10,
                    padding: 10,
                    marginBottom:10
                }}>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Nama Pengguna</Text>
                    <TextInput
                        style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                        defaultValue={profil.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Nama Depan</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                            defaultValue={profil.first_name}
                            multiline={true}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Nama Akhir</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                            defaultValue={profil.last_name}
                            multiline={true}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Email</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                            defaultValue={profil.email}
                            multiline={true}
                            editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Phone</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                            defaultValue={profil.phone}
                            onChangeText={(value) => handleInputChange('phone', value)}
                            placeholder="Isi No Telpon"
                            placeholderTextColor={COLORS.dark}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}> Password Baru</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                            multiline={true}
                            onChangeText={(value) => handleInputChange('new_password', value)}
                            placeholder="Kosongkan Jika tidak ingin mengganti password"
                            placeholderTextColor={COLORS.dark}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Konfirmasi Password</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                            multiline={true}
                            onChangeText={(value) => handleInputChange('password', value)}
                            placeholder="Kosongkan Jika tidak ingin mengganti password"
                            placeholderTextColor={COLORS.dark}
                        />
                    </View>

                    
                </View>

            </View>
            <View style={{ marginHorizontal: 30, top: 20, marginBottom:30 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={HandledLogout}>
                <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                    <Text style={{ ...style.title, color: COLORS.white }} >Simpan</Text>
                </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
    </SafeAreaView>
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
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
const styles = StyleSheet.create({})