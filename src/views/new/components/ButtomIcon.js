import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import COLORS from '../../../const/color';
import ButtonCircle from './ButtonCircle';
import { useNavigation } from '@react-navigation/native';


const ButtomIcon = () => {
    const navigation = useNavigation();


    const buttonData = [
        { id: '1', iconName: 'calendar-month', color: COLORS.navy, label:'Hotel',onclick: 'Services' },
        { id: '2', iconName: 'shopping-cart', color: COLORS.darkGreen, label:'Product',onclick: 'ListProduct' },
        { id: '3', iconName: 'account-balance-wallet', color: COLORS.red, label:'Top Up',onclick: 'TopUp' },
        { id: '4', iconName: 'paid', color: COLORS.orange, label:'Bayar',onclick: 'BayarPpob' },
        { id: '5', iconName: 'sports-esports', color: COLORS.pink, label:'Games',onclick: 'GamePpob' },
        { id: '6', iconName: 'confirmation-number', color: COLORS.darkBlue, label:'Voucher',onclick: 'VoucherPpob' },
        { id: '7', iconName: 'book-online', color: COLORS.primary2, label:'Tiket',onclick: 'Ticket' },
        { id: '8', iconName: 'apps', color: COLORS.gold, label:'Semua',onclick: 'SemuaPpob' },
    ];
    
        const renderItem = ({ item }) => (
            <ButtonCircle 
                iconName={item.iconName} 
                color={item.color} 
                onPress={() => navigation.navigate(item.onclick)} 
                label={item.label} 
            />
        );



    return (
        <View style={{alignItems:'center'}} >
            <FlatList
            data={buttonData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={4}
            columnWrapperStyle={styles.row} // Add style to space items
        />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between', // Distribute buttons evenly
    },
});

export default ButtomIcon;
