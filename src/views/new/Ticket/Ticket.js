import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    ScrollView
} from 'react-native';
import COLORS from '../../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonBayar from './ButtonBayar';



const Ticket = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white,}}>
        <StatusBar translucent backgroundColor={COLORS.navy} />
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
                            <Text style={{ marginLeft: 105, marginTop: 5, fontSize: 18, color: COLORS.white }}>Beli Tiket</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 22, color: COLORS.yellow, fontWeight: 'bold', }}>
                        Beli Tiket 
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
            

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ButtonBayar />  
                </ScrollView>
            </View>
       
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
 
});

export default Ticket;
