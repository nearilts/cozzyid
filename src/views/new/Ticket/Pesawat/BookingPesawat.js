import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../../../../const/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../../config';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import ModalSelector from "react-native-modal-selector";

const BookingPesawat = ({ navigation, route }) => {
  const { dewasa, anak, balita } = route.params.form; // Mengambil jumlah dewasa, anak, dan balita dari parameter
  const [isLoading, setIsLoading] = useState(false);

  const initialAdultData = Array.from({ length: Number(dewasa) }, () => ({
    title: 'MR',
    firstName: '',
    lastName: '',
    birthDate: '',
    ktpNumber: '',
    phone: '',
    email: '',
  }));

  const initialChildData = Array.from({ length: Number(anak) }, () => ({
    title: 'MSTR',
    firstName: '',
    lastName: '',
    birthDate: '',
    ktpNumber: '',
  }));

  const initialInfantData = Array.from({ length: Number(balita) }, () => ({
    title: 'MSTR',
    firstName: '',
    lastName: '',
    birthDate: '',
    ktpNumber: '',
  }));

  const [passengerData, setPassengerData] = useState(initialAdultData);
  const [childData, setChildData] = useState(initialChildData);
  const [infantData, setInfantData] = useState(initialInfantData);

  const formatDate = (text) => {
    const cleaned = text.replace(/\D/g, ''); // Hapus semua karakter non-digit
    const match = cleaned.match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
    if (!match) return '';
    const day = match[1];
    const month = match[2];
    const year = match[3];
    return [ day,month, year].filter(Boolean).join('/'); // Gabungkan dengan '/'
  };

  const handleChange = (index, name, value, type) => {
    console.log(type); 
    if (name === 'birthDate') {
      value = formatDate(value); // Format jika input adalah tanggal
    }
    const updatedData = type === 'adult' ? [...passengerData] : type === 'child' ? [...childData] : [...infantData];
    updatedData[index] = { ...updatedData[index], [name]: value };

    if (type === 'adult') {
      setPassengerData(updatedData);
    } else if (type === 'child') {
      setChildData(updatedData);
    } else {
      setInfantData(updatedData);
    }
  };
  const handleSubmit = () => {
    const formattedAdults = passengerData.map(passenger => 
        `ADT;${passenger.title};${passenger.firstName};${passenger.lastName};${passenger.birthDate};${passenger.ktpNumber};::${passenger.phone};::${passenger.phone};;;;${passenger.email};1;ID;ID;;;ID;`
    );

    const formattedChildren = childData.map(child => 
        `CHD;${child.title};${child.firstName};${child.lastName};${child.birthDate};${child.ktpNumber};ID;ID;;;ID;`
    );

    const formattedInfants = infantData.map(infant => 
        `INF;${infant.title};${infant.firstName};${infant.lastName};${infant.birthDate};${infant.ktpNumber};ID;ID;;;ID;`
    );
    const flightData = route.params.item.classes;

    // Flatten the flightData if it's a 2D array and extract seats
    const formattedFlights = flightData && flightData.length > 0 
        ? flightData.flat().map(flight => flight.seat) // Menggunakan flat() untuk mengubah menjadi 1D array
        : [];

    const forms = {
        "airline": route.params.form.maskapai.airline,
        "departure": route.params.form.locations.code,
        "arrival": route.params.form.ke.code,
        "departureDate": route.params.form.tanggal,
        "returnDate ": "",
        "adult": dewasa,
        "child": anak,
        "infant": balita,
        "flights": formattedFlights,
        "adults": formattedAdults,
        "children": formattedChildren,
        "infants": formattedInfants,
    };
    TransaksiRajabiller(forms)
    // Implement your API submission logic here
  };
    const TransaksiRajabiller = async (forms) => {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];
      console.log('forms',forms);
      setIsLoading(true)
      
      const response = await axios.post(`${BASE_URL}api_book_flight`, forms, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      console.log('response', response.data.data);
      setIsLoading(false)

      if (response.data.messages === 'Success') {
          navigation.navigate('WebViews',response.data.data.link_payment);
          
      } else {
        if(response.data.data && response.data.data.rd){
          alert(response.data.data?.rd)
        }else{
          alert(response.data.messages)
        }
          
      }
    

    };

    const titleOptions = [
      { key: "MR", label: "MR" },
      { key: "MRS", label: "MRS" },
      { key: "MSTR", label: "MSTR" },
      { key: "MISS", label: "MISS" },
      { key: "MS", label: "MS" },
    ];

    const titleOptionChilds = [
      { key: "MSTR", label: "MSTR" },
      { key: "MISS", label: "MISS" },
    ];

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Pemesanan Tiket Pesawat</Text>

          {/* Form untuk Dewasa */}
          {passengerData.map((passenger, index) => (
            <View key={index} style={styles.passengerContainer}>
              <Text style={styles.subTitle}>Dewasa {index + 1}</Text>
              <Text style={styles.label}>Pilih Gelar:</Text>
              <ModalSelector
                 data={titleOptions}

                initValue="Pilih Title"
                onChange={(option) => handleChange(index, "title", option.key, "adult")}
                style={styles.picker}
              >
                 <Text style={{color:COLORS.dark}}>
                  {(() => {
                    const selectedTitle = passenger.title || "";
                    const selectedLabel = titleOptions.find((d) => d.key === selectedTitle)?.label;
                    return selectedLabel || "Pilih Titles";
                  })()}
                </Text>
              </ModalSelector>

              <Text style={styles.label}>Nama Depan:</Text>
              <TextInput
                style={styles.input}
                value={passenger.firstName}
                onChangeText={(value) => handleChange(index, 'firstName', value, 'adult')}
              />

              <Text style={styles.label}>Nama Belakang:</Text>
              <TextInput
                style={styles.input}
                value={passenger.lastName}
                onChangeText={(value) => handleChange(index, 'lastName', value, 'adult')}
              />

              <Text style={styles.label}>Tanggal Lahir:</Text>
              <TextInput
                style={styles.input}
                value={passenger.birthDate}
                onChangeText={(value) => handleChange(index, 'birthDate', value, 'adult')}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={COLORS.dark}
              />

              <Text style={styles.label}>No KTP:</Text>
              <TextInput
                style={styles.input}
                value={passenger.ktpNumber}
                onChangeText={(value) => handleChange(index, 'ktpNumber', value, 'adult')}
              />

              <Text style={styles.label}>No Telepon:</Text>
              <TextInput
                style={styles.input}
                value={passenger.phone}
                onChangeText={(value) => handleChange(index, 'phone', value, 'adult')}
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={passenger.email}
                onChangeText={(value) => handleChange(index, 'email', value, 'adult')}
                keyboardType="email-address"
              />
            </View>
          ))}

          {/* Form untuk Anak */}
          {childData.map((child, index) => (
            <View key={index} style={styles.passengerContainer}>
              <Text style={styles.subTitle}>Anak {index + 1}</Text>
              <Text style={styles.label}>Pilih Gelar:</Text>
              

              <ModalSelector
                 data={titleOptionChilds}

                initValue="Pilih Title"
                onChange={(option) => handleChange(index, "title", option.key, "child")}
                style={styles.picker}
              >
                 <Text style={{color:COLORS.dark}}>
                  {(() => {
                    const selectedTitle = child.title || "";
                    const selectedLabel = titleOptionChilds.find((d) => d.key === selectedTitle)?.label;
                    return selectedLabel || "Pilih Titles";
                  })()}
                </Text>
              </ModalSelector>

              <Text style={styles.label}>Nama Depan:</Text>
              <TextInput
                style={styles.input}
                value={child.firstName}
                onChangeText={(value) => handleChange(index, 'firstName', value, 'child')}
              />

              <Text style={styles.label}>Nama Belakang:</Text>
              <TextInput
                style={styles.input}
                value={child.lastName}
                onChangeText={(value) => handleChange(index, 'lastName', value, 'child')}
              />

              <Text style={styles.label}>Tanggal Lahir:</Text>
              <TextInput
                style={styles.input}
                value={child.birthDate}
                onChangeText={(value) => handleChange(index, 'birthDate', value, 'child')}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={COLORS.dark}
              />

              <Text style={styles.label}>No KTP:</Text>
              <TextInput
                style={styles.input}
                value={child.ktpNumber}
                onChangeText={(value) => handleChange(index, 'ktpNumber', value, 'child')}
              />
            </View>
          ))}

          {/* Form untuk Balita */}
          {infantData.map((infant, index) => (
            <View key={index} style={styles.passengerContainer}>
              <Text style={styles.subTitle}>Balita {index + 1}</Text>
              <Text style={styles.label}>Pilih Gelar:</Text>
              <ModalSelector
                 data={titleOptionChilds}

                initValue="Pilih Title"
                onChange={(option) => handleChange(index, "title", option.key, "infant")}
                style={styles.picker}
              >
                 <Text style={{color:COLORS.dark}}>
                  {(() => {
                    const selectedTitle = infant.title || "";
                    const selectedLabel = titleOptionChilds.find((d) => d.key === selectedTitle)?.label;
                    return selectedLabel || "Pilih Titles";
                  })()}
                </Text>
              </ModalSelector>

              <Text style={styles.label}>Nama Depan:</Text>
              <TextInput
                style={styles.input}
                value={infant.firstName}
                onChangeText={(value) => handleChange(index, 'firstName', value, 'infant')}
              />

              <Text style={styles.label}>Nama Belakang:</Text>
              <TextInput
                style={styles.input}
                value={infant.lastName}
                onChangeText={(value) => handleChange(index, 'lastName', value, 'infant')}
              />

              <Text style={styles.label}>Tanggal Lahir:</Text>
              <TextInput
                style={styles.input}
                value={infant.birthDate}
                onChangeText={(value) => handleChange(index, 'birthDate', value, 'infant')}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={COLORS.dark}
              />

              <Text style={styles.label}>No KTP:</Text>
              <TextInput
                style={styles.input}
                value={infant.ktpNumber}
                onChangeText={(value) => handleChange(index, 'ktpNumber', value, 'infant')}
              />
            </View>
          ))}

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: COLORS.primary }]} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>        
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    top: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.dark,
  },
  label: {
    color: COLORS.dark,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: COLORS.dark,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    color:COLORS.dark
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    color:COLORS.dark,
    borderColor:COLORS.dark,
    borderWidth:1,
    borderRadius:10,
    padding:15
  },
  passengerContainer: {
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingPesawat;
