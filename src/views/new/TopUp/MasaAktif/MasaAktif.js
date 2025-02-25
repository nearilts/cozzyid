import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Provider from './Provider';
import COLORS from '../../../../const/color';

const MasaAktif = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleSelectionChange = (pkg) => {
        console.log(pkg)
        
        setSelectedOperator(pkg);
        setSelectedPackage(pkg.price);
    };

    const [CreditPoint, setCreditPoint] = useState('0');
    const handleTextChange  = (key, value) => {
        if(key === 'phone'){
            setPhoneNumber(value);
        }else if(key === 'credit'){
            setCreditPoint(value);

        }
    };
    const handlePesanClick = () => {
        if (!phoneNumber || !selectedOperator || !selectedPackage) {
            alert('Please fill in all fields');
            return;
        }
        console.log(`Phone CreditPoint: ${CreditPoint}`);
        console.log(`Phone Number: ${phoneNumber}`);
        console.log(`Selected Operator: ${selectedOperator.from_api}`);
        console.log(`Selected Package: ${selectedPackage}`);
        
        if (selectedOperator.from_api === 'tripay') {
            TransaksiTripay(phoneNumber,selectedOperator.code,CreditPoint)
            
        } else {
            TransaksiDigiflazz(phoneNumber,selectedOperator.buyer_sku_code,CreditPoint)
            
        }
    };

    const TransaksiDigiflazz = async (phoneNumber,selectedOperator,CreditPoint) => {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        
        const response = await axios.post(`${BASE_URL}transaction-digiflazz`, {
            buyer_sku_code: selectedOperator , customer_no : phoneNumber , credit: CreditPoint
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        console.log('response', response.data.data);
        if(response.data.message){
            alert(response.data.message)
            return;
        }


        if(response.data.data.link_payment){
            navigation.navigate('WebViews',response.data.data.link_payment);
        }

        setbuttonPrice(datas);
        setisShowed(true);

    };
    const TransaksiTripay = async (phoneNumber,selectedOperator,CreditPoint) => {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        console.log("token",token)
        const response = await axios.post(`${BASE_URL}transaction-tripay`, {
           code: selectedOperator , phone:phoneNumber , no_meter_pln: '', credit: CreditPoint
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        console.log('response', response.data.data);
        if(response.data.message){
            alert(response.data.message)
            return;
        }


        if(response.data.data.link_payment){
            navigation.navigate('WebViews',response.data.data.link_payment);
        }
        setbuttonPrice(datas);
        setisShowed(true);

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            <View style={{ marginLeft: 10, flexDirection: "row", width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
                <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={() => navigation.goBack()} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginLeft: 140, marginTop: 5, fontSize: 18, color: COLORS.dark }}>Masa Aktif</Text>
                </View>
            </View>

            <Provider onSelectionChange={handleSelectionChange} handleTextChange={handleTextChange} setSelectedOperator={setSelectedOperator} selectedOperator={selectedOperator} />

            <View style={styles.footer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.priceText}> Harga: {selectedPackage || 'Belum Dipilih'} </Text>
                </View>
                <TouchableOpacity style={styles.btnBooking} onPress={handlePesanClick}>
                    <Text style={styles.btnBookingText}>Pesan</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.secondgrey
    },
    priceText: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: COLORS.dark,
    },
    btnBooking: {
        height: 50,
        width: 150,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBookingText: {
        color: COLORS.white, 
        fontSize: 16, 
        fontWeight: 'bold',
    },
});

export default MasaAktif;
