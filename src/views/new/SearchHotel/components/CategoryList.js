import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import COLORS from '../../../../const/color';

const {width} = Dimensions.get("screen"); 
const cardwidht = width / 1.8;
import { BASE_URL } from '../../../../config';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const CategoryList = ({  }) => {
        const navigation = useNavigation();
    const url = BASE_URL;
    const categories = [ 'Hotel'];
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCategory, setselectedCategory] = React.useState(0);

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const [hotels, sethotels] = useState([])
    const [listHotelArray, setlistHotelArray] = useState([])
    const [listRecomendedArray, setlistRecomendedArray] = useState([])


    useEffect(()=> {
    
        const getUser = async () =>{
            setIsLoading(true);
    
            try {
                const response = await axios.get(`${url}home-page`);
                sethotels(response.data)
                    setIsLoading(false);
                
            } catch (error) {
                console.error(error);
                setIsLoading(false);

            }
        }
    
        getUser();

    },[]);
    useEffect(() => {
        if (hotels && hotels.data && hotels.data.length > 0) {
            const listHotelArrays = hotels.data.filter(item => item.type === "list_hotel");
            const hotelModels = listHotelArrays.map(item => item.model.data);
            // console.log('HOTEL', hotelModels);
            
    
            setlistHotelArray(hotelModels[0]);

            // recomended
            const listRecomendedArrays = hotels.data.filter(item => item.type === "list_locations");
            const RecomendedModels = listRecomendedArrays.map(item => item.model.data);
            // console.log('Recomended', RecomendedModels);
            
    
            setlistRecomendedArray(RecomendedModels[0]);
        }

    }, [hotels]);

    const categoryfilter=(index) => {
        setselectedCategory(index);
            if (hotels && hotels.data && hotels.data.length > 0) {
                let listHotelArrays;
                if (index == 0) {
                    listHotelArrays = hotels.data.filter(item => item.type === "list_hotel");
                } 
                const hotelModels = listHotelArrays.map(item => item.model.data);
                console.log('index', index);
                
        
                setlistHotelArray(hotelModels[0]);
            }
    }
    const CategoryList = () => {
        return (
            <View style={styles.CategoryListContainer}>
                {categories.map((item, index)=> (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => categoryfilter(index)}>
                        <View><Text style={{...styles.categorytext, color: selectedCategory == index? COLORS.primary : COLORS.grey}}>{item}</Text></View>
                        {selectedCategory == index && (
                            <View style={{height:3, width:30, backgroundColor:COLORS.primary, marginTop: 2}}></View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    
    const Card = ({hotel, index}) => {
        const inputRange = [
            (index - 1) * cardwidht,
            index * cardwidht,
            (index + 1) * cardwidht,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0, 0.7],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
          });
          const formatPrice = (price) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
          };

        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("DetailScreen", hotel )}>
            <Animated.View style={{...styles.card,transform: [{scale}]}}>
                <Animated.View style={{...styles.overLayCard, opacity}} />
                <View style={styles.priceTag}>
                    <Text style={{color:COLORS.white, fontSize: 20, fontWeight:'bold'}}>  {formatPrice(hotel.price)}</Text>
                </View>
                <Image source={{uri: hotel && hotel.image }} style={styles.cardimage} />
                <View style={styles.cardDetails}>
                   <View>
                        <Text style={{fontWeight: 'bold', fontSize: 17, color:COLORS.dark}}>{hotel.title}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 12, color:COLORS.grey}}>{hotel.location?.name}</Text>
                    </View>
                   <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                   
                    {renderStars(hotel.review_score.score_total)}
                    <Text style={{fontSize: 10, color:COLORS.grey}}>{hotel.review_score.total_review} reviews</Text>
                   </View>
                </View>
            </Animated.View>
            </TouchableOpacity>
        )
    } 
    const renderStars = (score) => {
        const totalStars = 5;
        const filledStars = Math.floor(score);
        const stars = [];
    
        for (let i = 0; i < filledStars; i++) {
            stars.push(
                <Icon key={`filled_${i}`} name='star' size={15} color={COLORS.orange} />
            );
        }
    
        if (score - filledStars >= 0.5) {
            stars.push(
                <Icon key={`half_star`} name='star-half' size={15} color={COLORS.orange} />
            );
        }
    
        const emptyStars = totalStars - filledStars - (score - filledStars >= 0.5 ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Icon key={`empty_${i}`} name='star' size={15} color={COLORS.grey} />
            );
        }
    
        return (
            <View style={{flexDirection: 'row'}}>
                {stars}
            </View>
        );
    }
    return (
        <View style={{ }}>
            <Spinner visible={isLoading} />

           <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <CategoryList />
                <View style={{justifyContent:'center', top:15}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("Services", null)} >
                        <Text  style={{ ...styles.categorytext, color: COLORS.primary, paddingRight:20 }}>More Hotel</Text>

                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Animated.FlatList
                snapToInterval={cardwidht}
                horizontal
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true},
                )}
                data={listHotelArray}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index}) => <Card hotel={item} index={index} />}
                contentContainerStyle={{paddingVertical: 30, paddingLeft: 20,paddingRight: cardwidht / 2-40}} />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    categorytext:{
        fontSize: 17,
        fontWeight: 'bold',
    },

    CategoryListContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30
    },
    card:{
        height: 280,
        width: cardwidht,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: COLORS.white
    },
    cardimage:{
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    priceTag:{
        height: 60,
        width: 160,
        backgroundColor:COLORS.primary,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardDetails:{
        height: 120,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%'
    },
    overLayCard:{
        height: 280,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: cardwidht,
        borderRadius: 15
    },
});

export default CategoryList;
