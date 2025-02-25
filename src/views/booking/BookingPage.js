import { View, Text, TouchableOpacity, StyleSheet, FlatList,SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../const/color'
import booking_history from '../../const/booking_history'
import { BASE_URL } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BookingPage = ({navigation}) => {
  const url = BASE_URL;
  const [bookings, setbookings] = useState({})
  const fetchBookings = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1]
      const response = await axios.get(`${url}user/booking-history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('response', response.data)
      setbookings(response.data.data)
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
  };

   const Card = ({item}) => {
    const handlePress = () => {
      if (item.status !== "paid") {
        navigation.navigate("CheckoutBooking", item);
      }
    };
    const formatDate = (dateString) => {
      // Array bulan untuk konversi
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
      // Parse dateString ke objek Date
      const date = new Date(dateString);
    
      // Ekstrak hari, bulan, dan tahun
      const day = date.getDate().toString().padStart(2, '0'); // Tambahkan leading zero jika perlu
      const month = months[date.getMonth()]; // Mendapatkan nama bulan
      const year = date.getFullYear().toString().slice(-2); // Ambil dua digit terakhir dari tahun
    
      // Format tanggal sesuai dengan kebutuhan
      return `${day} ${month} ${year}`;
    };
    return (
        <TouchableOpacity activeOpacity={0.8}  onPress={handlePress}
          disabled={item.status === "paid"}>
          <View style={{paddingTop:30}}>
          <View style={{backgroundColor:COLORS.primary, padding:10, borderTopLeftRadius:10,borderTopRightRadius:10, height:110}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color:COLORS.white}}>
                {item.service.title}
              </Text>
              
            </View>
            
            <View style={{backgroundColor:COLORS.white, width:'100%', height:3}}></View>

            <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:10}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color:COLORS.white}}>
                Cek in
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color:COLORS.white}}>
                  {formatDate(item.start_date)}
                </Text>
              </View>

              <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color:COLORS.white}}>
                Cek Out
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color:COLORS.white}}>
                  {formatDate(item.end_date)}
                </Text>
               
              </View>
            </View>
            
            
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',backgroundColor:COLORS.secondgrey, height:40,padding:10, borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
              
              <Text style={{fontSize: 15, fontWeight: 'bold', color:COLORS.dark}}>
                {formatPrice(item.total)}
              </Text>
            </View>
        </View>
        </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
      <View style={{alignItems:'center', paddingBottom:70}}>
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

const style = StyleSheet.create({
  
})
export default BookingPage