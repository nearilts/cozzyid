import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
} from 'react-native';
import COLORS from '../../../../const/color';
import ButtonProvider from './ButtonProvider';
import { BASE_URL } from '../../../../config';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Category = ({ setisShowed, setSelectedOperator,setbuttonPrice }) => {
    const [selectedOperatorId, setSelectedOperatorId] = useState(null);
    const navigation = useNavigation();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
      };

    const handlePressOperator = (items) => {
        setSelectedOperatorId(items.id);
        setSelectedOperator(items);
        if (items.from_api === 'tripay') {
            getPriceTripay(items)
        } else {
            getPriceDigiflazz(items)
        }
       
        
    };
    const getPriceTripay = async (items) => {
        const response = await axios.get(`${BASE_URL}produk-tripay-harga`, {
            params: { category_id: 2, operator_id:items.id }
        });

        const datas = response.data.map(item => ({
            ...item,
            label: item.product_name ,
            harga: (item.price || 0) + (item.margin_up || 0),
            price:  formatPrice((item.price || 0) + (item.margin_up || 0)),
            from_api: 'tripay',
        }));

        setbuttonPrice(datas);
        setisShowed(true);

    };
    
    const getPriceDigiflazz = async (items) => {
        const response = await axios.get(`${BASE_URL}produk-digiflazz`, {
            params: { category: items.category, brand:items.brand }
        });

        const datas = response.data.map(item => ({
            ...item,
            label: item.product_name ,
            harga: (item.price || 0) + (item.margin_up || 0),
            price:  formatPrice((item.price || 0) + (item.margin_up || 0)),
            from_api: 'digiflazz',
        }));

        setbuttonPrice(datas);
        setisShowed(true);

    };
    const url = BASE_URL;
    const [buttonData, setButtonData] = useState([]);


    const fetchdigiflazz = async () => {
        const response = await axios.get(`${BASE_URL}category-digiflazz`,
            {
                params: { "category": "Data" }
            }
        );

        return response.data.map(item => ({
            ...item,
            name: item.brand + ' - DGF',
            codex: item.brand,
            category: item.category,
            from_api: 'digiflazz',
        }));
    };

    const fetchData = async () => {
        try {
            // const [tripayData, digiflazzData] = await Promise.all([fetchtripay(), fetchdigiflazz()]);
            const [digiflazzData] = await Promise.all([fetchdigiflazz()]);
            setButtonData([...digiflazzData]); 
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

    const renderButtonProvider = ({ item }) => (
        <ButtonProvider 
            iconName="defaultIcon"
            onPress={() => handlePressOperator(item)} 
            label={item.name} 
            isSelected={selectedOperatorId === item.id}
        />
    );

    return (
        <View style={styles.listContainer}>
            <Text style={styles.sectionHeader}>Pilih Operator</Text>
            <FlatList
                data={buttonData}
                renderItem={renderButtonProvider}
                keyExtractor={item => item.id.toString()}
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

export default Category;
