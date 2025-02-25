import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListChat from './ListChat';
import ListFriend from './ListFriend';
import ListRequest from './ListRequest';
import AddFriend from './AddFriend';
import COLORS from '../../const/color';

export default function InboxScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cozzy Chat</Text>
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: { marginTop: 30 },
          tabBarInactiveTintColor: COLORS.grey,
          tabBarActiveTintColor: COLORS.dark,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          tabBarStyle: {
            backgroundColor: COLORS.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.dark,
          },
        }}
      >
        <Tab.Screen name="ListChat" options={{ title: "List Chat" }} component={ListChat} />
        <Tab.Screen name="ListFriend" options={{ title: "List Friend" }} component={ListFriend} />
        <Tab.Screen name="ListRequest" options={{ title: "List Request" }} component={ListRequest} />
        <Tab.Screen name="AddFriend" options={{ title: "Add Friend" }} component={AddFriend} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Background color for the entire screen
  },
  header: {
    top:20,
    marginLeft:20,
    fontSize: 24, // Size of the header text
    fontWeight: 'bold', // Font weight of the header text
    padding: 16, // Padding around the header text
    backgroundColor: COLORS.lightGrey, // Background color of the header,
    color:COLORS.primary
  },
});
