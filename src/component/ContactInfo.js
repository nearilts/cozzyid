import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import COLORS from '../const/color';

const handleOpenURL = (url) => {
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

const ContactInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Informasi Gangguan Atau Kendala Aplikasi</Text>
      <TouchableOpacity onPress={() => handleOpenURL('https://wa.me/628986167431')}>
        <Text style={styles.linkText}>Hubungi Call Center</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  infoText: {
    color: COLORS.dark,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 19,
  },
});

export default ContactInfo;
