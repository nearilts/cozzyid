import { View, Text, TouchableOpacity, StyleSheet, FlatList,SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../const/color'
import booking_history from '../../const/booking_history'
import { BASE_URL } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SouvenirPage = ({navigation}) => {
  // const bookings = booking_history.data;
  const url = BASE_URL;
  const [bookings, setbookings] = useState({})
  const fetchBookings = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1]
      const response = await axios.get(`${url}souvenir-list-order`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('response', response.data)
      setbookings(response.data.data.data.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Panggil fungsi fetchBookings setiap kali halaman mendapatkan fokus
      fetchBookings();
    });

    // Hapus listener ketika komponen tidak lagi dipakai
    return unsubscribe;
  }, [navigation]);


  console.log('bookings',bookings)
   const Card = ({item}) => {
    return (
        <View style={{paddingTop:10}}>
          <View style={{backgroundColor:COLORS.white, padding:10, borderRadius:10}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color:COLORS.dark}}>
                {item.invoice}
              </Text>
              <View style={{backgroundColor: COLORS.primary, padding:5, borderRadius:10}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color:COLORS.white}}>
                {item.status}
              </Text>
              </View>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color:COLORS.dark}}>
                {item.metode_payment}
              </Text>
              
            </View>
            <View style={{backgroundColor:COLORS.primary, width:'100%', height:1}}></View>
            <View style={{flexDirection: 'row', justifyContent:'space-between', paddingTop:10}}>
             
              <Text style={{fontSize: 20, fontWeight: 'bold', color:COLORS.dark}}>
                {item.total}
              </Text>
            </View>
          </View>
          
        </View>
    );
  };
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{alignItems:'center'}}>
      <View style={{ width:'90%'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookings}
        renderItem={({item}) => <Card item={item} />}
      />
      </View>
    </View>
  </SafeAreaView>
  )
}

export default SouvenirPage