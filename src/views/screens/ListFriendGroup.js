import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/color';
import { BASE_URL_CHAT } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ListFriendGroup = ({ navigation, route }) => {
    console.log(route.params)
  const url = BASE_URL_CHAT;
  const [bookings, setBookings] = useState([]);
  const [users, setusers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookings = async (query = '') => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const response = await axios.get(`${url}list_friend_group?group_id=${route.params}`,  {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(response.data.data.data.user_friend);
      console.log('list_friend_group',response.data.data.data.list_friend_group)
      setusers(response.data.data.data.list_friend_group);
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
    console.log(id)
    addUserFriend(id);
  };
  const addUserFriend = async (id) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;

      const response = await axios.put(`${url}groups/${route.params}/add-members`,{members: [id]}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        alert(response.data.message)
        fetchBookings(searchQuery);
      }
    } catch (error) {
      console.error('Error adding user friend:', error);
    }
  };


  const handlePressDelete = (id) => () => {
    console.log(id)
    deleteUserFriend(id);
  };

  const deleteUserFriend = async (id) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;

        console.log(`${url}groups/${route.params}/members/${id}`)
      const response = await axios.delete(`${url}groups/${route.params}/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      if (response.data.success) {
        alert(response.data.message)
        fetchBookings(searchQuery);
      }
    } catch (error) {
      console.error('Error delete user friend:', error);
    }
  };

  
  const Card = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.friend.name}</Text>
          <TouchableOpacity style={styles.addButton}  onPress={handlePress(item.friend.id)}>
            <Icon name="add-circle" size={40} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.cardFooter}>
          <Text style={styles.cardEmail}>{item.friend.email}</Text>
        </View>
      </View>
    </View>
  );

  const CardGroup = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.user.name}</Text>
          <TouchableOpacity style={styles.addButton}  onPress={handlePressDelete(item.user.id)}>
            <Icon name="delete" size={40} color={COLORS.red} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.cardFooter}>
          <Text style={styles.cardEmail}>{item.user.email}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
         <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add User Group </Text>
        <View>
       

        </View>
      </View>
      <View style={styles.innerContainer}>
     
        <View style={styles.listContainer}>
          {bookings.length > 0 ? (

            <>
            <Text style={styles.emptyMessage}>List Daftar Teman </Text>

            <FlatList
            showsVerticalScrollIndicator={false}
            data={bookings}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
            />
            
            </>
          ) : (
            <Text style={styles.emptyMessage}>Tidak Ada Data Teman Terdaftar</Text>
          )}


        {users.length > 0 ? (
            <>
            <Text style={styles.emptyMessage}>List Daftar Teman Group</Text>
            
            <FlatList
              showsVerticalScrollIndicator={false}
              data={users}
              renderItem={({ item }) => <CardGroup item={item} />}
              keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
            />
            </>
          ) : (
            <Text style={styles.emptyMessage}>Tidak Ada Data User Group</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        top: 20
      },
      inner: {
        flex: 1,
        justifyContent: 'space-between',
      },
  header: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: COLORS.white,
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

export default ListFriendGroup;
