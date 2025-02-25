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
import { listMenu } from './MenuBayar';
import ButtonIconGame from './ButtonIconGame';

const ButtonGame = () => {
    const navigation = useNavigation();


    
        const renderItem = ({ item }) => (
            <ButtonIconGame 
                iconName={item.iconName} 
                color={COLORS.white} 
                onPress={() => navigation.navigate("DetailGame",item)} 
                label={item.label} 
                coloricon={COLORS.navy}
            />
        );



    return (
        <View  style={{flex: 1, backgroundColor: COLORS.white, alignItems:'center'}}>
            
        <View style={{marginLeft:20, marginTop:20, marginBottom:10}}>
            <Text style={{fontSize:15, color:COLORS.dark, fontWeight:'bold'}}>Top Up Game</Text>
        </View>
            <View style={{alignItems:'center',marginBottom:10}}>

            <FlatList
                data={listMenu}
                renderItem={renderItem}
                keyExtractor={item => item.label}
                numColumns={2}
                columnWrapperStyle={styles.row} // Add style to space items
            />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        // justifyContent: 'space-between', // Distribute buttons evenly
    },
});

export default ButtonGame;
