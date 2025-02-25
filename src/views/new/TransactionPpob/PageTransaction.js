import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView,Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import COLORS from '../../../const/color';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PageTransaction = ({ route }) => {
  const { param } = route.params;
  const navigation = useNavigation();
  const url = BASE_URL;
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];
      console.log(`${url}transaction-ppob-${param}`)

      const response = await axios.get(`${url}transaction-ppob-${param}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('response', response.data);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Gunakan useFocusEffect untuk memanggil fetchBookings setiap kali layar mendapatkan fokus
  useFocusEffect(
    React.useCallback(() => {
      fetchBookings();
    }, [])
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
  };

  const Card = ({ item }) => {
    const handlePress = async () => {
        console.log(route.params.param)
        console.log(item.status_payment)
        if(route.params.param === 'rajabiller' && item.status_payment === "PAID"){
            await Linking.openURL(item.struk);
            console.log(item.struk)

        }
        else if(route.params.param === 'pesawat' && item.status_payment === "PAID"){
          await Linking.openURL(item.url_etiket);
          console.log(item.struk)

        }
       else{
        if (item.status_payment !== "PAID") {
            navigation.navigate("WebViews", item.link_payment);
        }
       }
    };

    const formatDate = (dateString) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = months[date.getMonth()];
      const year = date.getFullYear().toString().slice(-2);
      return `${day} ${month} ${year}`;
    };

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress} >
        <View style={{ paddingTop: 30 }}>
          <View style={{ backgroundColor: COLORS.primary, padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 130 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.white }}>
              {item?.nama_produk} {item?.buyer_sku_code} {item?.produk} {item?.bookingCode}
              </Text>
            </View>
            <View style={{ backgroundColor: COLORS.white, width: '100%', height: 3 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>Pembelian</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.white }}>
                  {formatDate(item.created_at)}
                </Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>Status</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>
                  {(item.status ? item.status : item.status_payment)} 
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.secondgrey, height: 40, padding: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            
            
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.dark }}>
              {item.struk ? 'Download Kwitansi' : ''} {item.url_etiket ? 'Download Etiket' : ''}
            </Text>

            <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.dark }}>
              {item.price ? formatPrice(item.price) : ''} {item.total_paid ? formatPrice(item.total_paid) : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ alignItems: 'center', paddingBottom: 70 }}>
        <View style={{ width: '90%' }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={bookings}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={(item) => item.id.toString()} // Pastikan ada keyExtractor jika data adalah array
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default PageTransaction;
