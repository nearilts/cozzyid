import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../const/color';

const ButtonProvider = ({  onPress, label,  isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
           <View style={[
                styles.buttonContainer,
                {
                    backgroundColor: isSelected ? COLORS.primary : COLORS.lightBlue,
                    borderColor: isSelected ? COLORS.navy : COLORS.primary,
                }
            ]}>
                <Text style={{ color: isSelected ? COLORS.white:  COLORS.darkBlue, fontWeight:'bold' }}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 15,
        marginRight: 15,
        width: 300, // Adjust size to fit icon and styling
        height: 70, // Adjust size to fit icon and styling
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

export default ButtonProvider;
