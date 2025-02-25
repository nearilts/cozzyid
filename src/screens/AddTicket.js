import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../config';
import COLORS from '../const/color';
import DatePickerInputs from '../component/DatePickerInputs';
import { addDays } from 'date-fns';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const AddTicket = ({ navigation }) => {
    const url = BASE_URL;

    const [isLoading, setIsLoading] = useState(false);
  
    
    const [location, setlocation] = useState([])
    const getLocations = async () =>{

        try {
            const response = await axios.get(`${url}ticket/category`);
            setlocation(response.data.data)
            
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        getLocations();
       
      }, []);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    cat_id: '',
   
  });

  const kirimdata = async () => {
    try {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];

      const formDatas = new FormData();
      formDatas.append('title', formData.title);
      formDatas.append('content', formData.content);
      formDatas.append('cat_id', formData.cat_id);

      console.log('formData', formDatas );
      
      const response = await axios.post(`${url}ticket/store`, formDatas, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);

      console.log('response', response.data);
      if (response.data.data) {
        alert('Data Success Save');
        navigation.navigate('HelpCenter')
      } else {
        alert('Gagal Simpan');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = () => {
    kirimdata()
   
  };
  const handleInputChange = async (key, value) => {
    setFormData({ ...formData, [key]: value });
    
    console.log('formData', formData );

  };
 
  return (
    <View style={{ flex: 1 , backgroundColor:COLORS.white}}>
      <Spinner visible={isLoading} />
      <ScrollView >
        <View style={{ paddingTop: 40 }}>
          <View>
            <View>
              <TouchableOpacity onPress={navigation.goBack} style={{ position: 'absolute', top: 10, left: 20, backgroundColor: COLORS.primary, borderRadius: 50, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                <View style={{ left: 5 }}>
                  <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', top: 20 }}>
              <Text style={{ color: COLORS.dark, fontSize: 22, fontWeight: 'bold' }}>Buat Tiket</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 25 }}>
          <View style={{ borderRadius: 30, backgroundColor: COLORS.secondgrey }}>
            <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                
                <View style={{}}>
                  <Text style={{ paddingLeft: 10, paddingTop: 20, fontSize: 15, color: COLORS.dark, fontWeight: 'bold',marginBottom:20 }}> Categoty</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={formData.cat_id}
                        onValueChange={(itemValue) => handleInputChange('cat_id', itemValue)}
                        style={styles.picker}
                        >
                            {/* buat picker item dari api locations */}
                            <Picker.Item label="Choose category" value="" />
                                {location.map((loc) => (
                                    <Picker.Item key={loc.id} label={loc.name} value={loc.id} />
                                ))}
                        </Picker>
                    </View>
                    </View>
            
            </View>

              
              

              <Text style={{ paddingLeft: 45, paddingTop: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> Judul</Text>
              <View style={styles.slide}>
                <TextInput
                  style={styles.input}
                  placeholder="Isi Judul"
                  placeholderTextColor={COLORS.dark}
                  onChangeText={(value) => handleInputChange('title', value)}
                />
              </View>

              
              <Text style={{ paddingLeft: 45, paddingTop: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> Content</Text>
              <View style={styles.slide}>
                <TextInput
                  style={styles.input}
                  placeholder="Isi Content"
                  placeholderTextColor={COLORS.dark}
                  onChangeText={(value) => handleInputChange('content', value)}
                />
              </View>


              <View style={{ paddingTop: 20, alignItems: 'center', paddingBottom: 40 }}>
                <TouchableOpacity
                onPress={handleSave}
                  style={{ top: 10, backgroundColor: COLORS.primary, borderRadius: 10, width: 299, height: 60, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
slide: {
justifyContent: 'center',
alignItems: 'center',
paddingTop: 15,
},
input: {
width: 299,
height: 60,
borderColor: '#ddd',
borderWidth: 1,
borderRadius: 10,
paddingHorizontal: 10,
marginBottom: 10,
backgroundColor:COLORS.white,
color: COLORS.dark,
},
featureRow: {
borderWidth: 1,
borderRadius: 10,
borderColor: COLORS.grey,
flexDirection: 'row',
paddingTop: 20,
paddingLeft: 20,
alignItems: 'center',
},
featureItem: {
paddingRight: 20,
alignItems: 'center',
},
iconContainer: {
width: 130,
height: 130,
borderRadius: 15,
backgroundColor: COLORS.white,
justifyContent: 'center',
alignItems: 'center',
},
imagePreview: {
width: 130,
height: 130,
borderRadius: 15,
},
signature: {
width: 300,
height: 200,
borderWidth: 1,
borderColor: COLORS.grey,
marginTop: 10,
},
signatureButtons: {
flexDirection: 'row',
justifyContent: 'space-around',
marginTop: 10,
},
clearButton: {
backgroundColor: COLORS.grey,
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 10,
},
confirmButton: {
backgroundColor: COLORS.primary,
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 10,
},
buttonText: {
color: COLORS.white,
fontSize: 16,
fontWeight: 'bold',
},
inputContainer: {
  marginHorizontal: 20,
  marginBottom: 20,
},
pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    backgroundColor:COLORS.white
},
picker: {
    height: 50,
    width:300,
    color: COLORS.dark,
},
});

export default AddTicket;