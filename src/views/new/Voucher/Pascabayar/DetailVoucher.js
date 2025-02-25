import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import COLORS from '../../../../const/color';
import ListTagihan from './ListTagihan';

const DetailVoucher = ({ navigation, route }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [CodePpob, setCodePpob] = useState('');


    const [TypeProvider, setTypeProvider] = useState([]);
    const handlePesanClick = () => {
        if (!phoneNumber || !CodePpob ) {
            alert('Isi Semua kolom');
            return;
        }

        console.log(`Phone Number: ${phoneNumber}`);
        console.log(`Selected CodePpob: ${CodePpob}`);
        console.log(`TypeProvider: ${TypeProvider.from_api}`);
        if(TypeProvider.from_api === 'tripay'){
            TransaksiTripay(phoneNumber,CodePpob);
        }else{
            TransaksiDigiflazz(phoneNumber,CodePpob);
        }
        
        
        // TransaksiRajabiller(phoneNumber,CodePpob,NominalPpob?.price || 0) 
    };
    const TransaksiDigiflazz = async (phoneNumber,selectedOperator) => {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        
        const response = await axios.post(`${BASE_URL}transaction-digiflazz`, {
            buyer_sku_code: selectedOperator , customer_no : phoneNumber 
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        console.log('response', response.data.data);
        navigation.navigate('WebViews',response.data.data.link_payment);

    };
    const TransaksiTripay = async (phoneNumber,selectedOperator) => {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        console.log("token",token)
        const response = await axios.post(`${BASE_URL}transaction-tripay`, {
           code: selectedOperator , phone:phoneNumber , no_meter_pln: ''
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        console.log('response', response.data.data);
        navigation.navigate('WebViews',response.data.data.link_payment);

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            <View style={{ marginLeft: 10, flexDirection: "row", width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
                <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={() => navigation.goBack()} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginLeft: 140, marginTop: 5, fontSize: 18, color: COLORS.dark }}>Voucher</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>No ID Voucher</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Masukkan No ID Voucher' 
                    placeholderTextColor={COLORS.dark} 
                    value={phoneNumber}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                    }}
                />
            </View>

            <ListTagihan route={route}  setCodePpob={setCodePpob} setTypeProvider={setTypeProvider} />

            </ScrollView>
            <View style={styles.footer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.priceText}> {TypeProvider?.price || 'Beli Voucher'}   </Text>
                </View>
                <TouchableOpacity style={styles.btnBooking} onPress={handlePesanClick} >
                    <Text style={styles.btnBookingText}>Pesan</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    headerContainer: {
        marginLeft: 35,
        marginTop: 20,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 15,
        color: COLORS.dark,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '90%',
        height: 60,
        backgroundColor: COLORS.lightgrey,
        borderRadius: 10,
        paddingHorizontal: 15,
        color:COLORS.dark
    },
    listContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30
    },
    sectionHeader: {
        fontSize: 15,
        color: COLORS.dark,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
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

export default DetailVoucher;
