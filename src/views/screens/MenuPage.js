import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../const/color'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const MenuPage = ({navigation}) => {
    const url = BASE_URL;
    const [profil, setprofil] = useState({})
    const {isLoading,registers} = useContext(AuthContext);
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


  return (
    <SafeAreaView style={{...style.container, backgroundColor:COLORS.white}}>
      <Spinner visible={isLoading} />
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)"/>

      <ImageBackground style={{ flex: 1, height: 170 }} source={require('../../assets/menu_bg.jpg')}>
       

          <View style={{ top:60}}>
            <View style={{ justifyContent: 'center',paddingLeft:40  }}>
              <View style={{flexDirection:'row'}}>
              <View style={{ justifyContent:'center' }}>
                    <Icon name="account-circle" size={50} color={COLORS.dark } />
              </View>
              <View style={{ paddingLeft:20 }}>
                <Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 25 }}>{profil.name}</Text>
                <Text style={{ color: COLORS.dark, fontSize: 20 }}>{profil.email}</Text>
              </View>
              </View>
            </View>


           
          </View>

          <View style={{ top:123}}>

            <View style={{ justifyContent: 'center',paddingLeft:40,paddingRight:40  }}>
              
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <View style={{paddingTop:20,flexDirection:'row' , justifyContent:'space-between', borderBottomColor:COLORS.grey,  borderBottomWidth: 1}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{ justifyContent:'center' }}>
                                <Icon name="perm-identity" size={35} color={COLORS.grey } />
                        </View>
                        <View style={{ paddingLeft:20,justifyContent:'center' }}>
                            <Text style={{ color: COLORS.grey, fontSize: 20 }}>Profile</Text>
                        </View>
                    </View>
                    
                    <View style={{ justifyContent:'center', paddingRight:10 }}>
                        <Icon name="chevron-right" size={35} color={COLORS.grey } />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('BookingScreen')}>
                    <View style={{paddingTop:30,flexDirection:'row' , justifyContent:'space-between', borderBottomColor:COLORS.grey,  borderBottomWidth: 1}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{ justifyContent:'center' }}>
                                <Icon name="history" size={35} color={COLORS.grey } />
                        </View>
                        <View style={{ paddingLeft:20,justifyContent:'center' }}>
                            <Text style={{ color: COLORS.grey, fontSize: 20 }}>My Booking</Text>
                        </View>
                    </View>
                    
                    <View style={{ justifyContent:'center', paddingRight:10 }}>
                        <Icon name="chevron-right" size={35} color={COLORS.grey } />
                    </View>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity>
                    <View style={{paddingTop:30,flexDirection:'row' , justifyContent:'space-between', borderBottomColor:COLORS.grey,  borderBottomWidth: 1}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{ justifyContent:'center' }}>
                                <Icon name="work-history" size={35} color={COLORS.grey } />
                        </View>
                        <View style={{ paddingLeft:20,justifyContent:'center' }}>
                            <Text style={{ color: COLORS.grey, fontSize: 20 }}>Payment Log</Text>
                        </View>
                    </View>
                    
                    <View style={{ justifyContent:'center', paddingRight:10 }}>
                        <Icon name="chevron-right" size={35} color={COLORS.grey } />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                    <View style={{paddingTop:30,flexDirection:'row' , justifyContent:'space-between', borderBottomColor:COLORS.grey,  borderBottomWidth: 1}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{ justifyContent:'center' }}>
                                <Icon name="notifications" size={35} color={COLORS.grey } />
                        </View>
                        <View style={{ paddingLeft:20,justifyContent:'center' }}>
                            <Text style={{ color: COLORS.grey, fontSize: 20 }}>Notification</Text>
                        </View>
                    </View>
                    
                    <View style={{ justifyContent:'center', paddingRight:10 }}>
                        <Icon name="chevron-right" size={35} color={COLORS.grey } />
                    </View>
                </View>
              </TouchableOpacity> */}


            </View>


           
          </View>

        </ImageBackground>
        
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        width: '80%'
    }, 
    input:{
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 10,
        paddingHorizontal: 14,
        color: COLORS.dark
    }
})

export default MenuPage