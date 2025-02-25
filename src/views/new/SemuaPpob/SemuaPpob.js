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
import ButtonTopUp from '../TopUp/ButtonTopUp';
import ButtonBayar from '../BayarPpob/ButtonBayar';
import ButtonVoucher from '../Voucher/ButtonVoucher';


const SemuaPpob = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, alignItems:'center' }}>
        <StatusBar translucent backgroundColor={COLORS.transparent} />
        <View style={{marginLeft: 10, flexDirection: "row", width: '100%', height: 50, backgroundColor: COLORS.white, marginTop: 40 }}>
            <Icon name="arrow-back" size={35} color={COLORS.primary} onPress={navigation.goBack} />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginLeft: 90, marginTop: 5, fontSize: 18, color: COLORS.dark }}>Semua Transaksi</Text>
            </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

        <ButtonTopUp />

        <ButtonBayar />  

        <ButtonVoucher />

        </ScrollView>
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
 
});

export default SemuaPpob;
