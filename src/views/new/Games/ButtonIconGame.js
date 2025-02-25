import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import COLORS from '../../../const/color';

const ButtonIconGame = ({ iconName, color, onPress, label, coloricon = COLORS.white }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={[
                styles.buttonContainer,
                {
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.lightgrey,
                    maxWidth: 155
                }
            ]}>
                <View style={{ width: 120, height: 120, backgroundColor: COLORS.white }}>
                    <Image source={iconName} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                </View>
                <Text style={{ color: COLORS.dark, fontWeight: 'bold', marginTop: 10 }}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        marginRight: 10,
        width: 155,
        height: 180,
        marginTop: 10,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8, // Optional: Adjust for rounded corners
        // Shadow properties for iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Elevation for Android
        elevation: 5,
    },
});

export default ButtonIconGame;
