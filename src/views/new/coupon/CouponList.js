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

const CouponList = ({ navigation }) => {
    const url = BASE_URL;
    const [bookings, setbookings] = useState({})
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${url}coupons`, {
       
        });
        console.log('response', response.data)
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
    const Card = ({item}) => {
      
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress(item.code)}>
             
              <View style={{paddingTop:30}}>
              <View style={{backgroundColor:COLORS.primary, padding:10, borderTopLeftRadius:10,borderTopRightRadius:10, height:110}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color:COLORS.white}}>
                    {item.name}
                  </Text>
                  
                </View>
                
                <View style={{backgroundColor:COLORS.white, width:'100%', height:3}}></View>
    
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:10}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color:COLORS.white}}>
                    {item.name}
                    </Text>
                    <Text style={{fontSize: 15,  color:COLORS.white}}>
                     Potongan Sebesar {(item.amount)} %
                    </Text>
                  </View>
    
                </View>
                
                
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',backgroundColor:COLORS.secondgrey, height:40,padding:10, borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                  
                  <Text style={{fontSize: 15,color:COLORS.dark}}>
                    Berlaku Hingga  {formatDate(item.end_date)}
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
                    <Text style={{ marginLeft: 140, marginTop: 5, fontSize: 18, color: COLORS.dark }}>Kupon</Text>
                </View>
            </View>

            
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginLeft:20, marginRight:20}}>
                    <Text style={{color:COLORS.seconddark}}>*Klik Kupon Untuk Menyalin Code</Text>
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

export default CouponList;
