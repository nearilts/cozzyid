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
import ButtonPrice from './ButtonPrice';

const PaketRow = ({ SelectionChange,selectedOperator,buttonPrice }) => {
    const [selectedPriceId, setSelectedPriceId] = useState(null);

    console.log('selectedOperator',selectedOperator)

    

    const handlePressPrice = (items) => {
        const selectedPrice = buttonPrice.find(item => item.id === items.id)?.price;
        setSelectedPriceId(items);
        
        if (selectedPrice) {
            SelectionChange( items);
        }
    };
    const renderButtonPrice = ({ item }) => (
        <ButtonPrice 
            color={item.color} 
            onPress={() => handlePressPrice(item)} 
            label={item.label} 
            price={item.price}
            isSelected={selectedPriceId?.id === item.id}
        />
    );

    return (
        <View style={styles.listContainer}>
        <Text style={styles.sectionHeader}>Pilih Paket</Text>
        <FlatList
            data={buttonPrice}
            renderItem={renderButtonPrice}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}

        />
    </View>
    );
};

const styles = StyleSheet.create({
   
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

export default PaketRow;
