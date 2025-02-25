import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/color';  
import { BASE_URL } from '../../config';
import axios from 'axios';
import RenderHTML from 'react-native-render-html';

const DetailScreen = ({ navigation, route }) => {
  const url = BASE_URL;
  const [place, setPlace] = useState({});
  const { width } = useWindowDimensions();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${url}${route.params.object_model}/detail/${route.params.id}`);
        setPlace(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
  };

  const htmlContent = place.content || '';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7 }} source={{ uri: place && place.image }}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack} />
          {/* <Icon name="more-vert" size={28} color={COLORS.white} /> */}
        </View>
        <View style={styles.imageDetails}>
          <Text style={styles.imageTitle}>{place.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='star' size={30} color={COLORS.orange} />
            <Text style={styles.imageRating}> {place.review_score?.score_total || '5'}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.detailContainer}>
        {/* <View style={styles.iconContainer}> */}
          {/* <Icon name='favorite' size={30} color={COLORS.red} /> */}
        {/* </View> */}
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Icon name='place' size={28} color={COLORS.primary} />
          <Text style={styles.locationText}> {place.location?.name || '0'}</Text>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>
        <ScrollView style={styles.htmlContainer}>
          <RenderHTML contentWidth={width} source={{ html: htmlContent }} />
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.priceText}> {formatPrice(place.price)} </Text>
        </View>
        <TouchableOpacity style={styles.btnBooking} onPress={() => navigation.navigate('CheckAvailability', place)}>
          <Text style={styles.btnBookingText}>Check Availability</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  imageTitle: {
    width: '70%', 
    fontSize: 30, 
    fontWeight: 'bold', 
    color: COLORS.white, 
    marginBottom: 20,
  },
  imageRating: {
    color: COLORS.white, 
    fontWeight: 'bold', 
    fontSize: 20,
  },
  detailContainer: {
    top: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.5,  // Adjust flex value for better space management
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5, 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: COLORS.primary,
  },
  sectionTitle: {
    marginLeft: 5, 
    marginTop: 20, 
    fontWeight: 'bold', 
    fontSize: 20, 
    color: COLORS.dark,
  },
  htmlContainer: {
    marginTop: 10,  // Added margin to separate HTML content from other text
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.white,
  },
  btnBooking: {
    height: 50,
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBookingText: {
    color: COLORS.primary, 
    fontSize: 16, 
    fontWeight: 'bold',
  },
});

export default DetailScreen;
