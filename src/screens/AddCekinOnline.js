import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL, URLS } from '../config';
import COLORS from '../const/color';
import DatePickerInputs from '../component/DatePickerInputs';
import { addDays } from 'date-fns';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { Linking } from 'react-native';
import CheckBox from 'expo-checkbox';
 '@react-native-community/checkbox';

const AddCekinOnline = ({ navigation }) => {
    const url = BASE_URL;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 1));
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const [profil, setprofil] = useState({})
    const fetchprofil = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]
            const response = await axios.get(`${url}listcheckins`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response.data)
            setprofil(response.data.data)

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchprofil();
        });
        fetchprofil();

        return unsubscribe;
    }, [navigation]);


    const isProfileAvailable = profil && Object.keys(profil).length > 0;

    const [location, setlocation] = useState([])
    const getLocations = async () =>{

        try {
            const response = await axios.get(`${url}locations`);
            setlocation(response.data.data)
            
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        getLocations();
       
      }, []);
  const [formData, setFormData] = useState({
    cekin: startDate.toISOString().split('T')[0],
    cekout: endDate.toISOString().split('T')[0],
    catatan: '',
    locations: '',
    files: {
      image: null,
      bukti_pembayaran: null,
    },
  });

  const kirimdata = async () => {
    try {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];

      const formDatas = new FormData();
      formDatas.append('cekin', formData.cekin);
      formDatas.append('cekout', formData.cekout);
      formDatas.append('catatan', formData.catatan);
      formDatas.append('locations', formData.locations);
      if (formData.files.image) {
        formDatas.append('image', {
          uri: formData.files.image.uri,
          name: formData.files.image.fileName ,
          type: formData.files.image.type,
        });
      }
      if (formData.files.bukti_pembayaran) {
        formDatas.append('bukti_bayar', {
          uri: formData.files.bukti_pembayaran.uri,
          name: formData.files.bukti_pembayaran.fileName ,
          type: formData.files.bukti_pembayaran.type,
        });
      }
      console.log('formData', formDatas );
      
      const response = await axios.post(`${url}checkins`, formDatas, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);

      console.log('response', response.data);
      if (response.data.code == 1) {
        alert('Data Success Save');
        navigation.navigate('Home')
      } else {
        alert('Gagal Simpan');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = () => {
    if (isProfileAvailable) {
      if ( !formData.files.bukti_pembayaran || !formData.locations || !checked) {
        Alert.alert('Error', 'Lokasi, Foto Ktp dan Bukti Bayar Wajib Diisi.');
        return;
      }    kirimdata()

    } else {
      if (!formData.files.image || !formData.files.bukti_pembayaran || !formData.locations || !checked) {
        Alert.alert('Error', 'Lokasi, Foto Ktp dan Bukti Bayar Wajib Diisi.');
        return;
      }    kirimdata()

    }
   
  };
  const handleInputChange = async (key, value) => {
    setFormData({ ...formData, [key]: value });
    
    console.log('formData', formData );

  };
  const handleFilePick = async (fileType) => {
    Alert.alert(
      "Pilih Sumber Gambar",
      "Pilih Kamera Atau Galery",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Camera",
          onPress: () => launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.error('ImagePicker Error: ', response.error);
            } else {
              setFormData({
                ...formData,
                files: {
                  ...formData.files,
                  [fileType]: response.assets[0],
                },
              });
            }
          })
        },
        {
          text: "Gallery",
          onPress: () => launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.error('ImagePicker Error: ', response.error);
            } else {
              setFormData({
                ...formData,
                files: {
                  ...formData.files,
                  [fileType]: response.assets[0],
                },
              });
            }
          })
        }
      ],
      { cancelable: true }
    );
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    let cekin = date.toISOString().split('T')[0];
    setFormData({ ...formData, 'cekin': cekin });

  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    let cekout = date.toISOString().split('T')[0];
    setFormData({ ...formData, 'cekout': cekout });
  };

const handleOpenURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};
  const FeatureItem = ({ icon, text, file, onPress, users }) => (
    <View style={styles.featureItem}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconContainer}>
          {users ? (
            <Image source={{ uri: BASE_URL + users }} style={styles.imagePreview} />
          ) : file ? (
            <Image source={{ uri: file.uri }} style={styles.imagePreview} />
          ) : (
            <Icon name={icon} size={45} color={COLORS.primary} />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );

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
              <Text style={{ color: COLORS.dark, fontSize: 22, fontWeight: 'bold' }}>Cek In Online</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 25 }}>
          <View style={{ borderRadius: 30, backgroundColor: COLORS.secondgrey }}>
            <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                
                <View style={{}}>
                  <Text style={{ paddingLeft: 10, paddingTop: 20, fontSize: 15, color: COLORS.dark, fontWeight: 'bold',marginBottom:20 }}> Lokasi</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={formData.locations}
                        onValueChange={(itemValue) => handleInputChange('locations', itemValue)}
                        style={styles.picker}
                        >
                            {/* buat picker item dari api locations */}
                            <Picker.Item label="Choose Location" value="" />
                                {location.map((loc) => (
                                    <Picker.Item key={loc.id} label={loc.title} value={loc.title} />
                                ))}
                        </Picker>
                    </View>
                    </View>
            
            </View>

              <Text style={{ paddingLeft: 45, paddingTop: 20, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> Cek In</Text>
              <View style={styles.slide}>
              <DatePickerInputs type="start" onChange={handleStartDateChange} defaultDate={startDate}  />

              </View>

              <Text style={{ paddingLeft: 45, paddingTop: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> Cek Out</Text>
              <View style={styles.slide}>
                <DatePickerInputs type="end" onChange={handleEndDateChange} defaultDate={endDate} />

              </View>

              

              <Text style={{ paddingLeft: 45, paddingTop: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> Catatan</Text>
              <View style={styles.slide}>
                <TextInput
                  style={styles.input}
                  placeholder="Isi Catatan"
                  placeholderTextColor={COLORS.dark}
                  onChangeText={(value) => handleInputChange('catatan', value)}
                />
              </View>

              { !isProfileAvailable ? (
                <>
                <Text style={{ paddingLeft: 45, paddingTop: 10, paddingBottom: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}>Foto KTP</Text>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.featureRow}>
                  <FeatureItem icon="add-a-photo" text="Foto KTP*"
                    file={formData.files.image}
                    onPress={() => handleFilePick('image')}
                  />
                </View>
              </View>
              </>
              ): (
              <Text style={{ paddingLeft: 45, paddingTop: 10, paddingBottom: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> KTP Sudah ada.</Text>
              )}
              
              <Text style={{ paddingLeft: 45, paddingTop: 10, paddingBottom: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> Bukti Bayar</Text>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.featureRow}>
                  <FeatureItem icon="add-a-photo" text="Bukti Bayar*"
                    file={formData.files.bukti_pembayaran}
                    onPress={() => handleFilePick('bukti_pembayaran')}
                  />
                </View>
              </View>

              <View style={{flexDirection:'row',paddingLeft: 40, paddingTop: 20,}}>
              
              <CheckBox
               tintColors={{ true: COLORS.primary, false: 'black' }}
                  title='Check me!'
                    disabled={false}
                    value={checked}
                    onValueChange={() => setChecked(!checked)}
                />
                <TouchableOpacity  onPress={() =>  handleOpenURL(URLS+'get-tac-pdf')}>
                <Text style={{ paddingTop:5, fontSize: 15, color: COLORS.primary, fontWeight: 'bold' }}> Term And Condition</Text>

                </TouchableOpacity>
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

export default AddCekinOnline;