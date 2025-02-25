import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import DatePickerInputs from '../../../../component/DatePickerInputs';
import COLORS from '../../../../const/color';
import { BASE_URL } from '../../../../config';
import { DataPesawat, Maskapai } from './DataBandara';

const Pesawat = ({ navigation }) => {
    const url = BASE_URL;

    const getLocalDateInIndonesianTimeZone = (date) => {
        const formatter = new Intl.DateTimeFormat('id-ID', {
            timeZone: 'Asia/Jakarta', // Zona waktu untuk WIB
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const parts = formatter.formatToParts(date);
        const dateObject = {};
        parts.forEach(({ type, value }) => {
            if (type !== 'literal') dateObject[type] = value;
        });

        // Buat tanggal baru berdasarkan string yang diformat
        let localDate = new Date(`${dateObject.year}-${dateObject.month}-${dateObject.day}T${dateObject.hour}:${dateObject.minute}:${dateObject.second}`);

        // Tambahkan offset waktu dalam jam
        localDate.setHours(localDate.getHours() + 7);

        return localDate;
    };

    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [maskapai, setmaskapai] = useState([]);
    const [location, setLocation] = useState([]);
    const [formData, setFormData] = useState({
        tanggal: startDate.toISOString().split('T')[0],
        maskapai: '',
        ke: '',
        locations: '',
        dewasa: 0,
        anak: 0,
        balita: 0,
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleMaskapai, setModalVisibleMaskapai] = useState(false);
    const [isModalVisibles, setModalVisibles] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLocations, setFilteredLocations] = useState(location);
    const [filteredMaskapais, setfilteredMaskapais] = useState(location);
    const [SearchQueryMaskapai, setSearchQueryMaskapai] = useState('');

    useEffect(() => {
        // Set lokasi dari DataPesawat
        setmaskapai(Maskapai);
        setLocation(DataPesawat.data.data);
        setfilteredMaskapais(Maskapai);
        setFilteredLocations(DataPesawat.data.data);
    }, []);

    useEffect(() => {
        setFilteredLocations(
            location.filter(loc => 
                loc.bandara.toLowerCase().includes(searchQuery.toLowerCase()) ||
                loc.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, location]);

    useEffect(() => {
        setfilteredMaskapais(
            maskapai.filter(loc => loc.airlineName.toLowerCase().includes(SearchQueryMaskapai.toLowerCase()))
        );
    }, [SearchQueryMaskapai, maskapai]);

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleStartDateChange = (date) => {
        const localDate = getLocalDateInIndonesianTimeZone(date);
        setStartDate(localDate);
        setFormData({ ...formData, tanggal: localDate.toISOString().split('T')[0] });
    };

    const handleSave = () => {
        console.log('formData', formData);
        if(!formData.maskapai || !formData.locations || !formData.ke || formData.dewasa === 0){
            alert("Tidak boleh kosong");
            return;
        }
        navigation.navigate("ListPesawat", formData);
    };

    const handleNumericInputChange = (key, value) => {
        const numericValue = value.replace(/[^0-9]/g, ''); // Hanya biarkan angka
        setFormData({ ...formData, [key]: numericValue });
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Spinner visible={isLoading} />
            <ScrollView>
                <View style={{ paddingTop: 40 }}>
                    <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                        <Icon name="arrow-back-ios" size={28} color={COLORS.white} />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.title}>Pesan Tiket Pesawat</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 25 }}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Maskapai</Text>
                        <TouchableOpacity onPress={() => setModalVisibleMaskapai(true)} style={styles.picker}>
                            <Text style={{ marginTop: 15, marginLeft: 10, color: COLORS.dark }}>{formData.maskapai?.airlineName || 'Pilih Maskapai'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Dari</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.picker}>
                            <Text style={{ marginTop: 15, marginLeft: 10, color: COLORS.dark }}>{formData.locations?.bandara || 'Pilih Lokasi Awal'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Ke</Text>
                        <TouchableOpacity onPress={() => setModalVisibles(true)} style={styles.picker}>
                            <Text style={{ marginTop: 15, marginLeft: 10, color: COLORS.dark }}>{formData.ke?.bandara || 'Pilih Lokasi Tujuan'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Tanggal Berangkat</Text>
                        <DatePickerInputs type="start" onChange={handleStartDateChange} defaultDate={startDate} />

                        <Text style={styles.label}>Dewasa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            keyboardType="numeric"
                            value={formData.dewasa.toString()}
                            onChangeText={(value) => handleNumericInputChange('dewasa', value)}
                        />

                        <Text style={styles.label}>Anak</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            keyboardType="numeric"
                            value={formData.anak.toString()}
                            onChangeText={(value) => handleNumericInputChange('anak', value)}
                        />

                        <Text style={styles.label}>Balita</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            keyboardType="numeric"
                            value={formData.balita.toString()}
                            onChangeText={(value) => handleNumericInputChange('balita', value)}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                <Text style={styles.buttonText}>Cari</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Modal for Location Selection */}

                <Modal
                    transparent={true}
                    visible={isModalVisibleMaskapai}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                onChangeText={setSearchQueryMaskapai}
                            />
                            <ScrollView style={styles.scrollView}>
                                {filteredMaskapais.map((loc) => (
                                    <TouchableOpacity
                                        key={loc.airline}
                                        onPress={() => {
                                            handleInputChange('maskapai', loc);
                                            setModalVisibleMaskapai(false);
                                        }}
                                        style={styles.locationItem}
                                    >
                                        <Text style={{ color: COLORS.dark }}>{loc.airlineName}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={isModalVisible}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                onChangeText={setSearchQuery}
                            />
                            <ScrollView style={styles.scrollView}>
                                {filteredLocations.map((loc) => (
                                    <TouchableOpacity
                                        key={loc.code}
                                        onPress={() => {
                                            handleInputChange('locations', loc);
                                            setModalVisible(false);
                                        }}
                                        style={styles.locationItem}
                                    >
                                        <Text style={{ color: COLORS.dark }}>{loc.bandara} - {loc.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={isModalVisibles}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                onChangeText={setSearchQuery}
                            />
                            <ScrollView style={styles.scrollView}>
                                {filteredLocations.map((loc) => (
                                    <TouchableOpacity
                                        key={loc.code}
                                        onPress={() => {
                                            handleInputChange('ke', loc);
                                            setModalVisibles(false);
                                        }}
                                        style={styles.locationItem}
                                    >
                                        <Text style={{ color: COLORS.dark }}>{loc.bandara} - {loc.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    header: {
        justifyContent: 'center', alignItems: 'center', top: 20 
    },
    title: {
        color: COLORS.dark,
        fontSize: 22,
        fontWeight: 'bold',
    },
    formContainer: {
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 25,
        backgroundColor: COLORS.white,
        borderRadius: 30,
    },
    label: {
        fontSize: 15,
        color: COLORS.dark,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },
    input: {
        width: 299,
        height: 60,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        color: COLORS.dark,
    },
    buttonContainer: {
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 40,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: 299,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: 250,
        color: COLORS.dark,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 20,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        color:COLORS.dark
    },
    locationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default Pesawat;
