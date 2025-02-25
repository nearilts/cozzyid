import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';

import COLORS from '../../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../../config';
import { addDays } from 'date-fns';
import { SIZES, icons, images } from '../../../constants';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';

const HistoryCredit = ({ navigation }) => {
    const url = BASE_URL;
    const [bookings, setbookings] = useState({})
    const fetchBookings = async () => {
      try { 
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1]
        console.log(`${url}credit_history`)
        const response = await axios.post(`${url}credit_history`, {},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('responsexx', response.data)
        setbookings(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchBookings();
      });
  
      return unsubscribe;
    }, [navigation]);
  
  
    console.log('bookings',bookings)
    const handlePress = (textToCopy) => {
        Clipboard.setStringAsync(textToCopy);
        alert(" Kupon Berhasil Di Salin ! "+textToCopy)
    };
    const formatDate = (dateString) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
      const date = new Date(dateString);
    
      const day = date.getDate().toString().padStart(2, '0'); // Tambahkan leading zero jika perlu
      const month = months[date.getMonth()]; // Mendapatkan nama bulan
      const year = date.getFullYear().toString().slice(-2); // Ambil dua digit terakhir dari tahun
    
      return `${day} ${month} ${year}`;
    };
    
  const formatPrice = (price) => {
      let prices = 0;
      if (price) {
        prices = price;
      }
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(prices);
    };

    
    const Card = ({item}) => {
      
        return (
            <TouchableOpacity activeOpacity={0.8} >
             
              <View style={{paddingTop:30}}>
              <View style={{backgroundColor:COLORS.primary, padding:10, borderTopLeftRadius:10,borderTopRightRadius:10, height:110}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color:COLORS.white}}>
                    {item.type}
                  </Text>
                  
                </View>
                
                <View style={{backgroundColor:COLORS.white, width:'100%', height:3}}></View>
    
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:10}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color:COLORS.white}}>
                    {item.status ? item.status : 'confirmed'}
                    </Text>
                    <Text style={{fontSize: 15,  color:COLORS.white}}>
                     Nominal {(formatPrice(item.amount))}
                    </Text>
                  </View>
    
                </View>
                
                
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',backgroundColor:COLORS.secondgrey, height:40,padding:10, borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                  
                  <Text style={{fontSize: 15,color:COLORS.dark}}>
                    {item.meta ? item.meta?.type_name : '-'}
                  </Text>
                </View>
            </View>
            </TouchableOpacity>
        );
      };
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            <View style={{marginLeft: 10, flexDirection: "row", width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
                <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={navigation.goBack} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginLeft: 110, marginTop: 9, fontSize: 18, color: COLORS.dark }}>History Point</Text>
                </View>
            </View>

            
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginLeft:20, marginRight:20}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={bookings}
                    renderItem={({item}) => <Card item={item} />}
                    />
                </View>
            </ScrollView>
           
        </View>
    );
};

const styles = StyleSheet.create({
    padding :{
        margin:20
    },
    
});

export default HistoryCredit;
