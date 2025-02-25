import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import COLORS from '../../../const/color';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SectionHeader from './SectionHeader';
import FeaturedHotelCard from './FeaturedHotelCard';

const ListHotelBig = () => {
    const [listHotelArray, setListHotelArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const url = BASE_URL;
    const [hotels, setHotels] = useState([]);
    
    const navigation = useNavigation();

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${url}home-page`);
                setHotels(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }

        getUser();
    }, []);

    useEffect(() => {
        if (hotels && hotels.data && hotels.data.length > 0) {
            const listHotelArrays = hotels.data.filter(item => item.type === "list_hotel");
            const hotelModels = listHotelArrays.map(item => item.model.data);

            setListHotelArray(hotelModels[0]);
        }
    }, [hotels]);

    return (
        <View>
            <SectionHeader
                title="Hotel"
                subtitle="See All"
                onPress={() => navigation.navigate("MainPage")}
            />
            <FlatList
                data={listHotelArray}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FeaturedHotelCard
                        image={item.image}
                        name={item.title}
                        rating={item.review_score?.total_review}
                        price={item.price}
                        location={item.location?.name}
                        onPress={() => navigation.navigate('DetailScreen', item)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default ListHotelBig;
