import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native';

import COLORS from '../../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../../config';
import { addDays } from 'date-fns';
import { SIZES, icons, images } from '../../../constants';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import ImageResizer from 'react-native-image-resizer';
import ProfilFoto from './ProfilFoto';
import ButtonProfil from './ButtonProfil';


const Profil = ({ navigation }) => {
    const {isLoading,logouts} = useContext(AuthContext);
  
    const HandledLogout = () => {
        logouts(navigation)
        
      };
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            <View style={{width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginTop: 5, fontSize: 18, color: COLORS.dark }}>Profil</Text>
                </View>
               
            </View>

            
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.padding}>
                        <ProfilFoto />
                    </View>
                    <View style={styles.padding}>
                        <ButtonProfil />
                    </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnBooking}  onPress={HandledLogout}>
                <Text style={styles.btnBookingText}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    padding :{
        margin:20
    },
    footer: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor: COLORS.white,
        height: 70,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopColor:COLORS.secondgrey,
        bottom:50

      },
      btnBooking: {
        height: 70,
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnBookingText: {
        color: COLORS.white, 
        fontSize: 20, 
      },
});

export default Profil;
