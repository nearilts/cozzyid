import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/color';
import { BASE_URL_CHAT } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListFriend = () => {
  const navigation = useNavigation();

  const url = BASE_URL_CHAT;
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;

      const response = await axios.get(`${url}list_friend`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log('response', response.data);
      setBookings(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch bookings when the screen gains focus
      fetchBookings();
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  const handlePress = (id) => {
    return () => {
      navigation.navigate('Chat', { id }); // Pass the ID as an object
    };
  };

  const handlePressDelete = (id) => () => {
    reject_firend(id);
  };
  const reject_firend = async (id) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.post(`${url}delete_firend`, { val: id }, {
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

  const Card = ({ item }) => {
    return (
      <TouchableOpacity onPress={handlePress(item.friend)}>
        <View style={{ paddingTop: 10 }}>
          <View style={{ backgroundColor: COLORS.white, padding: 10, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark }}>
                {item.friend?.name}
              </Text>
              <View style={{ marginBottom: 10, borderRadius: 10, backgroundColor: COLORS.primary }}>
                <Icon name="chat" size={30} color={COLORS.white} />
              </View>
            </View>
            <View style={{ backgroundColor: COLORS.primary, width: '100%', height: 1 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, color: COLORS.dark }}>
                {item.friend?.email}
              </Text>
              <View style={{marginTop:10, borderRadius:10, backgroundColor:COLORS.white }}>
                <TouchableOpacity  onPress={handlePressDelete(item.friend_id)}>
                    <Icon name="delete" size={30} color={COLORS.red} />
                </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', paddingBottom: 70 }}>
        <View style={{ width: '90%' }}>
          {bookings.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={bookings}
              renderItem={({ item }) => <Card item={item} />}
              keyExtractor={(item) => item.friend?.id.toString()} // Ensure each item has a unique key
            />
          ) : (
            <Text style={{ fontSize: 18, color: COLORS.dark, textAlign: 'center', marginTop: 20 }}>
              Belum ada teman
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({});

export default ListFriend;
