import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView, TextInput, TouchableOpacity, FlatList, Dimensions, Image, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import COLORS from '../../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';

const CodeReferral = ({ navigation }) => {
  const url = BASE_URL;
  const [profil, setProfil] = useState({});
  const [index, setIndex] = useState(0);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        const response = await axios.get(`${url}auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfil(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfil();
  }, []);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        const response = await axios.post(`${BASE_URL}my_referral`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNames(response.data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };
    fetchNames();
  }, []);

  const handlePress = (textToCopy) => {
    Clipboard.setStringAsync(textToCopy);
    alert(`Code Berhasil Disalin! ${textToCopy}`);
  };

  const FirstRoute = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={names?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.user?.name}</Text>
            <Text style={styles.itemDetail}>Email: {item.user?.email}</Text>
          </View>
        )}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={names?.credit}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.meta?.type_name}</Text>
            <Text style={styles.itemDetail}>Point: {item.amount}</Text>
            <Text style={styles.itemDetail}>User: {item.credit?.user?.name}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor={COLORS.transparent} />
      <View style={{ marginLeft: 10, flexDirection: 'row', width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
        <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={navigation.goBack} />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginLeft: 80, marginTop: 9, fontSize: 18, color: COLORS.dark }}>Undang Temanmu</Text>
        </View>
      </View>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <View style={styles.card}>
          <Text style={styles.title}>Total Point Credit Anda</Text>
          <Text style={styles.amount}>{profil?.credit_balance}</Text>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="content-copy" size={20} color={COLORS.dark} />
            <Text style={{ color: COLORS.dark, paddingLeft: 10 }}>Salin Code Referral</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <TouchableOpacity onPress={() => setIndex(0)} style={{ padding: 10, borderBottomWidth: index === 0 ? 2 : 0, borderBottomColor: COLORS.primary }}>
          <Text style={{ color: index === 0 ? COLORS.primary : 'gray', fontSize: 16 }}>My Referral</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIndex(1)} style={{ padding: 10, borderBottomWidth: index === 1 ? 2 : 0, borderBottomColor: COLORS.primary }}>
          <Text style={{ color: index === 1 ? COLORS.primary : 'gray', fontSize: 16 }}>Point By Referral</Text>
        </TouchableOpacity>
      </View>
      {index === 0 ? <FirstRoute /> : <SecondRoute />}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { flex: 1, padding: 20, backgroundColor: COLORS.white },
  itemContainer: { backgroundColor: COLORS.white, padding: 15, marginTop: 10, borderRadius: 10, elevation: 3 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  itemDetail: { fontSize: 14, color: COLORS.grey },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, elevation: 5, margin: 16 },
  title: { fontSize: 16, fontWeight: 'bold' },
  amount: { fontSize: 24, fontWeight: 'bold' },
  referralContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  referralItem: { alignItems: 'center' },
  referralText: { fontSize: 14, color: '#666' },
  referralCount: { fontSize: 16, fontWeight: 'bold' },
});

export default CodeReferral;