import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Linking, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../config';
import COLORS from '../../../const/color';

const TransactionPpob = () => {
  const [activeTab, setActiveTab] = useState('rajabiller');
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];

      const response = await axios.get(`${BASE_URL}transaction-ppob-${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);

  const formatDate = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handlePress = async (item) => {
    if (activeTab === 'rajabiller' && item.status_payment === "PAID") {
      await Linking.openURL(item.struk);
    } else if (activeTab === 'pesawat' && item.status_payment === "PAID") {
      await Linking.openURL(item.url_etiket);
    } else {
      if (item.status_payment !== "PAID") {
        navigation.navigate("WebViews", { url: item.link_payment });
      }
    }
  };

  const Card = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress(item)} style={styles.cardContainer}>
      <View style={styles.cardTop}>
        <Text style={styles.title}>{item?.nama_produk} {item?.buyer_sku_code} {item?.produk} {item?.bookingCode}</Text>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Pembelian</Text>
            <Text style={styles.value}>{formatDate(item.created_at)}</Text>
          </View>
          <View>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{item.status || item.status_payment}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <Text style={styles.downloadText}>
          {item.struk ? 'Download Kwitansi' : ''} {item.url_etiket ? 'Download Etiket' : ''}
        </Text>
        <Text style={styles.price}>
          {item.price ? formatPrice(item.price) : ''} {item.total_paid ? formatPrice(item.total_paid) : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 TAB BUTTONS */}
      <View style={styles.tabContainer}>
        {['rajabiller', 'digiflaz', 'tripay', 'pesawat'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeText : styles.inactiveText}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 LIST TRANSAKSI */}
      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={bookings}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white , top:30},
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.secondgrey, paddingVertical: 10 },
  tabButton: { paddingVertical: 10, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary },
  activeText: { fontWeight: 'bold', color: COLORS.primary },
  inactiveText: { color: COLORS.grey },
  listContainer: { flex: 1, paddingHorizontal: 16, paddingTop:20 },
  cardContainer: { marginBottom: 20, borderRadius: 10, overflow: 'hidden', elevation: 3, backgroundColor: COLORS.white },
  cardTop: { backgroundColor: COLORS.primary, padding: 15, height: 130 },
  title: { fontSize: 16, fontWeight: 'bold', color: COLORS.white },
  separator: { backgroundColor: COLORS.white, width: '100%', height: 2, marginVertical: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.white },
  value: { fontSize: 16, fontWeight: 'bold', color: COLORS.white },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.secondgrey, padding: 12 },
  downloadText: { fontSize: 14, fontWeight: 'bold', color: COLORS.dark },
  price: { fontSize: 14, fontWeight: 'bold', color: COLORS.dark },
});

export default TransactionPpob;
