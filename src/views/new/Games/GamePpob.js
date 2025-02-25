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
import ButtonGame from './ButtonGame';



const GamePpob = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                            <Text style={{ marginLeft: 60, marginTop: 5, fontSize: 18, color: COLORS.white }}>Beli Voucher Games</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 22, color: COLORS.yellow, fontWeight: 'bold', }}>
                        Beli Voucher Games
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
            

            <View style={{ alignItems: 'center', marginTop: 20, marginBottom:30 }}>
                    <ButtonGame />  

            </View>
       
            </ScrollView>
       
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
 
});

export default GamePpob;
