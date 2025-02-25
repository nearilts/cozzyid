import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../../../const/color';
import OpenDoorLock from './OpenDoorLock';
import CekInOnline from '../../../screens/CekinOnline';
import ListDoorLock from './ListDoorLock';
import ListDoorLockLight from './ListDoorLockLight';
import ListDoorLockRemote from './ListDoorLockRemote';

export default function CekInOnlineTab() {
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
      name="Checkin list" 
      options={{ title: "Checkin list" }} 
      component={CekInOnline} 
    />
    <Tab.Screen 
      name="Door Lock" 
      options={{ title: "Door Lock" }} 
      component={ListDoorLock} 
    />
    <Tab.Screen 
      name="Electricity" 
      options={{ title: "Electricity" }} 
      component={ListDoorLockLight} 
    />
    <Tab.Screen 
      name="Remote" 
      options={{ title: "Remote" }} 
      component={ListDoorLockRemote} 
    />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
