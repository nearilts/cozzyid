import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../const/color';

const ButtonPrice = ({ price,  onPress, label, isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={[
                styles.buttonContainer,
                {
                    backgroundColor: isSelected ? COLORS.primary : COLORS.lightBlue,
                    borderColor: isSelected ? COLORS.navy : COLORS.primary,
                }
            ]}>
                <Text style={{ color:isSelected ?COLORS.white: COLORS.dark, fontWeight:'bold', fontSize:22 }}>{label}</Text>
                <Text style={{ color: isSelected ? COLORS.white:  COLORS.darkBlue,fontWeight:'bold' }}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 5,
        marginRight: 5,
        width: 300, // Adjust size to fit icon and styling
        height: 100, // Adjust size to fit icon and styling
        marginTop: 10,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8, // Optional: Adjust for rounded corners
    },
});

export default ButtonPrice;
