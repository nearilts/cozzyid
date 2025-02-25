import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import COLORS from '../../../const/color';
import ButtonCircle from '../components/ButtonCircle';
import { useNavigation } from '@react-navigation/native';


const ButtonTopUp = () => {
    const navigation = useNavigation();


    const buttonData = [
        { id: '1', iconName: 'phone-iphone', color: COLORS.white, label:'Pulsa',onclick: 'TransaksiTopUp',coloricon : COLORS.navy },
        { id: '2', iconName: 'tap-and-play', color: COLORS.white, label:'Paket Data',onclick: 'PaketData',coloricon : COLORS.navy },
        { id: '3', iconName: 'mobile-friendly', color: COLORS.white, label:'Masa Aktif',onclick: 'MasaAktif',coloricon : COLORS.navy },
        { id: '4', iconName: 'phone-android', color: COLORS.white, label:'Roaming',onclick: 'Roaming',coloricon : COLORS.navy },
        { id: '5', iconName: 'install-mobile', color: COLORS.white, label:'Pascabayar',onclick: 'Pascabayar',coloricon : COLORS.navy },
        { id: '6', iconName: 'phone-iphone', color: COLORS.white, label:'Transfer Pulsa',onclick: 'TransferPulsa',coloricon : COLORS.navy },
    ];
    
        const renderItem = ({ item }) => (
            <ButtonCircle 
                iconName={item.iconName} 
                color={item.color} 
                onPress={() => navigation.navigate(item.onclick)} 
                label={item.label} 
                coloricon={item.coloricon}
            />
        );



    return (
        <View style={styles.content} >
            
        <View style={{marginLeft:35, marginTop:43, marginBottom:10}}>
            <Text style={{fontSize:15, color:COLORS.dark, fontWeight:'bold'}}>Prabayar Dan Pascabayar</Text>
        </View>
            <View style={{alignItems:'center'}}>

            <FlatList
                data={buttonData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={4}
                columnWrapperStyle={styles.row} // Add style to space items
            />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,  // Menipiskan border
        borderRadius: 8,
        shadowColor: COLORS.lightBlue,
        shadowOffset: {
            width: 0,
            height: 1,  // Mengurangi tinggi bayangan
        },
        shadowOpacity: 0.15,  // Mengurangi intensitas bayangan
        shadowRadius: 1.5,    // Menyempitkan radius bayangan
        elevation: 1, 
        marginLeft:10,
        marginRight:10
    },
    row: {
        // justifyContent: 'space-between', // Distribute buttons evenly
    },
});

export default ButtonTopUp;
