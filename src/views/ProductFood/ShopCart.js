import { View, Text, StatusBar, ScrollView, StyleSheet, FlatList, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../const/color';
import axios from 'axios';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector';

const { width } = Dimensions.get('screen');
const cardWidth = width - 40; // Adjusted for padding

const ShopCart = ({ navigation }) => {
    const url = BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [countcart, setCountCart] = useState(0);
    const [cart, setCart] = useState([]);
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState("");
   
    
    const [hotel, setHotel] = useState(""); // Hotel input
    const [room, setRoom] = useState(""); // Room input


    const [PriceCourir, setPriceCourir] = useState([]); // Selected courier
    const [selectedPriceCourir, setSelectedPriceCourir] = useState(0); // Selected courier
    const [address, setAddress] = useState([]); // State to hold address data
    const [selectedAddress, setSelectedAddress] = useState(""); // Selected address ID
    const [courierOptions, setCourierOptions] = useState([]); // State to hold courier options
    const [selectedCourier, setSelectedCourier] = useState(""); // Selected courier


    const [TotalPrice, setTotalPrice] = useState(0); // Room input
    const [TotalGram, setTotalGram] = useState(0); // Room input
    const [selectedHotel, setSelectedHotel] = useState(""); // Selected address ID

    const getCart = async () => {
        setIsLoading(true);
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}product-food-cart`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTotalPrice(response.data.data.totalharga)
            setTotalGram(response.data.data.totalgram)
            setCountCart(response.data.data.count);
            setCart(response.data.data.datas); 
            setHotel(response.data.data.hotel); 
            setType(response.data.data.type); 
            setAddress(response.data.data.address); // Set the address data
            setCourierOptions(Object.entries(response.data.data.courir).map(([key, value]) => ({ key, value }))); // Set courier options
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const [selectedLabel, setSelectedLabel] = useState(
        type[selectedType] || "Choose Type"
      );
    
      const typeOptions = [
        { key: "default", label: "Choose Type", value: "" }, // Opsi default
        ...Object.entries(type).map(([key, label], index) => ({
          key: index + 1, // Pastikan key unik
          label: label,
          value: key,
        })),
      ];
    useEffect(() => {
        getCart();
        const unsubscribe = navigation.addListener('focus', () => {
            getCart();
        });

        return unsubscribe;
    }, [navigation]);

    const updateQuantity = (item, quantity) => {
        console.log(quantity);
        if (quantity <= 0) {
            DeleteCart(item.id)
            return;
        }
        const updatedCart = cart.map(cartItem => {
            if (cartItem.product_id === item.product_id) {
                return { ...cartItem, qty: quantity }; // Update the quantity
            }
            return cartItem; // Return the item unchanged
        });
        setCart(updatedCart); // Update the cart state
        AddCart(item.product_id, quantity); // Call the API to update the cart on the server
    };
    const DeleteCart = async (id) => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}product-food-delete`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getCart();
        } catch (error) {
            console.error(error);
        }
    };
    const AddCart = async (id, qty) => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}product-food-order`, { id, qty }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleTypeChange = (itemValue) => {
        setSelectedType(itemValue);
        if (itemValue === "kirim" && address.length === 0) {
            navigation.navigate('AddAddress');
        }else  if (itemValue === "kirim"){
            setRoom("");
            setSelectedHotel("")
        }else  if (itemValue === "antar"){
            setSelectedAddress("");
            setSelectedCourier("");
            setSelectedPriceCourir(0)
        }
    };

    const handleAddressChange = (itemValue) => {
        setSelectedAddress(itemValue);
    };

    const handleCourierChange = (itemValue) => {
        setSelectedCourier(itemValue);

        ongkir(selectedAddress, itemValue)
        
    };
    const ongkir = async (destination, courier) => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            console.log(`${url}product-food-ongkir`, { destination, courier })

            const response = await axios.post(`${url}product-food-ongkir`, { destination, courier }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.costs)
            setPriceCourir(response.data.costs)
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = () => {
        if (selectedHotel === "" && room === "" && selectedAddress ==="" && selectedPriceCourir === 0) {
            alert("Lengkapi Data Terlebih dahulu")
            return;
        }
        const formData = {
            hotel:selectedHotel,
            room:room,
            type_order: selectedType,
            address_id: selectedAddress,
            totalgram: TotalGram,
            totalharga: TotalPrice,
            courier: selectedCourier,
            price_courier: selectedPriceCourir,
            // Add other necessary fields here
        };
        Transaksi(formData)
        console.log(formData); // Log the form data for debugging
    };

    
    const Transaksi = async (formData) => {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        
        const response = await axios.post(`${BASE_URL}product-food-transaksi`, {
            formData
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

            setIsLoading(false);
        console.log('response', response.data);
        if(response.data.data.url_payment){
            navigation.navigate('WebViews',response.data.data.url_payment);
        }
        if(response.data.message){
            alert(response.data.message)
            return;
        }



    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
    };
    const onTypeChange = (value) => {
        console.log("Type changed to:", value);
        setSelectedType(value); // Simpan nilai yang dipilih jika diperlukan
    };

    const Card = ({ item }) => {
       

        return (
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.productName}>{item?.product?.name}</Text>
                    <Text style={styles.productPrice}>{formatPrice(item?.product?.price)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => updateQuantity(item, item.qty - 1)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.quantityInput}
                            value={String(item.qty)}
                            keyboardType="numeric"
                            onChangeText={(text) => updateQuantity(item, parseInt(text) || 0)}
                        />
                        <TouchableOpacity onPress={() => updateQuantity(item, item.qty + 1)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={{ backgroundColor: COLORS.secondgrey }}>
            <Spinner visible={isLoading} />
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={styles.header}>
                <View>
                    <View style={{ flexDirection: 'row', top: 10 }}>
                        <Text style={{ fontSize: 28, color: COLORS.white }}>Keranjang,</Text>
                        <Text style={{ fontSize: 28, color: COLORS.white, fontWeight: 'bold', marginLeft: 10 }}>
                            Belanja Anda
                        </Text>
                    </View>
                   
                </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={cart}
                renderItem={({ item }) => <Card item={item} />}
                keyExtractor={item => item.product_id.toString()} // Assuming each item has a unique 'product_id'
            />
            <ModalSelector
                    data={typeOptions}
                    initValue="Choose Type"
                    onChange={(option) => {
                        setSelectedLabel(option.label);
                        onTypeChange(option.value);
                    }}
                    style={styles.picker}
                    selectTextStyle={{
                    color: "black",
                    }}
                />

            {/* Address Picker */}
            {selectedType === "kirim" && (
                <View style={{}}>
                    <ModalSelector
                            data={address.map((addr) => ({
                                key: addr.id,
                                label: addr.address,
                                value: addr.id,
                            }))}
                            initValue="Choose Address"
                            onChange={(option) => handleAddressChange(option.value)}
                            style={styles.picker}
                            selectTextStyle={{ color: "black" }}
                            />

                      {/* Courier Picker */}
                      <ModalSelector
                            data={courierOptions.map((courier) => ({
                                key: courier.key,
                                label: courier.value,
                                value: courier.key,
                            }))}
                            initValue="Choose Courier"
                            onChange={(option) => handleCourierChange(option.value)}
                            style={styles.picker}
                            selectTextStyle={{ color: "black" }}
                            />

                        <ModalSelector
                        data={PriceCourir.map((courier) => ({
                            key: courier.service,
                            label: `${courier.description} - ${formatPrice(courier?.cost[0]?.value)}`,
                            value: courier?.cost[0]?.value,
                        }))}
                        initValue="Choose Price"
                        onChange={(option) => setSelectedPriceCourir(option.value)}
                        style={styles.picker}
                        selectTextStyle={{ color: "black" }}
                        />

                </View>
            )}

          
            {/* Address Picker */}
            {selectedType === "antar" && (
                <View style={{}}>
                  <ModalSelector
                        data={hotel.map((h) => ({
                            key: h.id,
                            label: h.title,
                            value: h.id,
                        }))}
                        initValue="Choose Hotel"
                        onChange={(option) => setSelectedHotel(option.value)}
                        style={styles.picker}
                        selectTextStyle={{ color: "black" }}
                        />
                    <TextInput
                        style={styles.input}
                        placeholder="No Kamar"
                        value={room}
                        onChangeText={setRoom}
                    />
                </View>
            )}
                   
            <TextInput
                style={[styles.input, { height: 0, opacity: 0 }]}
                placeholder="Total Price"
                value={String(TotalPrice)} // Display the total price
                editable={false} // Make it read-only
            />
            <View style={styles.additionalInfo}>
                <Text style={{color:COLORS.dark}}>
                    Harga Sub Total : {formatPrice(TotalPrice)}
                </Text>
            </View>
           
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Bayar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        paddingBottom: 15,
    },
    card: {
        height: 120,
        width: cardWidth,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: COLORS.white,
        padding: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    productPrice: {
        fontSize: 16,
        color: COLORS.dark,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 5,
        width: 30,
        alignItems: 'center',
    },
    quantityButtonText: {
        color: COLORS.white,
        fontSize: 18,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 5,
        width: 50,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    picker: {
        height: 50,
        width: cardWidth,
        margin: 10,
        borderColor: COLORS.grey,
        backgroundColor:COLORS.white,
        borderWidth: 1,
        borderRadius: 5,
    },
    additionalInfo: {
        borderRadius:10,
        padding: 10,
        backgroundColor: COLORS.white,
        margin: 10,
    },
    input: {
        height: 50,
        width: cardWidth,
        margin: 10,
        borderColor: COLORS.grey,
        backgroundColor:COLORS.white,
        borderWidth: 1,
        borderRadius: 5,
        color:COLORS.dark
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
    },
});

export default ShopCart;
