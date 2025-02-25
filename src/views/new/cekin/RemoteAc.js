import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import COLORS from '../../../const/color'; // Pastikan file COLORS tersedia
import { BASE_URL } from '../../../config'; // Ganti dengan URL base API Anda
import AsyncStorage from '@react-native-async-storage/async-storage';

const RemoteAc = ({navigation, route}) => {
    const [acStatus, setAcStatus] = useState({
        mode: "0",
        power: "0",
        temp: "0",
        wind: "0",
        remote_id : route.params.item.remote_id
    });
    const url = BASE_URL;

    const fetchAcStatus = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}getstatusac/${route.params.route.token}/status-ac`,{
                "remote_id" : route.params.item.remote_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                console.log(response.data.result)
                setAcStatus(response.data.result);
            }
        } catch (error) {
            console.error("Failed to fetch AC status:", error);
        }
    };

    const handleButtonPress = (key, value) => {
        console.log(`Setting ${key} to ${value}`);
        const updatedStatus = {
            ...acStatus,
            [key]: value,
            remote_id: route.params.item.remote_id,
        };
        setAcStatus(updatedStatus);
        remoteAc(updatedStatus);
        console.log("Updated status:", updatedStatus);

    };

    const remoteAc = async (updatedStatus) => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            let token = userInfo.access_token.split('|')[1];
            const response = await axios.post(`${url}remoteac/${route.params.route.token}/remote-ac`,updatedStatus, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                console.log(response.data.result)
                fetchAcStatus();
            }
        } catch (error) {
            console.error("Failed to fetch AC status:", error);
        }
    };
    useEffect(() => {
        fetchAcStatus();
    }, []);

    return (
        <View style={styles.container}>
            {/* Power Button */}
            <TouchableOpacity
                style={[
                    styles.button,
                    styles.powerButton,
                    { backgroundColor: acStatus.power === "1" ? COLORS.primary : COLORS.red },
                ]}
                onPress={() => handleButtonPress("power", acStatus.power === "1" ? "0" : "1")}
            >
                <Text style={styles.buttonText}>Power</Text>
            </TouchableOpacity>

            {/* Temperature Control */}
            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.button, styles.tempButton]}
                    onPress={() => handleButtonPress("temp", parseInt(acStatus.temp) + 1)}
                >
                    <Text style={styles.buttonText}>Temp +</Text>
                </TouchableOpacity>
                <Text style={styles.statusText}>{acStatus.temp}°C</Text>
                <TouchableOpacity
                    style={[styles.button, styles.tempButton]}
                    onPress={() => handleButtonPress("temp", parseInt(acStatus.temp) - 1)}
                >
                    <Text style={styles.buttonText}>Temp -</Text>
                </TouchableOpacity>
            </View>

            {/* Mode Buttons */}
            <View style={styles.modeContainer}>
            {["Cooling", "Heating", "Automatic", "Wind Supply", "Dehumidification"].map((mode, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.button,
                        styles.modeButton,
                        { backgroundColor: acStatus.mode === String(index) ? COLORS.primary : COLORS.secondgrey },
                    ]}
                    onPress={() => handleButtonPress("mode", String(index))}
                >
                    <Text style={styles.buttonText}>{mode}</Text>
                </TouchableOpacity>
            ))}
        </View>

            {/* Wind Speed Control */}
            <View style={styles.row}>
                {["Auto", "Low", "Medium", "High"].map((speed, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            styles.windButton,
                            { backgroundColor: acStatus.wind === String(index) ? COLORS.primary : COLORS.secondgrey },
                        ]}
                        onPress={() => handleButtonPress("wind", String(index))}
                    >
                        <Text style={styles.buttonText}>{speed}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        margin: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    powerButton: {
        width: 100,
        height: 50,
    },
    tempButton: {
        backgroundColor: COLORS.secondary,
        width: 80,
        height: 50,
    },
    modeButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    windButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    modeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    modeButton: {
        width: '40%', // Set ukuran agar tombol lebih konsisten
        margin: 5,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
});

export default RemoteAc;
