// components/ModalOtpShow.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import COLORS from '../const/color';
import ContactInfo from './ContactInfo';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ModalOtpShow = ({ visible, Checkemail, Resends,handleOtpChange,onClose,users }) => {

  
  console.log('users --- users',users)
  const url = BASE_URL;

  const [formData, setFormData] = useState({
    phone: users?.data?.phone,
});

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const HandledLogout = () => {
    console.log('Form Data:', formData);
    kirimdata()
    
  };
  const kirimdata = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];
      console.log('formData', formData);

      const response = await axios.post(`${url}update_profil`, {
        phone: formData.phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response', response.data);
      if (response.data.code == 1) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Validasi OTP Anda</Text>
          <Text style={styles.subtitle}>Sebelum melanjutkan, mohon periksa WA Anda untuk kode verifikasi. Jika Anda tidak menerima WA, klik tautan ini untuk meminta kode verifikasi lainnya.. </Text>
          
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleOtpChange('otp', value)}
            placeholder="Enter OTP"
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={Resends} style={styles.button}>
            <Text style={styles.buttonText}>Kirim Ulang</Text>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={Checkemail} style={styles.button}>
            <Text style={styles.buttonText}>Periksa OTP</Text>
          </TouchableOpacity>


            <View style={{ marginTop: 50 }}>
                <Text style={{ color: COLORS.dark, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Phone</Text>
                <TextInput
                    style={{width:230, backgroundColor: COLORS.secondgrey, borderRadius: 10, color: COLORS.dark, borderColor:COLORS.dark }}
                    defaultValue={users?.data?.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    placeholder="Isi No Telpon"
                    placeholderTextColor={COLORS.dark}
                />
            </View>
            
            <View style={{ marginHorizontal: 30, top: 20, marginBottom:30 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={HandledLogout}>
                <View style={{ ...styles.btnContainer, backgroundColor: COLORS.primary }}>
                    <Text style={{ ...styles.title, color: COLORS.white }} >Ganti No Hp</Text>
                </View>
                </TouchableOpacity>
            </View>
          <View style={{marginTop:350}}>
          <ContactInfo />
          </View>

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
    width:  "100%",
    height: "100%",
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
    paddingBottom:10
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
  }, input: {
    backgroundColor: COLORS.light,
    borderRadius: 10,
    color: COLORS.dark,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  title: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 },
  btnContainer: {
    backgroundColor: COLORS.primary,
    width:250,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalOtpShow;
