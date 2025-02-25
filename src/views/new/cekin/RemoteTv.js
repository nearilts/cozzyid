import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../../const/color'; // Pastikan file COLORS tersedia
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../config';
import axios from 'axios';

const RemoteTv = ({navigation, route}) => {
    const url = BASE_URL;

    console.log(route.params)
    const handleButtonPress = (button) => {
        const updatedStatus = {
            "remote_id": route.params.item.remote_id,
            "category_id": route.params.item.category_id,
            "key": button,
        };        
        console.log("Updated status:", updatedStatus);

        remoteTv(updatedStatus)
    };
    const remoteTv = async (updatedStatus) => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}remotetv/${route.params.route.token}/remote-tv`,updatedStatus, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                console.log(response.data.result)
            }
        } catch (error) {
            console.error("Failed to fetch AC status:", error);
        }
    };
    return (
        <View style={styles.container}>
            {/* Power Button */}
            <TouchableOpacity
                style={[styles.button, styles.powerButton]}
                onPress={() => handleButtonPress('Power')}
            >
                <Text style={styles.buttonText}>Power</Text>
            </TouchableOpacity>
           

            {/* Navigation Buttons */}
            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.navButton]}
                    onPress={() => handleButtonPress('Up')}
                >
                    <Text style={styles.buttonText}>▲</Text>
                </TouchableOpacity>
                <View style={styles.navMiddleRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.navButton]}
                        onPress={() => handleButtonPress('Left')}
                    >
                        <Text style={styles.buttonText}>◄</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.okButton]}
                        onPress={() => handleButtonPress('OK')}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.navButton]}
                        onPress={() => handleButtonPress('Right')}
                    >
                        <Text style={styles.buttonText}>►</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.button, styles.navButton]}
                    onPress={() => handleButtonPress('Down')}
                >
                    <Text style={styles.buttonText}>▼</Text>
                </TouchableOpacity>
            </View>

            {/* Volume Buttons */}
            <View style={styles.volumeContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.volumeButton]}
                    onPress={() => handleButtonPress('Volume+')}
                >
                    <Text style={styles.buttonText}>Vol +</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.volumeButton]}
                    onPress={() => handleButtonPress('Volume-')}
                >
                    <Text style={styles.buttonText}>Vol -</Text>
                </TouchableOpacity>
            </View>

            {/* Number Buttons */}
            <View style={styles.numberContainer}>
                {Array.from({ length: 10 }, (_, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.button, styles.numberButton]}
                        onPress={() => handleButtonPress(i)}
                    >
                        <Text style={styles.buttonText}>{i}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Back Button */}
            <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => handleButtonPress('Back')}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    powerButton: {
        backgroundColor: COLORS.red,
        width: 100,
        height: 50,
    },
    navigationContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    navButton: {
        backgroundColor: COLORS.primary,
        width: 50,
        height: 50,
    },
    navMiddleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    okButton: {
        backgroundColor: COLORS.secondary,
        width: 50,
        height: 50,
    },
    volumeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginVertical: 20,
    },
    volumeButton: {
        backgroundColor: COLORS.primary,
        width: 80,
        height: 50,
    },
    numberContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    numberButton: {
        backgroundColor: COLORS.primary,
        width: 50,
        height: 50,
        margin: 5,
    },
    backButton: {
        backgroundColor: COLORS.primary,
        width: 100,
        height: 50,
        marginTop: 20,
    },
});

export default RemoteTv;
