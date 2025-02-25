import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import { BASE_URL } from '../../../../config';
import COLORS from '../../../../const/color';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ButtonPrice from './ButtonPrice';


const ListTagihan = ({ route,setCodePpob,setNominalPpob }) => {
        const navigation = useNavigation();
    const [buttonPrice, setbuttonPrice] = useState([]);
    const url = BASE_URL;
    const [selectedPriceId, setselectedPriceId] = useState(false);
    const [selectedId, setselectedId] = useState(false);
    const [isShowed, setisShowed] = useState(false);

    const fetchrajabiller = async () => {
            const response = await axios.get(`${BASE_URL}get-produk-rajabiller`, {
                params: {  "kategori": route.params }
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
    

        
        const handlePressPrice = (items) => {
            setselectedId(items);
            setNominalPpob(items)
        };
        
        const handlePress = (items) => {
            setselectedPriceId(items);
            setCodePpob(items.code)
            if (items.code === 'PLNPRAH') {
                setisShowed(true)
            } else {
                
            }
            console.log(items.code)
        };
    const HargaTagihan = [
        { code: '1', price: 20000,label: 'Rp. 20.000', },
        { code: '2', price: 50000,label: 'Rp. 50.000', },
        { code: '3', price: 100000,label: 'Rp. 100.000', },
        { code: '4', price: 200000,label: 'Rp. 200.000', },
        { code: '5', price: 50000,label: 'Rp. 500.000', },
        { code: '6', price: 1000000,label: 'Rp. 1.000.000', },
    ];
    const renderButtonPrice = ({ item }) => (
        <ButtonPrice 
            color={item.color} 
            onPress={() => handlePressPrice(item)} 
            label={item.label} 
            isSelected={selectedId?.code === item.code}
        />
    );
    const renderButton = ({ item }) => (
        <ButtonPrice 
            color={item.color} 
            onPress={() => handlePress(item)} 
            label={item.label} 
            isSelected={selectedPriceId?.code === item.code}
        />
    );
    return (
        <View style={styles.listContainer}>
        <Text style={styles.sectionHeader}>Pilih Paket</Text>
        {
            isShowed && (
                <>
                  <FlatList
                    data={HargaTagihan}
                    renderItem={renderButtonPrice}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}

                />
                </>
            )
        }

        {
           !isShowed && (
                <>
                 <FlatList
                    data={buttonPrice}
                    renderItem={renderButton}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}

                />
                </>
            )
        }
       
    </View>
    );
};

const styles = StyleSheet.create({
 
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

export default ListTagihan;
