import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const VerificationScreen = ({navigation}) => {
    const url = BASE_URL;
    const [profil, setprofil] = useState({})
    const {isLoading,logouts} = useContext(AuthContext);

    const {userInfo,IsVerif,emailverif} = useContext(AuthContext);

    const fetchprofil = async () => {
        try {
            let users = await AsyncStorage.getItem('userInfo');
            users = JSON.parse(users);
            let token = users.access_token.split('|')[1]
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

    const resendemail = async () => {
        try {
            let users = await AsyncStorage.getItem('userInfo');
            users = JSON.parse(users);
            let token = users.access_token.split('|')[1]

            console.log('token', token)

            const response = await axios.post(`${url}email/resend`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('xekdata', response.data)
           if(response.data.messages == 'OK'){
            alert('Already Sent ')
           }

        } catch (error) {
            console.error(error);
        }
    }
    const Resends = () => {
        resendemail()
        
      };
      const cekemail = async () => {
        try {
            let users = await AsyncStorage.getItem('userInfo');
            users = JSON.parse(users);
            let token = users.access_token.split('|')[1]
            const response = await axios.get(`${url}auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response.data)
            setprofil(response.data.data)
            if(response.data.data.email_verified_at != '-'){
                userInfo
                alert('Check Success ')
                navigation.navigate('MainTab');
            }else{
                alert('Not Verified ')
            }

           
        } catch (error) {
            console.error(error);
        }
    }

      const Checkemail = () => {
            cekemail()
          
        };

      console.log('profil', profil)

  return (
    <SafeAreaView>
    <StatusBar translucent backgroundColor={COLORS.primary} />
    
    <View style={style.header}>
              <View>
                  <View style={{ flexDirection: 'row', top: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 28, color: COLORS.white }}>Verification</Text>
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
                  
                  <View style={{ marginTop: 20 }}>
                      <Text style={{ color: COLORS.dark, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Before proceeding, please check your email for a verification link. If you did not receive the email,</Text>
                    
                  </View>

                  
              </View>

          </View>
          <View style={{ marginHorizontal: 30, top: 20 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={Resends}>
              <View style={{ ...style.btnContainer, backgroundColor: COLORS.red }}>
                  <Text style={{ ...style.title, color: COLORS.white }} >Resend</Text>
              </View>
              </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 30, paddingTop: 40 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={Checkemail}>
              <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                  <Text style={{ ...style.title, color: COLORS.white }} >Check</Text>
              </View>
              </TouchableOpacity>
          </View>
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
export default VerificationScreen