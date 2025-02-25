import { View, Text, StatusBar, TouchableOpacity, ScrollView, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../const/color';
import { BASE_URL } from '../config';

const CekInOnline = ({ navigation }) => {

    const url = BASE_URL;
    const [profil, setProfil] = useState([]);
    
    const fetchProfil = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.get(`${url}listcheckins`, {
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
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}cekout-online/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Checkout Response:', response.data);
            // Optionally refresh the list after checkout
            navigation.navigate('RatingReview', response.data); 

        } catch (error) {
            console.error(error);
        }

        // navigation.navigate('RatingReview', id); 
    };

    const renderItem = ({ item }) => (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', padding: 5 }}>
                    <Text style={{ color: COLORS.dark, fontSize: 18 }}>
                        Cek in : {item.cekin}
                    </Text>
                    <Text style={{ color: COLORS.grey, fontSize: 13 }}>
                        Cek out : {item.cekout}
                    </Text>
                </View>
                <View style={{ padding: 5, backgroundColor: COLORS.primary, borderRadius: 10, width: 80, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    {item.status === 'Verifikasi' && !item.cekout_action ? (
                        <TouchableOpacity onPress={() => checkout(item.id)}>
                            <Text style={{ color: COLORS.white, fontSize: 13 }}>
                                Cekout Now
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ color: COLORS.white, fontSize: 13 }}>
                            {item.status}
                        </Text>
                    )}
                </View>
            </View>
            <View style={{ backgroundColor: COLORS.grey, width: '100%', height: 1 }}></View>
        </View>
    );

  
    const AddGroups = () => {
        navigation.navigate('AddCekinOnline');
      };
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

            <TouchableOpacity style={styles.floatingButton} 
                onPress={AddGroups}
                >
                    <Icon name="assignment-add" size={24} color={COLORS.white} />
                    <Text style={styles.floatingButtonText}>Cek In</Text>
                </TouchableOpacity>
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

export default CekInOnline;
