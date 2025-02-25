import { View, Text, StatusBar, SafeAreaView, ScrollView, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { BASE_URL, URLS } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const ListProduct = ({ navigation }) => {
    const url = BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [countcart, setcountcart] = useState(0);
    const [services, setServices] = useState([]);
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null); // State for selected location

    const getCart = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}product-food-cart`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data.count);
            setcountcart(response.data.data.count);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCart();
        const unsubscribe = navigation.addListener('focus', () => {
            getCart();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${url}product-food`);
                setServices(response.data.data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };

        const getLocations = async () => {
            try {
                const response = await axios.get(`${url}locations`);
                setLocation(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        getUser();
        getLocations();
    }, []);

    const Card = ({ hotel }) => {
        const formatPrice = (price) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
        };

        return (
            <View style={style.card}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DetailProduct', hotel)}
                >
                    <View style={{ alignItems: 'center', top: -40 }}>
                        <Image source={{ uri: hotel && URLS + hotel.image }} style={{ height: 120, width: 120, borderRadius: 80, borderColor: COLORS.primary, borderWidth: 5 }} />
                    </View>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 20, top: -15, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.dark }}>{hotel.name}</Text>
                </View>
                <View style={{ marginTop: 10, top: -15, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.dark }}>
                        {formatPrice(hotel.price)}
                    </Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.addButton} onPress={() => AddCart(hotel.id)}>
                        <Icon name="shopping-cart" size={20} color={COLORS.white} />
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                    <View style={styles.locationContainer}>
                        <Icon name="place" size={20} color={COLORS.orange} />
                        <Text style={styles.locationText}>{hotel.location}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const getDataByLocation = async (title) => {
        console.log(title);
        setSelectedLocation(title);
        setServices([]);

        setIsLoading(true);
        const response = await axios.get(`${url}product-food?location=${title}`);
        setServices(response.data.data);
        setIsLoading(false);
    };

    const getCarts = async (id) => {
        setIsLoading(true);
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}product-food-order`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.message);
            getCart();
            alert(response.data.message);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const AddCart = async (id) => {
        getCarts(id);
    };

    const CekCart = async () => {
        if (countcart > 0) {
            navigation.navigate('ShopCart');
        } else {
            alert("Belum ada keranjang belanja");
        }
    };

    const ListTransaksi = async () => {
        navigation.navigate('TransactionList');
    };

    const renderItemLocation = ({ item }) => (
        <TouchableOpacity
            onPress={() => getDataByLocation(item.title)} // Set selected location on press
            style={{
                width: 90,
                height: 40,
                backgroundColor: selectedLocation === item.title ? COLORS.seconddark : COLORS.grey, // Change color based on selection
                marginLeft: 10,
                marginTop: 20,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center' // Center the text
            }}>
            <Text style={{ color: COLORS.white }}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <Spinner visible={isLoading} />
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={style.header}>
                <View>
                    <View style={{ flexDirection: 'row', top: 10 }}>
                        <Text style={{ fontSize: 28, color: COLORS.white, fontWeight: 'bold', }}>
                            Product & Food
                        </Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 18, color: COLORS.white }}>
                        Belanja Aman, dan Murah?
                    </Text>
                </View>
                <View style={{ marginTop: 20, marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => ListTransaksi()}>
                        <View style={{ position: 'relative', alignItems: 'center', marginRight:20, }}>
                            <Icon name="shopping-bag" size={30} color={COLORS.white} />
                            <View style={{
                                position: 'absolute',
                                borderRadius: 10,
                            }}>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => CekCart()}>
                        <View style={{ position: 'relative', alignItems: 'center' }}>
                            <Icon name="shopping-cart" size={30} color={COLORS.white} />
                            <View style={{
                                position: 'absolute',
                                right: -10, // Adjust this value to position the count closer to the icon
                                top: -5, // Adjust this value to position the count vertically
                                backgroundColor: COLORS.red, // Change this to your desired color
                                borderRadius: 10,
                                paddingHorizontal: 5,
                                paddingVertical: 2,
                            }}>
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>{countcart}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={location}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemLocation}
                keyExtractor={item => item.id}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={services}
                renderItem={({ item }) => <Card hotel={item} />}
            />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        paddingBottom: 15
    },
    card: {
        height: 220,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
});

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 90,
        right: 30, // Position it to the right side
        backgroundColor: COLORS.primary,
        width: 150,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        flexDirection: 'row',
        zIndex: 1000, // Ensure it appears above other components
    },
    floatingButtonText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically centered
        marginLeft: 8,
        position: 'relative', // Allow absolute positioning of the location container
    },
    addButton: {
        backgroundColor: COLORS.primary,
        height: 40,
        width: 65,
        borderRadius: 10,
        flexDirection: 'row', // Ensure icon and text are in a row
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
    },
    addButtonText: {
        marginLeft: 5,
        color: COLORS.white,
    },
    locationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
        alignItems: 'center', // Align items vertically centered
    },
    locationText: {
        marginLeft: 5,
        color: COLORS.dark,
    },
});

export default ListProduct;
