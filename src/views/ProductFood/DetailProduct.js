import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';

import { BASE_URL, URLS } from '../../config';

import axios from 'axios';
import RenderHTML from 'react-native-render-html';
import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const DetailProduct = ({ navigation, route }) => {
  console.log(route.params);
    const url = BASE_URL;
    const [place, setPlace] = useState(route.params);
    const { width } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false);

      const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
      };


      const getCart = async (id) => {
        setIsLoading(true);


        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]
            const response = await axios.post(`${url}product-food-order`,{id}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.message)
            alert(response.data.message)
        } catch (error) {
            console.error(error);
        }
      setIsLoading(false);

    };


      const AddCart = async (id) => {
       
        getCart(id)

    };
      const htmlContent = place.description || '';
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor={COLORS.transparent} />
        <ScrollView>

      <Spinner visible={isLoading} />
            
        <ImageBackground style={{ flex: 0.7, height:300 }} source={{ uri: place && URLS+ place.image }}>
            <View style={styles.header}>
            <Icon name="arrow-back" size={35} color={COLORS.white} onPress={navigation.goBack} />
            {/* <Icon name="more-vert" size={28} color={COLORS.white} /> */}
            </View>
        
        </ImageBackground>

        <View style={{top:-50, alignItems:'center'}}>
            <View style={{height:90, width:'90%', backgroundColor:COLORS.secondgrey, borderRadius:20}}>
                <View style={{alignItems:'center', marginTop:20}}>
                    <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:20}}>
                        {place.name}
                    </Text>
                </View>
            </View>
        </View>
        <View style={{top:-40,marginLeft:20}}>
            <Text style={{color:COLORS.dark, fontWeight:'bold', fontSize:18}}> Product Description </Text>
        </View>
        <View style={{top:-50, marginLeft:20}}>
        <View style={{ marginTop:20}}>
            <RenderHTML contentWidth={width} source={{ html: htmlContent }} />
        </View>
        </View>

        </ScrollView>
        <View style={styles.footer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.priceText}> {formatPrice(place.price)} </Text>
            </View>
            <TouchableOpacity style={styles.btnBooking}  onPress={() => AddCart(place.id)} >
            <Text style={styles.btnBookingText}>Add Cart</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      },
      footer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth:1,
        borderTopColor:COLORS.secondgrey

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

export default DetailProduct;
