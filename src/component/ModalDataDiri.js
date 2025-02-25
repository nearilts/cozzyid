// components/ModalDataDiri.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import COLORS from '../const/color';
const ModalDataDiri = ({ visible, Checkemail, Resends ,onClose}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>Before proceeding, please check your email for a verification link. If you did not receive the email, </Text>
          <TouchableOpacity onPress={Resends} style={styles.button}>
            <Text style={styles.buttonText}>Resend</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Checkemail} style={styles.button}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    width: 364,
    height: 337,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    height: 80,
    width: 90,
  },
  title: {
    paddingTop: 22,
    color: COLORS.dark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.dark,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ModalDataDiri;
