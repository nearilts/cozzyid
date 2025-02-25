import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity, TextInput ,Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../const/color';
import axios from 'axios';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('screen');
const cardWidth = width - 40; // Define cardWidth for consistent styling

const AddAddress = ({ navigation }) => {
    const url = BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [subdistricts, setSubdistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://pro.rajaongkir.com/api/province?key=3f8dad77e626845c7c30743ba8978b7b`);
            setProvinces(response.data.rajaongkir.results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCities = async (provinceId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://pro.rajaongkir.com/api/city?key=3f8dad77e626845c7c30743ba8978b7b&province=${provinceId}`);
            setCities(response.data.rajaongkir.results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubdistricts = async (cityId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://pro.rajaongkir.com/api/subdistrict?key=3f8dad77e626845c7c30743ba8978b7b&city=${cityId}`);
            setSubdistricts(response.data.rajaongkir.results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProvinceChange = (provinceId) => {
        setSelectedProvince(provinceId);
        fetchCities(provinceId);
    };

    const handleCityChange = (cityId) => {
        setSelectedCity(cityId);
        fetchSubdistricts(cityId);
    };

    const handleSubmit = async () => {
        if (!selectedSubdistrict || !address || !phone || !name) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}product-food-address`, {
                subdistrict_id: selectedSubdistrict,
                address: address,
                phone: phone,
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Success", response.data.message);
            navigation.goBack(); 
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to add address.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <Spinner visible={isLoading} />
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Add Address</Text>
            </View>

            <Picker
                selectedValue={selectedProvince}
                onValueChange={handleProvinceChange}
                style={styles.picker}
            >
                <Picker.Item label="Select Province" value="" />
                {provinces.map((province) => (
                    <Picker.Item key={province.province_id} label={province.province} value={province.province_id} />
                ))}
            </Picker>

            <Picker
                selectedValue={selectedCity}
                onValueChange={handleCityChange}
                style={styles.picker}
                enabled={selectedProvince !== ""}
            >
                <Picker.Item label="Select City" value="" />
                {cities.map((city) => (
                    <Picker.Item key={city.city_id} label={city.city_name} value={city.city_id} />
                ))}
            </Picker>

            <Picker
                selectedValue={selectedSubdistrict}
                onValueChange={(itemValue) => setSelectedSubdistrict(itemValue)}
                style={styles.picker}
                enabled={selectedCity !== ""}
            >
                <Picker.Item label="Select Subdistrict" value="" />
                {subdistricts.map((subdistrict) => (
                    <Picker.Item key={subdistrict.subdistrict_id} label={subdistrict.subdistrict_name} value={subdistrict.subdistrict_id} />
                ))}
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        paddingBottom: 15,
    },
    headerText: {
        fontSize: 28,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: cardWidth,
        margin: 10,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 5,
    },
    input: {
        height: 40,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        paddingHorizontal: 10,
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

export default AddAddress;
