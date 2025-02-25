import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../const/color';
import { BASE_URL } from '../../../../config';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const ListPesawat = ({ navigation, route }) => {
    const url = BASE_URL;
    const [profil, setprofil] = useState({})
    const [isLoading, setIsLoading] = useState(false);
     
    
      const fetchprofil = async () => {
          try {
              let userInfo = await AsyncStorage.getItem('userInfo');
              userInfo = JSON.parse(userInfo);
              let token = userInfo.access_token.split('|')[1];
              const forms = {
                airline : route.params.maskapai.airline,
                departure : route.params.locations.code,
                arrival :route.params.ke.code,
                departureDate : route.params.tanggal,
                returnDate : route.params.tanggal,
                adult : route.params.dewasa,
                child : route.params.anak,
                infant : route.params.balita
            }
              const response = await axios.post(`${url}api_search_flight`,forms , {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              console.log('response', response)
              console.log('response', response.data.data)
              setprofil(response.data.data)
              
            } catch (error) {
              console.error(error);
          }
      }
      useEffect(() => {
          const unsubscribe = navigation.addListener('focus', () => {
              fetchprofil();
          });
          fetchprofil();
  
          return unsubscribe;
      }, [navigation]);
  
  
      console.log('profil', profil)
    console.log('params ',route.params)
    
    
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("BookingPesawat", {'item' : item, 'form': route.params})}>
                <View style={styles.buttonContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-around' }}>
                        <View style={{ backgroundColor: COLORS.white, flexDirection: 'row' }}>
                            <Image source={{ uri: item.airlineIcon }} style={{ width: 40, height: 40 }} resizeMode="contain" />
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginTop: 10 }}> {item.airlineName} </Text>
                        </View>
                        <Text style={{ color: COLORS.primary, fontWeight: 'bold', marginLeft: 10 }}> {item.isTransit ? 'Transit' : 'Non Transit'} </Text>
                    </View>
    
                    {item.classes.map((flight, index) => (
                            flight.map((flightClass, flightIndex) => (

                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginLeft: 10 }}> {flightClass.departureTime} {flightClass.departureTimeZoneText} </Text>
                                <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginLeft: 10 }}> {flightClass.departure} </Text>
                            </View>
    
                                <View style={{ flexDirection: 'column',alignItems: 'center' }}>
                                    <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginLeft: 10 }}> {flightClass.duration} </Text>
                                    <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginLeft: 10 }}> Availability: ({flightClass.availability}) </Text>
            
                                </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginLeft: 10 }}> {flightClass.arrivalTime} {flightClass.arrivalTimeZoneText}</Text>
                                <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginLeft: 10 }}> {flightClass.arrival} </Text>
                            </View>
                        </View>
                            ))

                    ))}
    
                    <View style={{ flexDirection: 'row', justifyContent:'space-around', marginTop: 10, marginLeft:20 }}>
                        <Text style={{ color: COLORS.red, fontWeight: 'bold', marginLeft: 10 }}>
                                    Rp. {item.classes[0][0]?.price.toLocaleString()}
                            </Text>
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginLeft: 10 }}>
                                    {route.params.tanggal}
                            </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    

    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Spinner visible={isLoading} />

        <StatusBar translucent backgroundColor={COLORS.navy} />
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                 marginTop: 20,
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 paddingHorizontal: 20,
                 backgroundColor: COLORS.navy,
                 paddingBottom: 15,
                }}>
                <View>
                    <View style={{ flexDirection: "row", width: '100%', height: 50, marginTop: 10 }}>
                        <Icon name="arrow-back" size={35} color={COLORS.white} onPress={navigation.goBack} />
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ marginLeft: 60, marginTop: 5, fontSize: 18, color: COLORS.white }}>Pesan Tiket Pesawat</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 22, color: COLORS.yellow, fontWeight: 'bold', }}>
                        Beli Tiket Pesawat
                        </Text>
                        <Text style={{ fontSize: 22, color: COLORS.white }}> di Cozzy.id</Text>
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 15, color: COLORS.white }}>
                    lebih lengkap, aman, mudah dan cepat.
                    </Text>
                    <Text style={{ marginTop: 10, fontSize: 12, color: COLORS.white }}>
                    Ada kendala hubungi CS Admin 24 jam di 08986167431
                    </Text>
                </View>
            </View>
            

                <View style={{ marginTop: 20, marginBottom:30 }}>

                {profil.rc === '61' ? (
                    <Text style={{ marginLeft: 10, fontSize: 16, color: COLORS.red }}>
                        {profil.rd}
                    </Text>
                ) : profil.rc === '00' && profil.data ? (
                    <FlatList
                        data={profil.data}
                        renderItem={renderItem}
                        keyExtractor={item => item.title.toString()} // Assuming each item has a unique id
                    />
                )
                    : profil.rc === '00' && !profil.data ? (
                        <Text style={{ marginLeft: 10, fontSize: 16, color: COLORS.dark }}>
                        Tidak ada data ...
                    </Text>
                    ) 
                    : (
                    <Text style={{ marginLeft: 10, fontSize: 16, color: COLORS.dark }}>
                        Loading Data ...
                    </Text>
                )}
                   
                </View>
       
            </ScrollView>
       
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        marginRight: 10,
        width: '95%',
        marginTop: 10,
        paddingVertical: 10, // Add vertical padding for better spacing
    },

    buttonContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightgrey,
        padding: 10, // Add padding for inner content
    },
});

export default ListPesawat;
