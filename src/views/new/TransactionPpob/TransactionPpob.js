import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PageTransaction from './PageTransaction';
import COLORS from '../../../const/color';

export default function TransactionPpob() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: { marginTop: 30 },
        tabBarInactiveTintColor: COLORS.grey,
        tabBarActiveTintColor: COLORS.dark
      }}
    >
    <Tab.Screen 
      name="Tagihan" 
      options={{ title: "Tagihan" }} 
      component={PageTransaction} 
      initialParams={{ param: 'rajabiller' }} // Kirim parameter di sini
    />
    <Tab.Screen 
      name="PageTransaction" 
      options={{ title: "Masa Aktif" }} 
      component={PageTransaction} 
      initialParams={{ param: 'digiflaz' }} // Kirim parameter di sini
    />
    <Tab.Screen 
      name="VoucherGame" 
      options={{ title: "Pulsa / Voucher / Game" }} 
      component={PageTransaction} 
      initialParams={{ param: 'tripay' }} // Kirim parameter di sini
    />
    <Tab.Screen 
      name="TransaksiPesawat" 
      options={{ title: "Tiket " }} 
      component={PageTransaction} 
      initialParams={{ param: 'pesawat' }} // Kirim parameter di sini
    />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
