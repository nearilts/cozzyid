import { View, Text, StatusBar, ScrollView, StyleSheet, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../const/color';
import axios from 'axios';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get('screen');
const cardWidth = width - 40; // Adjusted for padding

const TransactionList = ({ navigation }) => {
    const url = BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);


    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
    };
    const getTransactions = async () => {
        setIsLoading(true);
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}product-food-mytransaksi`,{}, { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTransactions(response.data.data); // Set the transactions data
            console.log(response.data.data)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    const handlePayment = (url) => {
        navigation.navigate('WebViews',url);
    };

    const handleCheckResi = (noResi) => {
        Alert.alert("Tracking", `Tracking number: ${noResi}`);
    };

    const renderTransaction = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.invoice}>Invoice: {item.invoice}</Text>
                <Text style={styles.status}>Status Payment: {item.status_payment}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                <Text style={styles.price}>Total: {formatPrice(item.total)}</Text>
                <Text style={styles.courier}>Courier: {item.kurir}</Text>
               
                {item.status_payment === "UNPAID" && (
                    <TouchableOpacity style={styles.button} onPress={() => handlePayment(item.url_payment)}>
                        <Text style={styles.buttonText}>Bayar</Text>
                    </TouchableOpacity>
                )}

                
            {item.status_payment === "PAID" && item.internet_information  && (
                     <TouchableOpacity 
                     style={styles.button} 
                     onPress={() => {
                        const internetInfo = JSON.parse(item.internet_information);
                        const infoList = internetInfo
                            .map(info => `Nama User: ${info.nama_user_mikhmon}\nPassword: ${info.password_user_mikhmon}`)
                            .join("\n\n"); // Pisahkan setiap informasi dengan baris kosong
                        Alert.alert("Informasi Internet", infoList);
                     }}
                 >
                     <Text style={styles.buttonText}>Lihat Informasi Internet</Text>
                 </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <Spinner visible={isLoading} />
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Daftar Transaksi</Text>
            </View>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={item => item.id.toString()} // Assuming each transaction has a unique 'id'
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        padding: 20,
        backgroundColor: COLORS.primary,
    },
    headerText: {
        fontSize: 24,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 10,
        padding: 15,
        margin: 10,
        elevation: 3,
    },
    invoice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 16,
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        marginVertical: 5,
    },
    courier: {
        fontSize: 16,
        marginVertical: 5,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
    },
});

export default TransactionList;
