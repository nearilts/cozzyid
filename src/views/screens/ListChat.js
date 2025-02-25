import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../const/color';
import { BASE_URL_CHAT } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'

const ListChat = ({ navigation }) => {
  const url = BASE_URL_CHAT;
  const [bookings, setBookings] = useState([]); // Inisialisasi state dengan array kosong

  const fetchBookings = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.get(`${url}conversations-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.data.conversations || []); // Pastikan bookings adalah array
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings(); // Initial fetch

    // Auto-refresh messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchBookings();
    }, 7000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handlePress = (item) => () => {
    if (item.is_group === 1) {
      let id =item.group ;
      let is_group = 1 ;
      navigation.navigate('Chat', { id, is_group });
    }else{
      let id =item.user ;
      let is_group = 0 ;
      navigation.navigate('Chat', { id,is_group });
    }
   
  };

  
  const AddGroups = () => {
    navigation.navigate('AddGroup');
  };


  const Card = ({ item }) => {
    const fallbackImage = require('../../assets/ic_launcher_round.png');

    // Handle image source
    const [imageUri, setImageUri] = useState(fallbackImage);

    useEffect(() => {
      const photoUrl = item.user?.avatar_url;
      if (photoUrl && photoUrl.includes('ui-avatars.com')) {
        // Check if the URL is valid
        setImageUri(fallbackImage);
      } else {
        if (item.group) {
          setImageUri({ uri: item.group?.photo_url });
        } else {
          setImageUri({ uri: item.user?.avatar_url });
        }
         // Use fallback image if no URL
      }
    }, [item.user?.photo_url]);


    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress(item)}>
        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <Image
              source={imageUri}
              style={styles.profileImage}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <View style={styles.header}>
                <Text style={styles.userName}>{item.is_group === 1 ? item.group?.name : item.user?.name}</Text>
                {item.unread_count > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{item.unread_count}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.lastMessage}>{item.message_type === 0 || item.message_type === 9 ? item.message : 'FILE UPLOAD'}</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          {bookings.length > 0 ? (
            <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={bookings}
              renderItem={({ item }) => <Card item={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text style={styles.noChatText}>Belum ada chat</Text>}
            />
            
            </>
          ) : (
            <Text style={styles.noChatText}>Belum ada chat</Text>
          )}
        </View>
      </ScrollView>


      {/* Floating Action Button */}
      <TouchableOpacity style={styles.floatingButton} 
      onPress={AddGroups}
      >
        <Icon name="group-add" size={24} color={COLORS.white} />
        <Text style={styles.floatingButtonText}>Add Group</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    flex:1,
    marginLeft:20,
    paddingBottom: 70,
    width: '90%',
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 5,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: COLORS.dark,
  },
  separator: {
    backgroundColor: COLORS.grey,
    height: 1,
    width: '100%',
  },
  noChatText: {
    fontSize: 18,
    color: COLORS.dark,
    textAlign: 'center',
    marginTop: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 30,
    backgroundColor: COLORS.primary,
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    flexDirection: 'row',
  },
  floatingButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ListChat;
