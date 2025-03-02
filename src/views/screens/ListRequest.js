import { View, Text, TouchableOpacity, StyleSheet, FlatList,SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../const/color'
import booking_history from '../../const/booking_history'
import { BASE_URL, BASE_URL_CHAT } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

const ListRequest = ({}) => {
  const navigation = useNavigation();

  const url = BASE_URL_CHAT;
  const [bookings, setbookings] = useState({})
  const fetchBookings = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.get(`${url}list_firend`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log('response', response.data.data.data)
      setbookings(response.data.data.data)
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

  
  const handlePress = (id) => () => {
    reject_firend(id);
  };
  const reject_firend = async (id) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.post(`${url}reject_firend`, { val: id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding user friend:', error);
    }
  };

  const handlePressYes = (id) => () => {
    console.log(id)
    accept_firend(id);

  }; 
  const accept_firend = async (id) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.post(`${url}accept_firend`, { val: id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        alert(response.data.message);
        fetchBookings();
      }
    } catch (error) {
      console.error('Error adding user friend:', error);
    }
  };


   const Card = ({item}) => {
   

    return (
       
          <View style={{paddingTop:10}}>
          <View style={{backgroundColor:COLORS.white, padding:10, borderRadius:10}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color:COLORS.dark}}>
              {item.user?.name}
              </Text>
              <View style={{marginBottom:10, borderRadius:10, backgroundColor:COLORS.green }}>
                
              <TouchableOpacity  onPress={handlePressYes(item.user_id)}>
                <Icon name="check-circle" size={40} color={COLORS.white} />
                </TouchableOpacity>
                
            </View>
            </View>
            <View style={{backgroundColor:COLORS.primary, width:'100%', height:1}}></View>
            
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{fontSize: 18, color:COLORS.dark}}>
              {item.user?.email}
              </Text>
              <View style={{marginTop:10, borderRadius:10, backgroundColor:COLORS.red }}>
                <TouchableOpacity  onPress={handlePress(item.user_id)}>
                    <Icon name="cancel" size={40} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            </View>
            
          </View>
          
        </View>
    );
  };

  return (
    <ScrollView style={{flex:1}}>
      <View style={{alignItems:'center', paddingBottom:70}}>
        <View style={{ width:'90%'}}>
        {bookings.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={bookings}
              renderItem={({ item }) => <Card item={item} />}
              keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
            />
          ) : (
            <Text style={{ fontSize: 18, color: COLORS.dark, textAlign: 'center', marginTop: 20 }}>
              Belum ada Request
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  
})
export default ListRequest