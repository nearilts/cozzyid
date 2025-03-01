import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../const/color';
import ButtonCircle from '../views/new/components/ButtonCircle';


const ButtomIconAktivitas = () => {
    const navigation = useNavigation();


    const buttonData = [
        { id: '1', iconName: 'calendar-month', color: COLORS.navy, label:'Checkin list',onclick: 'CekInOnlines' },
        { id: '2', iconName: 'room-preferences', color: COLORS.darkGreen, label:'Door Lock',onclick: 'ListDoorLock' },
        { id: '3', iconName: 'electrical-services', color: COLORS.orange, label:'Electricity',onclick: 'ListDoorLockLight' },
        { id: '4', iconName: 'settings-remote', color: COLORS.red, label:'Remote',onclick: 'ListDoorLockRemote' },
        { id: '5', iconName: 'wifi', color: COLORS.pink, label:'Internet',onclick: 'CekinOnlineWifi' },
        { id: '6', iconName: 'chat', color: COLORS.darkBlue, label:'Chat',onclick: 'InboxScreen' },
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
            numColumns={3}
            columnWrapperStyle={styles.row} // Add style to space items
        />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        margin:20,
        justifyContent: 'space-between', // Distribute buttons evenly
    },
});

export default ButtomIconAktivitas;
