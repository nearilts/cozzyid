import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions, FlatList } from 'react-native';

import { BASE_URL } from '../../../config';
import axios from 'axios';
import RenderHTML from 'react-native-render-html';
import COLORS from '../../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailHotel = ({ navigation, route }) => {
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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Icon
                    key={i}
                    name="star"
                    size={20}
                    color={i < rating ? COLORS.orange : COLORS.grey}
                />
            );
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>;
    };

    const htmlContent = place.content || '';
    const reviewScore = place.review_score || {};
    const reviewLists = place.review_lists?.data || [];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            <ScrollView>
                <ImageBackground style={{ flex: 0.7, height: 300 }} source={{ uri: place && place.image }}>
                    <View style={styles.header}>
                        <Icon name="arrow-back" size={35} color={COLORS.white} onPress={navigation.goBack} />
                    </View>
                </ImageBackground>

                <View style={{ top: -50, alignItems: 'center' }}>
                    <View style={{ height: 90, width: '90%', backgroundColor: COLORS.secondgrey, borderRadius: 20 }}>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 20 }}>
                                {place.title}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ top: -40, marginLeft: 20 }}>
                    <Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 18 }}>Hotel Description</Text>
                </View>

                <View style={{ top: -50, marginLeft: 20 }}>
                    <View style={{ marginTop: 20 }}>
                        <RenderHTML contentWidth={width} source={{ html: htmlContent }} />
                    </View>
                </View>

                {/* Review Section */}
                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 18 }}>Reviews</Text>
                    <View style={styles.reviewSummary}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>
                            {reviewScore.score_total || 'N/A'}
                        </Text>
                        <Text style={{ fontSize: 16, color: COLORS.dark }}>
                            {reviewScore.score_text || 'No Reviews'}
                        </Text>
                        {renderStars(Math.round(reviewScore.score_total || 0))}
                        <Text style={{ fontSize: 14, color: COLORS.grey }}>
                            {reviewScore.total_review || 0} reviews
                        </Text>
                    </View>

                    {/* Review List */}
                    <FlatList
                        data={reviewLists}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.reviewCard}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.reviewTitle}>{item.title}</Text>
                                    {renderStars(item.rate_number)}
                                </View>
                                <Text style={styles.reviewContent}>{item.content}</Text>
                                <Text style={styles.reviewAuthor}>
                                    {item.author?.name || 'Anonymous'} - {new Date(item.created_at).toLocaleDateString()}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.priceText}>{formatPrice(place.price)}</Text>
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
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.secondgrey,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    btnBooking: {
        height: 50,
        width: 150,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBookingText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviewSummary: {
        marginVertical: 10,
        alignItems: 'center',
    },
    reviewCard: {
        backgroundColor: COLORS.secondgrey,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    reviewContent: {
        fontSize: 14,
        color: COLORS.grey,
        marginVertical: 5,
    },
    reviewAuthor: {
        fontSize: 12,
        color: COLORS.primary,
        marginTop: 5,
    },
});

export default DetailHotel;
