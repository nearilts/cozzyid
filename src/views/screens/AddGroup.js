import { View, Text, StatusBar, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image, Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { addDays } from 'date-fns';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import COLORS from '../../const/color';
import { BASE_URL, BASE_URL_CHAT } from '../../config';

const AddGroup = ({ navigation }) => {
    const url = BASE_URL_CHAT;

    const [isLoading, setIsLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    name: '',
    group_type: '1',
    privacy: '1',
    users: '',
    files: {
      image: null,
    },
  });

  const kirimdata = async () => {
    try {
        setIsLoading(true);
        let userInfo = await AsyncStorage.getItem('userInfoChat');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.data.token;
        let ids = userInfo.data.user?.id;

      const formDatas = new FormData();
      formDatas.append('name', formData.name);
      formDatas.append('group_type', formData.group_type);
      formDatas.append('privacy', formData.privacy);
      formDatas.append('users[]', ids);
      if (formData.files.image) {
        formDatas.append('photo', {
          uri: formData.files.image.uri,
          name: formData.files.image.fileName ,
          type: formData.files.image.type,
        });
      }
      console.log('formData', formDatas );
      
      const response = await axios.post(`${url}groups`, formDatas, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);

      console.log('response', response.data);
      if (response.data.success) {
        alert('Data Success Save');
        navigation.goBack();
      } else {
        alert('Gagal Simpan');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleSave = () => {
    console.log('formData',formData)
    if (!formData.name) {
        Alert.alert('Error', 'Nama Group, Foto group Wajib Diisi.');
        return;
      }    kirimdata()

  };
  const handleInputChange = async (key, value) => {
    console.log(key)
    setFormData({ ...formData, [key]: value });
    

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
              <Text style={{ color: COLORS.dark, fontSize: 22, fontWeight: 'bold' }}>Buat Grup Chat</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 25 }}>
          <View style={{ borderRadius: 30, backgroundColor: COLORS.secondgrey }}>
            <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                
                <View style={{}}>
                  <Text style={{ paddingLeft: 10, paddingTop: 20, fontSize: 15, color: COLORS.dark, fontWeight: 'bold',marginBottom:10 }}> Group Type</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={formData.group_type}
                        onValueChange={(itemValue) => handleInputChange('group_type', itemValue)}
                        style={styles.picker}
                        >
                            <Picker.Item label="Open" value="1" />
                            <Picker.Item label="Close" value="2" />
                               
                        </Picker>
                    </View>
                </View>
            
              </View>

              
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                
                <View style={{}}>
                    <Text style={{ paddingLeft: 10, paddingTop: 20, fontSize: 15, color: COLORS.dark, fontWeight: 'bold',marginBottom:10 }}> Privacy</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                            selectedValue={formData.privacy}
                            onValueChange={(itemValue) => handleInputChange('privacy', itemValue)}
                            style={styles.picker}
                            >
                                <Picker.Item label="Public" value="1" />
                                <Picker.Item label="Private" value="2" />
                                
                            </Picker>
                        </View>
                </View>
            
              </View>

              <Text style={{ paddingLeft: 45, paddingTop: 20, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}> Nama Group</Text>
              <View style={styles.slide}>
              <TextInput
                    style={styles.input}
                    placeholder="Nama Group"
                    placeholderTextColor={COLORS.dark}
                    onChangeText={(value) => handleInputChange('name', value)} // Correct property
                />
              </View>

              {/* <Text style={{ paddingLeft: 45, paddingTop: 10, paddingBottom: 10, fontSize: 15, color: COLORS.dark, fontWeight: 'bold' }}>Logo Group</Text>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.featureRow}>
                  <FeatureItem icon="add-a-photo" text="Logo Group*"
                    file={formData.files.image}
                    onPress={() => handleFilePick('image')}
                  />
                </View>
              </View> */}
              

              

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

export default AddGroup;