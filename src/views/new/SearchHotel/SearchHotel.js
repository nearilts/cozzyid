import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import COLORS from '../../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { addDays } from 'date-fns';
import FormSearch from './components/FormSearch';
import CategoryList from './components/CategoryList';
import OurRecomendation from './components/OurRecomendation';

const {width} = Dimensions.get("screen"); 
const cardwidht = width / 1.8;

const SearchHotel = ({ navigation }) => {
    const url = BASE_URL;
    const [location, setLocation] = useState([]);
    
    const [formData, setFormData] = useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        adults: '1',
        childs: '0',
        locations: '',
    });

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSearch = () => {
        console.log('Form Data:', formData);
        if (!formData.locations) {
            alert('Location Is Required.');
            return;
        }
        navigation.navigate('Services', formData);
    };

    const getLocations = async () => {
        try {
            const response = await axios.get(`${url}locations`);
            setLocation(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };
    const locationData = location.map((loc) => ({
        key: loc.id,
        label: loc.title,
        value: String(loc.id),
      }));
    useEffect(() => {
        getLocations();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            <View style={{ flexDirection: "row", width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 30 }}>
                <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={navigation.goBack} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginLeft: 140, marginTop: 5, fontSize: 18, color: COLORS.dark }}>Search</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FormSearch 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    handleSearch={handleSearch} 
                    location={locationData} 
                />


            <CategoryList />

            <OurRecomendation />




            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default SearchHotel;
