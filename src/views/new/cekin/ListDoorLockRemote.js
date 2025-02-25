import { View, Text, StatusBar, TouchableOpacity, ScrollView, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../config';
import COLORS from '../../../const/color';

const ListDoorLockRemote = ({ navigation }) => {

    const url = BASE_URL;
    const [profil, setProfil] = useState([]);
    
    const fetchProfil = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            console.log(`${url}listroomremote`);

            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}listroomremote`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response.data);
            setProfil(response.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchProfil();
        });
        fetchProfil();

        return unsubscribe;
    }, [navigation]);

    const checkout = async (id) => {
       

        navigation.navigate('ListRemote', id); 
    };

    const renderItem = ({ item }) => (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', padding: 5 }}>
                <Text style={{ color: COLORS.dark, fontSize: 18 }}>
                       No  : {item.room.name}
                    </Text>
                    <Text style={{ color: COLORS.grey, fontSize: 13 }}>
                        Location : {item.room.location}
                    </Text>
                    <Text style={{ color: COLORS.grey, fontSize: 13 }}>
                    {item.verifikasi_booking.cekin}  {item.verifikasi_booking.cek_in_hour} -  {item.verifikasi_booking.cekout}  {item.verifikasi_booking.cek_out_hour}
                    </Text>
                </View>
                <View style={{ padding: 5, backgroundColor: COLORS.primary, borderRadius: 10, width: 80, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => checkout(item)}>
                            <Text style={{ color: COLORS.white, fontSize: 13 }}>
                                Remote 
                            </Text>
                        </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: COLORS.grey, width: '100%', height: 1 }}></View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            

            <View style={{  paddingLeft: 20, paddingBottom: 25 }}>
                <View style={{ borderRadius: 30, backgroundColor: COLORS.white }}>
                    <View style={{ paddingTop: 20 }}>
                        <View style={{ backgroundColor: COLORS.dark, width: '100%', height: 1 }}></View>
                        <FlatList
                            data={profil}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    
    floatingButton: {
        position: 'absolute',
        bottom: 90,
        left: 30,
        backgroundColor: COLORS.primary,
        width: 150,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        flexDirection: 'row',
    },
    floatingButtonText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 10,
    },
    
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
    },
    input: {
        width: 299,
        height: 60,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        color: COLORS.dark,
    },
});

export default ListDoorLockRemote;
