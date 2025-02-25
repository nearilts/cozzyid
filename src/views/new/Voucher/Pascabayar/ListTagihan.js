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


const ListTagihan = ({ route,setCodePpob,setTypeProvider }) => {
        const navigation = useNavigation();
    const [buttonPrice, setbuttonPrice] = useState([]);
    const url = BASE_URL;
    const [selectedPriceId, setselectedPriceId] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
      };

    const fetchdigiflazz = async () => {
            const response = await axios.get(`${BASE_URL}getSubCategories-digiflazz`, {
                params: {  "category":"Voucher",  "brand" : route.params.label }
            });
            console.log('data', response.data);

            return response.data.map(item => ({
                ...item,
                code: item.buyer_sku_code ,
                label: item.product_name ,
                harga: (item.price || 0) + (item.margin_up || 0),
                price:  formatPrice((item.price || 0) + (item.margin_up || 0)),
                from_api: 'digiflazz',
            }));
        };

        const fetchtripay = async () => {
            const response = await axios.get(`${BASE_URL}produk-tripay-harga`, {
                params: {  "category_id": route.params.category_id,"operator_id": route.params.operator_id }
            });
            console.log('data', response.data);

            return response.data.map(item => ({
                ...item,
                code: item.code ,
                label: item.product_name + " - TRP" ,
                harga: (item.price || 0) + (item.margin_up || 0),
                price:  formatPrice((item.price || 0) + (item.margin_up || 0)),
                from_api: 'tripay',
            }));
        };

    const fetchData = async () => {
            try {
                console.log("route",route.params)
                if(route.params.tripay === true){
                    const [DigiflazzData, TripayData] = await Promise.all([fetchdigiflazz(),fetchtripay()]);
                    setbuttonPrice([...DigiflazzData,...TripayData]); 
                }else{
                    const [DigiflazzData] = await Promise.all([fetchdigiflazz()]);
                    setbuttonPrice([...DigiflazzData]); 
                }
               
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
    

        
      
        const handlePress = (items) => {
            setselectedPriceId(items);
            setCodePpob(items.code)
            setTypeProvider(items)
            console.log(items.from_api)
            console.log(items.code)
            console.log(items.price)
        };
   
    const renderButton = ({ item }) => (
        <ButtonPrice 
            price={item.price}
            color={item.color} 
            onPress={() => handlePress(item)} 
            label={item.label} 
            isSelected={selectedPriceId?.code === item.code}
        />
    );
    return (
        <View style={styles.listContainer}>
        <Text style={styles.sectionHeader}>Pilih Paket</Text>
        <FlatList
            data={buttonPrice}
            renderItem={renderButton}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}

        />
       
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
