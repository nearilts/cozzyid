import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookingPage from '../booking/BookingPage';
import SouvenirPage from '../booking/SouvenirPage';
import COLORS from '../../const/color';

export default function BookingScreen() {
const Tab = createMaterialTopTabNavigator();

  return (
       <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: { marginTop: 30 },
          tabBarInactiveTintColor: COLORS.grey,
          tabBarActiveTintColor: COLORS.dark
        }}
        >
        <Tab.Screen name="BookingPage" options={{title:"Booking List" }} component={BookingPage} />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})