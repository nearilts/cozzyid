import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../../../const/color';  // Assuming COLORS is an existing file
import axios from 'axios';
import { BASE_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalSelector from 'react-native-modal-selector';

const RatingReview = ({navigation, route}) => {
    console.log(route.params.data.id)
    const url = BASE_URL;

    const [hotel, setHotel] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ratings, setRatings] = useState({
      service: 0,
      organization: 0,
      friendliness: 0,
      areaExpert: 0,
      safety: 0,
    });
    
    const [location, setlocation] = useState([])
    const getLocations = async () =>{

        try {
            const response = await axios.post(`${url}review-online/${route.params.data.id}`);
            setlocation(response.data.data.hotel)
            
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        getLocations();
       
      }, []);

    // Handle the submission
    const handleSubmit = () => {
        // Validasi untuk memastikan tidak ada data yang kosong
        if (!hotel || !title || !content || 
            ratings.service === 0 || 
            ratings.organization === 0 || 
            ratings.friendliness === 0 || 
            ratings.areaExpert === 0 || 
            ratings.safety === 0) {
          alert('Mohon lengkapi semua field sebelum mengirim review.');
          return; // Hentikan eksekusi jika ada field yang kosong
        }

        if(content.length < 10 ){
          alert('Content review minimal 10 karakter.');
          return; // Hentikan eksekusi jika ada field yang kosong
        }
      
        const reviewData = {
          review_title: title,
          review_content: content,
          review_stats: {
            Kebersihan: ratings.service.toString(),
            Kenyamanan: ratings.organization.toString(),
            Pelayanan: ratings.friendliness.toString(),
            Keharuman: ratings.areaExpert.toString(),
            Lokasi: ratings.safety.toString(),
          },
          review_service_id: hotel, // Ambil ID hotel dari pilihan
          review_service_type: 'hotel',
          submit: 'Leave a Review',
        };
        kirimdata(reviewData)
        // Tampilkan hasil di console
        console.log(reviewData);
        // Kirim data review ke server menggunakan axios di sini
      };

      
  const kirimdata = async (reviewData) => {
    try {
        let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];

      console.log('reviews', `${url}reviews`,reviewData);
     
      
      const response = await axios.post(`${url}reviews`,reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response', response.data);
      if (response.data.status === "success") {
        alert('Data Success Save');
        navigation.navigate('MainTab')
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

    const starRating = (category) => {
        return [...Array(5)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setRatings({ ...ratings, [category]: index + 1 })}
          >
            <Text style={styles.star}>{index < ratings[category] ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ));
      };
      
      return (
        <View style={{ backgroundColor:COLORS.white,top:10}}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
              <Text style={styles.label}>Menulis review</Text>
      
              <Text style={styles.label}>Hotel</Text>
              <ModalSelector
                  data={location.map((loc) => ({
                    key: loc.id,
                    label: loc.title,
                    value: loc.id,
                  }))}
                  initValue="Choose Location"
                  onChange={(option) => setHotel(option.value)}
                >
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={hotel ? location.find((loc) => loc.id === hotel)?.title : "Choose Location"}
                  />
                </ModalSelector>
      
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor={COLORS.dark}
                value={title}
                onChangeText={setTitle}
              />
      
              <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Review content"
                placeholderTextColor={COLORS.dark}
                value={content}
                multiline={true}
                onChangeText={setContent}
              />
      
              <Text style={styles.label}>Kebersihan</Text>
              <View style={styles.starContainer}>{starRating('service')}</View>
      
              <Text style={styles.label}>Kenyamanan</Text>
              <View style={styles.starContainer}>{starRating('organization')}</View>
      
              <Text style={styles.label}>Pelayanan</Text>
              <View style={styles.starContainer}>{starRating('friendliness')}</View>
      
              <Text style={styles.label}>Keharuman</Text>
              <View style={styles.starContainer}>{starRating('areaExpert')}</View>
      
              <Text style={styles.label}>Lokasi</Text>
              <View style={styles.starContainer}>{starRating('safety')}</View>
      
              <TouchableOpacity style={[styles.button, { zIndex: 1 }]} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Leave a Review</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
      const styles = StyleSheet.create({
        container: {
          padding: 20,
          backgroundColor: '#fff', // Background of the entire screen
        },
        card: {
          backgroundColor: '#fff', // White background for the card
          borderRadius: 10,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4, // Shadow effect for Android
          marginBottom: 20,
        },
        label: {
          fontSize: 16,
          fontWeight: 'bold',
          marginVertical: 10,
          color:COLORS.dark,
        },
        input: {
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          borderRadius: 5,
          marginVertical: 5,
          color:COLORS.dark,
        },
        star: {
          fontSize: 30,
          color: '#f1c40f',
          marginHorizontal: 5,
        },
        starContainer: {
          flexDirection: 'row',
          marginBottom: 20,
        },
        button: {
          backgroundColor: '#2c3e50',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 20,
        },
        buttonText: {
          color: '#fff',
          fontSize: 18,
        },
      });
      export default RatingReview;
