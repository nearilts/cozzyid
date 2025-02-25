import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import COLORS from '../../../const/color';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
   

const ButtonProfil = ({  }) => {
    const navigation = useNavigation();

    return (
        <View style={{   }}>
            <View >
            <TouchableOpacity  onPress={() => navigation.navigate("HistoryCredit")}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:22, color:COLORS.seconddark}}>History Point</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.grey} />
                </View>
                <View style={{height:2, width:'100%' , backgroundColor:COLORS.secondgrey, marginTop:20}}></View>
            </TouchableOpacity>
            </View>

            <View style={{marginTop:20}}>
             <TouchableOpacity  onPress={() => navigation.navigate("CodeReferral")}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:22, color:COLORS.seconddark}}>Referral</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.grey} />
                </View>
                <View style={{height:2, width:'100%' , backgroundColor:COLORS.secondgrey, marginTop:20}}></View>
            </TouchableOpacity>
            </View>
            <View style={{marginTop:20}}>
             <TouchableOpacity  onPress={() => navigation.navigate("ProfileScreen")}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:22, color:COLORS.seconddark}}>Sunting Profil</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.grey} />
                </View>
                <View style={{height:2, width:'100%' , backgroundColor:COLORS.secondgrey, marginTop:20}}></View>
            </TouchableOpacity>
            </View>
            
            <View style={{marginTop:20}}>
            <TouchableOpacity onPress={() => navigation.navigate("HelpCenter")}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:22, color:COLORS.seconddark}}>Pusat Bantuan</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.grey} />
                </View>
                <View style={{height:2, width:'100%' , backgroundColor:COLORS.secondgrey, marginTop:20}}></View>
            </TouchableOpacity>
            </View>

            <View style={{marginTop:20}}>
            <TouchableOpacity   onPress={() => navigation.navigate("SubMenu")}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:22, color:COLORS.seconddark}}>Informasi Lainnya</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.grey} />
                </View>
                <View style={{height:2, width:'100%' , backgroundColor:COLORS.secondgrey, marginTop:20}}></View>
            </TouchableOpacity>
            </View>

            <View style={{marginTop:20}}>
            <TouchableOpacity   onPress={() => navigation.navigate("Kupon")}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:22, color:COLORS.seconddark}}>Kupon</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.grey} />
                </View>
                <View style={{height:2, width:'100%' , backgroundColor:COLORS.secondgrey, marginTop:20}}></View>
            </TouchableOpacity>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
 
});

export default ButtonProfil;
