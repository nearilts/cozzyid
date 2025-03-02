import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/color';
import { BASE_URL_CHAT } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddFriend = ({  }) => {
  const navigation = useNavigation();

  const url = BASE_URL_CHAT;
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookings = async (query = '') => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.post(`${url}search_user`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          val: query // Include search query as a parameter
        }
      });
      setBookings(response.data.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchBookings(searchQuery);
    });

    return unsubscribe;
  }, [navigation, searchQuery]);

  const handleSearch = () => {
    fetchBookings(searchQuery);
  };

  const handlePress = (id) => () => {
    addUserFriend(id);
  };

  const addUserFriend = async (id) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.post(`${url}add_user`, { val: id }, {
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
  const Card = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          <TouchableOpacity style={styles.addButton}  onPress={handlePress(item.id)}>
            <Icon name="add-circle" size={40} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.cardFooter}>
          <Text style={styles.cardEmail}>{item.email}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Icon name="search" size={28} color={COLORS.dark} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={COLORS.dark}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.sortBtn} onPress={handleSearch}>
            <Icon name="tune" size={28} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {bookings.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={bookings}
              renderItem={({ item }) => <Card item={item} />}
              keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
            />
          ) : (
            <Text style={styles.emptyMessage}>Tidak Ada Data User</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingBottom: 70,
  },
  searchContainer: {
    marginTop: 40,
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '90%',
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: COLORS.dark,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '90%',
  },
  cardContainer: {
    paddingTop: 10,
  },
  cardContent: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  addButton: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 1,
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardEmail: {
    fontSize: 18,
    color: COLORS.dark,
  },
  emptyMessage: {
    fontSize: 18,
    color: COLORS.dark,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddFriend;
