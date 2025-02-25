import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    ScrollView
} from 'react-native';
import COLORS from '../../../../const/color';
import Category from './Category';
import PaketRow from './PaketRow';
import { BASE_URL } from '../../../../config';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
const Provider = ({ onSelectionChange,handleTextChange, setSelectedOperator,selectedOperator }) => {
        const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [CreditPoint, setCreditPoint] = useState('0');

    const [isShowed, setisShowed] = useState(false);

    const [buttonPrice, setbuttonPrice] = useState([]);
    const url = BASE_URL;

    const fetchrajabiller = async () => {
            const response = await axios.get(`${BASE_URL}produk-rajabiller`, {
                params: {  "kategori": "HP PASCABAYAR" }
            });
            console.log('data', response.data);

            return Object.entries(response.data).map(([code, label]) => ({
                code: code,
                label: label,
                harga: 0, // atau Anda dapat menghitung harga dari data lain jika ada
                from_api: 'rajabiller',
            }));
        };

    const fetchData = async () => {
            try {
                const [rajabillerData] = await Promise.all([fetchrajabiller()]);
                setbuttonPrice([...rajabillerData]); 
            } catch (error) {
                console.error(error);
            }
        };
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                fetchData();
            });
            fetchData(); // Panggil fetchData saat komponen di-mount
    
            return unsubscribe;
        }, [navigation]);
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>No Hp / Id</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Masukkan No/Id' 
                    placeholderTextColor={COLORS.dark} 
                    value={phoneNumber}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        handleTextChange('phone',text);
                    }}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Credit' 
                    placeholderTextColor={COLORS.dark} 
                    value={CreditPoint}
                    onChangeText={(text) => {
                        setCreditPoint(text);
                        handleTextChange('credit',text);
                    }}
                />
            </View>

            <PaketRow SelectionChange={onSelectionChange} selectedOperator={selectedOperator} buttonPrice={buttonPrice} />
        </ScrollView>
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
        color: COLORS.dark

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
});

export default Provider;
