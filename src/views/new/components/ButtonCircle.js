import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../const/color';

const ButtonCircle = ({ iconName, color, onPress, label, coloricon = COLORS.white }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.iconContainer(color)}>
                    <Icon name={iconName} size={35} color={coloricon} />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.label} numberOfLines={2}>
                        {label}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: (color) => ({
        marginLeft: 10,
        marginRight: 10,
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    labelContainer: {
        maxWidth: 65, // Set max width for wrapping
        alignItems: 'center', // Center align text
    },
    label: {
        fontSize: 12,
        color: COLORS.dark,
        textAlign: 'center',
    },
});

export default ButtonCircle;
