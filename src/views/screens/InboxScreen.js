import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ListChat from './ListChat';
import ListFriend from './ListFriend';
import ListRequest from './ListRequest';
import AddFriend from './AddFriend';
import COLORS from '../../const/color';

const tabs = [
  { name: 'ListChat', title: 'List Chat', component: ListChat },
  { name: 'ListFriend', title: 'List Friend', component: ListFriend },
  { name: 'ListRequest', title: 'List Request', component: ListRequest },
  { name: 'AddFriend', title: 'Add Friend', component: AddFriend },
];

export default function InboxScreen() {
  const [activeTab, setActiveTab] = useState('ListChat');
  const ActiveComponent = tabs.find(tab => tab.name === activeTab).component;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cozzy Chat</Text>
      
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tabButton, activeTab === tab.name && styles.activeTab]}
            onPress={() => setActiveTab(tab.name)}
          >
            <Text style={[styles.tabText, activeTab === tab.name && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={{ flex: 1 }}>
        <ActiveComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    top: 20,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: COLORS.lightGrey,
    color: COLORS.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.dark,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.grey,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.dark,
  },
  activeTabText: {
    color: COLORS.dark,
  },
});
