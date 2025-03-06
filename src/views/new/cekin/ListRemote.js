import { View, Text, StatusBar, TouchableOpacity, ScrollView, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../config';
import COLORS from '../../../const/color';
import BackButtonHeader from '../../../component/BackButtonHeader';

const ListRemote = ({ navigation, route }) => {

    console.log(route.params.token)
    const url = BASE_URL;
    const [profil, setProfil] = useState([]);
    
    const fetchProfil = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}listremote/${route.params.token}/remote-list`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response.data.result);
            setProfil(response.data.result);

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

    const categoryMapping = {
        1: 'STB',
        2: 'TV',
        5: 'AC',
    };

    const checkout = async (item) => {
       
        // alert(item.category_id)
        if(item.category_id === 5){
            navigation.navigate('RemoteAc', {'item' : item, 'route' : route.params}); 
        }else{
            navigation.navigate('RemoteTv', {'item' : item, 'route' : route.params}); 
        }
       
    };
    const renderItem = ({ item }) => (
        <View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.remote_name} ({categoryMapping[item.category_id] || 'Unknown'})</Text>
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => checkout(item)}
                >
                    <Icon name="chevron-right" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            
            <BackButtonHeader title="Remote" backgroundColor={COLORS.primary} arrowColor="#fff" />

            <View style={{ paddingBottom: 25, paddingTop:45 }}>
                <View style={{ borderRadius: 30, backgroundColor: COLORS.white }}>
                    <View style={{ paddingTop: 20 }}>
                    {profil.length > 0 ? (
                            
                        <FlatList
                            data={profil}
                            renderItem={renderItem}
                               keyExtractor={item => item.id}
                        />
                    ) : (
                        <Text style={styles.noDataText}>No data available</Text>
                    )}
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 20,
    },
    itemText: {
        color: COLORS.white,
        fontSize: 16,
    },
    itemButton: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 20,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
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
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: COLORS.gray,
    },
});

export default ListRemote;
