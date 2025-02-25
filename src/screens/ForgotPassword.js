import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../const/color';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
const ForgotPassword = ({navigation}) => {
   const url = BASE_URL;
   const [showBlock2, setShowBlock2] = useState(false);

   const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const [formDataChange, setformDataChange] = useState({
        otp: '',
        new_password: '',
        password: '',
    });
        const handleInputChangePassword = (key, value) => {
        setformDataChange({ ...formDataChange, [key]: value });
        };
        const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
        };
      
    const CekEmailData = () => {
        console.log('Form Data:', formData);
        kirimdata()
        
    };

    const ChangePassword = () => {
        console.log('Form Data:', formData);
        kirimdatas()
        
    };
    const kirimdata = async () => {
        try {
            setIsLoading(true)

            const response = await axios.post(`${url}cek_email`, {
                email: formData.email,
            });
            setIsLoading(false)

            console.log('response', response.data);
            if (response.data.code == 1) {
            alert(response.data.message);
            // tampilkan balok 2 dan hide balok 1
            setShowBlock2(true); 
            } else {
            alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    };


    const kirimdatas = async () => {
        try {
            setIsLoading(true)

            const response = await axios.post(`${url}change_password`, {
                otp: formDataChange.otp,
                new_password: formDataChange.new_password,
                password: formDataChange.password,
            });
            setIsLoading(false)

            console.log('response', response.data);
            if (response.data.code == 1) {
                alert(response.data.message);
                navigation.navigate('LoginScreen');

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
                       
                        <Text style={{ fontSize: 28, color: COLORS.white, marginLeft: 10 }}>
                            Lupa Password
                        </Text>
                    </View>
                </View>
            </View>

             {/* blok 1  */}
             {!showBlock2 && (
                <View>
                    <View style={{ alignItems: 'center', top: 10 }}>
                        <View style={{
                            backgroundColor: COLORS.secondary,
                            width: '90%',
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 10
                        }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Email</Text>
                                <TextInput
                                    style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                                    onChangeText={(value) => handleInputChange('email', value)}
                                    placeholder="Isi Email"
                                    placeholderTextColor={COLORS.dark}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 30, top: 20, marginBottom: 30 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={CekEmailData}>
                            <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                                <Text style={{ ...style.title, color: COLORS.white }} >Cek email</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* blok 2 */}
            {showBlock2 && (
                <View>
                    <View style={{ alignItems: 'center', top: 10 }}>
                        <View style={{
                            backgroundColor: COLORS.secondary,
                            width: '90%',
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 10
                        }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>otp</Text>
                                <TextInput
                                    style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                                    onChangeText={(value) => handleInputChangePassword('otp', value)}
                                    placeholder="Isi otp"
                                    placeholderTextColor={COLORS.dark}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Password Baru</Text>
                                <TextInput
                                    style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                                    onChangeText={(value) => handleInputChangePassword('new_password', value)}
                                    placeholder="Isi Password Baru"
                                    placeholderTextColor={COLORS.dark}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Password</Text>
                                <TextInput
                                    style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark }}
                                    onChangeText={(value) => handleInputChangePassword('password', value)}
                                    placeholder="Isi Password"
                                    placeholderTextColor={COLORS.dark}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 30, top: 20, marginBottom: 30 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={ChangePassword}>
                            <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                                <Text style={{ ...style.title, color: COLORS.white }} >Ganti Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

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

export default ForgotPassword