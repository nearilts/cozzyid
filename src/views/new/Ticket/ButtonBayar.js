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
import { MenuDataBayar } from './MenuTicket';

const ButtonBayar = () => {
    const navigation = useNavigation();


    
        const renderItem = ({ item }) => (
            <ButtonCircle 
                iconName={item.iconName} 
                color={COLORS.white} 
                onPress={() => navigation.navigate(item.onclick)} 
                label={item.label} 
                coloricon={COLORS.navy}
            />
        );



    return (
        <View style={styles.content} >
            
        <View style={{marginLeft:35, marginTop:42, marginBottom:10}}>
            <Text style={{fontSize:15, color:COLORS.dark, fontWeight:'bold'}}>Beli Ticket</Text>
        </View>
            <View style={{alignItems:'center'}}>

            <FlatList
                data={MenuDataBayar}
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
        marginTop:10,
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
        marginRight:10,
    },
    row: {
        // justifyContent: 'space-between', // Distribute buttons evenly
    },
});

export default ButtonBayar;
