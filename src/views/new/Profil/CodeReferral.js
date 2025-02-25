import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground,useWindowDimensions, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const CodeReferral = ({ navigation }) => {
  const url = BASE_URL;
  const [profil, setprofil] = useState({})
  const fetchprofil = async () => {
      try {
          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);
          let token = userInfo.access_token.split('|')[1]
          const response = await axios.get(`${url}auth/me`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          console.log('response', response.data)
          setprofil(response.data.data)

      } catch (error) {
          console.error(error);
      }
  }
  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          fetchprofil();
      });
      fetchprofil();

      return unsubscribe;
  }, [navigation]);


  console.log('profil', profil)
  const handlePress = (textToCopy) => {
    Clipboard.setStringAsync(textToCopy);
    alert(" Code Berhasil Di Salin ! "+textToCopy)
};
  const formatPrice = (price) => {
    let prices = 0;
    if (price) {
      prices = price;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(prices);
  };
  const [index, setIndex] = useState(0); // Index tab aktif
  const [routes] = useState([
    { key: 'first', title: 'My Referral' },
    { key: 'second', title: 'Point By Referral' },
  ]);
  const [names, setNames] = useState([]);
  
  useEffect(() => {
    const fetchNames = async () => {
      try {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];

        const response = await axios.post(`${BASE_URL}my_referral`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sesuaikan dengan struktur respons API Anda
        setNames(response.data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };

    fetchNames();
  }, []);
  const FirstRoute = () => {
   
  
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.user?.name}</Text>
        <Text style={styles.itemDetail}>Email: {item.user?.email}</Text>
      </View>
    );
  
    return (
      <View style={styles.listContainer}>
        <ScrollView>
          <FlatList
            data={names?.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </ScrollView>
       
      </View>
    );
  };
  
  const SecondRoute  = () => {
   
  
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.meta?.type_name}</Text>
        <Text style={styles.itemDetail}>Point: {item.amount}</Text>
        <Text style={styles.itemDetail}>User: {item.credit?.user?.name}</Text>
      </View>
    );
  
    return (
      <View style={styles.listContainer}>
        <ScrollView>
        <FlatList
          data={names?.credit}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        </ScrollView>
      </View>
    );
  };
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: COLORS.primary }}
        style={{ backgroundColor: COLORS.white ? COLORS.white : COLORS.white }}
        renderLabel={({ route, focused }) => (
            <Text style={{
                color: focused ? COLORS.primary : 'gray',
                fontSize: 16,
                fontFamily: "Urbanist Bold"
            }}>
                {route.title}
            </Text>
        )}
    />
)

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            <View style={{marginLeft: 10, flexDirection: "row", width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
                <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={navigation.goBack} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginLeft: 80, marginTop: 9, fontSize: 18, color: COLORS.dark }}>Undang Temanmu</Text>
                </View>
            </View>

            
                <View style={{marginLeft:20, marginRight:20}}>
                  <View style={styles.card}>
                    <Text style={styles.title}>Total Point Credit Anda</Text>
                    <Text style={styles.amount}>{formatPrice(profil?.credit_balance)}</Text>
                    <View style={styles.referralContainer}>
                      <View style={styles.referralItem}>
                        <Text style={styles.referralText}>Code Referral</Text>
                        <Text style={styles.referralCount}>{profil?.ref}</Text>
                      </View>
                      <View style={styles.referralItem}>
                        <Text style={styles.referralText}>Total Referral</Text>
                        <Text style={styles.referralCount}>{profil?.count_ref}</Text>
                      </View>
                    </View>
                  </View>


                  <TouchableOpacity style={styles.card} onPress={() => handlePress(profil?.ref)}>
                    <View style={{flexDirection:'row',  alignContent:'space-between'}}>
                      <Icon name="content-copy" size={20} color={COLORS.dark} />
                      <Text style={{color:COLORS.dark, paddingLeft:10}}>Salin Code Referral</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              
            <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}  renderTabBar={renderTabBar}
                  initialLayout={{ width: Dimensions.get('window').width }}
                  style={{ marginTop: 20 }}
                />
        </View>
    );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  itemDetail: {
    fontSize: 14,
    color: COLORS.grey,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    padding :{
        margin:20
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      margin: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    amount: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    referralContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    referralItem: {
      alignItems: 'center',
    },
    referralText: {
      fontSize: 14,
      color: '#666',
    },
    referralCount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default CodeReferral;
