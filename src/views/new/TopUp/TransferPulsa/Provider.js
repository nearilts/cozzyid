import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    ScrollView
} from 'react-native';
import COLORS from '../../../../const/color';
import Category from './Category';
import PaketRow from './PaketRow';

const Provider = ({ onSelectionChange,handleTextChange, setSelectedOperator,selectedOperator }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isShowed, setisShowed] = useState(false);
    const [CreditPoint, setCreditPoint] = useState('0');

    const [buttonPrice, setbuttonPrice] = useState([]);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>No Hp / Id</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Masukkan No/Id' 
                    placeholderTextColor={COLORS.dark} 
                    value={phoneNumber}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        handleTextChange('phone',text);
                    }}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Credit' 
                    placeholderTextColor={COLORS.dark} 
                    value={CreditPoint}
                    onChangeText={(text) => {
                        setCreditPoint(text);
                        handleTextChange('credit',text);
                    }}
                />
            </View>

            {
                !isShowed && (
                    <Category setisShowed={setisShowed} setSelectedOperator={setSelectedOperator} setbuttonPrice={setbuttonPrice} />
                )
            }
            

            {
            isShowed && (
                <PaketRow SelectionChange={onSelectionChange} selectedOperator={selectedOperator} buttonPrice={buttonPrice} />
                )
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    headerContainer: {
        marginLeft: 35,
        marginTop: 20,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 15,
        color: COLORS.dark,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '90%',
        height: 60,
        backgroundColor: COLORS.lightgrey,
        borderRadius: 10,
        paddingHorizontal: 15,
        color: COLORS.dark
    },
    listContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30
    },
    sectionHeader: {
        fontSize: 15,
        color: COLORS.dark,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
});

export default Provider;
