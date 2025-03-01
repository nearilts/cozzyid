import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../../../const/color';
import OpenDoorLock from './OpenDoorLock';
import CekInOnline from '../../../screens/CekinOnline';
import ListDoorLock from './ListDoorLock';
import ListDoorLockLight from './ListDoorLockLight';
import ListDoorLockRemote from './ListDoorLockRemote';
import ButtomIconAktivitas from '../../../components/ButtomIconAktivitas';

export default function CekInOnlineTab() {
  const Tab = createMaterialTopTabNavigator();

  return (
    // <Tab.Navigator
    //   screenOptions={{
    //     tabBarItemStyle: { marginTop: 30 },
    //     tabBarInactiveTintColor: COLORS.grey,
    //     tabBarActiveTintColor: COLORS.dark
    //   }}
    // >
    // <Tab.Screen 
    //   name="Checkin list" 
    //   options={{ title: "Checkin list" }} 
    //   component={CekInOnline} 
    // />
    // <Tab.Screen 
    //   name="Door Lock" 
    //   options={{ title: "Door Lock" }} 
    //   component={ListDoorLock} 
    // />
    // <Tab.Screen 
    //   name="Electricity" 
    //   options={{ title: "Electricity" }} 
    //   component={ListDoorLockLight} 
    // />
    // <Tab.Screen 
    //   name="Remote" 
    //   options={{ title: "Remote" }} 
    //   component={ListDoorLockRemote} 
    // />
    // </Tab.Navigator>

    <View style={{ flex: 1, backgroundColor:COLORS.white }}>
    <StatusBar  backgroundColor={COLORS.primary} />


      <View style={styles.header}>
        <View>
          <View style={{flexDirection: 'row', top:10}}>
            <Text style={{fontSize: 28, color:COLORS.white, fontWeight: 'bold', marginLeft: 10}}>
              Aktivitas
            </Text>
          </View>
         
        </View>
      </View>
       <View style={styles.buttonContainer}>
        <ButtomIconAktivitas />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  }, header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor:COLORS.primary,
    paddingBottom:15
  },
});
