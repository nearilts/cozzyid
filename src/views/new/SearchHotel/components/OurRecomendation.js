import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native';
import COLORS from '../../../../const/color';
import VerticalHotelCard from './VerticalHotelCard';
import { BASE_URL } from '../../../../config';
import SectionHeader from '../../components/SectionHeader';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

const OurRecomendation = ({  }) => {
    const navigation = useNavigation();
    const [hotels, sethotels] = useState([])
    const [listHotelArray, setlistHotelArray] = useState([])
    const url = BASE_URL;

    useEffect(()=> {

        const getUser = async () =>{
    
            try {
                const response = await axios.get(`${url}home-page`);
        console.log('response.data',response.data)

                sethotels(response.data)
                
            } catch (error) {
                console.error(error);
    
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
            }
    
    }, [hotels]);
    const renderOurRecommendationHotels = () => {
    
    console.log('listHotelArray',listHotelArray)
        return (
          <View style={{marginLeft:20}}>
            <SectionHeader
              title="Our Recommendation"
              subtitle="See All"
              onPress={() => navigation.navigate("Services", null)}
            />
           
            <View style={{
              backgroundColor: COLORS.white,
              marginVertical: 16
            }}>
              <FlatList
                data={listHotelArray}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ gap: 16 }}
                renderItem={({ item }) => {
                  return (
                    <VerticalHotelCard
                      name={item.title}
                      image={item.image}
                      rating={item.review_score?.total_review}
                      price={item.price}
                      location={item.location?.name}
                      onPress={() => navigation.navigate('DetailScreen', item)}
                    />
                  )
                }}
              />
            </View>
          </View>
        )
      }
    return (
        <View style={{  }}>
          {renderOurRecommendationHotels()}
           
        </View>
    );
};

const styles = StyleSheet.create({
 
});

export default OurRecomendation;
