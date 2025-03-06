import { View, Text, StatusBar, SafeAreaView, StyleSheet, TextInput, FlatList,Dimensions,TouchableHighlight,Image, TouchableOpacity,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons'
import hotels from '../../const/hotels';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import axios from 'axios';
import { BASE_URL } from '../../config';
import BackButtonHeader from '../../component/BackButtonHeader';

const Services = ({navigation, route}) => {
    let listData = route.params;
    // const modifiedListData = listData.toLowerCase();

    const url = BASE_URL;

    const [services, setservices] = useState([])

    useEffect(()=> {
    
        const getUser = async () =>{
    
            try {
              if (listData) {
                
                let start = listData.startDate.toISOString().split('T')[0];
                let end = listData.endDate.toISOString().split('T')[0];
                  console.log(`${url}hotel/search?locations_id=${listData.locations}&adults=${listData.adults}&children=${listData.childs}&start=${start}&end=${end}`)                
                const response = await axios.get(`${url}hotel/search?location_id=${listData.locations}&adults=${listData.adults}&children=${listData.childs}&start=${start}&end=${end}`);
                setservices(response.data.data)
              } else {
                const response = await axios.get(`${url}hotel/search`);
                setservices(response.data.data)
              }
               
                
            } catch (error) {
                console.error(error);
            }
        }
    
        getUser();

    },[]);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
      try {
        const response = await axios.get(`${url}hotel/search?service_name=${searchQuery}`);
        setservices(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const Card = ({hotel}) => {
      const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
      };

        return (
          <TouchableHighlight
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('DetailScreen', hotel)}>
            <View style={style.card}>
              <View style={{alignItems: 'center', top: -40}}>
                <Image source={{uri: hotel && hotel.image }} style={{height: 120, width: 120, borderRadius:80, borderColor:COLORS.primary, borderWidth:5}} />
              </View>
              <View style={{marginHorizontal: 20, top:-15,flexDirection: 'row'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color:COLORS.dark}}>{hotel.title}</Text>
                
              </View>
              <View
                style={{
                  marginTop: 10,top:-15,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  {hotel.sale_price ? (
                    <Text style={style.salePrice}>
                      {formatPrice(hotel.sale_price)}
                    </Text>
                  ) : (
                    <Text style={style.defaultPrice}> 0</Text>
                  )}
              </View>
              <View
                style={{
                  marginTop: 10,top:-15,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color:COLORS.dark}}>
                {formatPrice(hotel.price)}
                </Text>
                
              </View>
              <View style={{position: 'relative'}}>
                <View style={{flexDirection: 'row', position: 'absolute',  right: 20}}>
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Text style={{marginLeft: 5, color: COLORS.dark}}>{hotel.review_score.score_total}</Text>
                </View>
              
            </View>
            </View>
           
          </TouchableHighlight>
        );
      };

      

    return (
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.white}}>
    <BackButtonHeader title="List Hotel" backgroundColor={COLORS.primary} arrowColor="#fff" />
        
        <View style={style.header}>
        <View>
          
          <Text style={{marginTop: 5, fontSize: 18, color: COLORS.white}}>
          Booking hotel murah, nyaman & terdekat?
          </Text>
        </View>
      </View>
      

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={services}
        renderItem={({item}) => <Card hotel={item} />}
      />

    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'line-through', // Gaya untuk harga coret
  },
  defaultPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor:COLORS.primary,
      paddingBottom:15
    },
    inputContainer: {
      flex: 1,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: COLORS.light,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    card: {
      height: 250,
      width: cardWidth,
      marginHorizontal: 10,
      marginBottom: 20,
      marginTop: 50,
      borderRadius: 15,
      elevation: 13,
      backgroundColor: COLORS.white,
    },
    addToCartBtn: {
      height: 30,
      width: 30,
      borderRadius: 20,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      top:20
    },
    sortBtn: {
      width: 50,
      height: 50,
      marginLeft: 10,
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardImage:{
        height:220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10
    },
})
export default Services;