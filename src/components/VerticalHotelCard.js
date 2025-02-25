import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from '../theme/ThemeProvider';

const VerticalHotelCard = ({
    name,
    image,
    rating,
    price,
    location,
    onPress
}) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const { dark } = useTheme();
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
      };
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white
            }]}>
            <Image
                source={{uri: image }}

                resizeMode='cover'
                style={styles.image}
            />
            <View style={styles.reviewContainer}>
                <FontAwesome name="star" size={12} color="orange" />
                <Text style={styles.rating}>{rating}</Text>
            </View>
            <Text style={[styles.name, {
                color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
            }]}>{name}</Text>
            <Text style={[styles.location, {
                color: dark ? COLORS.greyscale300 : COLORS.grayscale700,
            }]}>{location}</Text>
            <View style={styles.bottomPriceContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatPrice(price)}</Text>
                    <Text style={[styles.durationText, {
                        color: dark ? COLORS.greyscale300 : COLORS.grayscale700,
                    }]}> / night</Text>
                </View>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <Image
                        source={isFavourite ? icons.heart2 : icons.heart2Outline}
                        resizeMode='contain'
                        style={styles.heartIcon}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: (SIZES.width - 32) / 2 - 12,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12
    },
    image: {
        width: "100%",
        height: 140,
        borderRadius: 16
    },
    name: {
        fontSize: 16,
        fontFamily: "Urbanist Bold",
        color: COLORS.greyscale900,
        marginVertical: 4
    },
    location: {
        fontSize: 12,
        fontFamily: "Urbanist Regular",
        color: COLORS.grayscale700,
        marginVertical: 4
    },
    bottomPriceContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    price: {
        fontSize: 18,
        fontFamily: "Urbanist Bold",
        color: COLORS.primary,
        marginRight: 8
    },
    durationText: {
        fontSize: 14,
        fontFamily: "Urbanist Regular",
        color: COLORS.grayscale700
    },
    heartIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.primary,
        marginLeft: 6
    },
    reviewContainer: {
        position: "absolute",
        top: 16,
        right: 16,
        width: 46,
        height: 20,
        borderRadius: 16,
        backgroundColor: COLORS.transparentWhite2,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    rating: {
        fontSize: 12,
        fontFamily: "Urbanist SemiBold",
        color: COLORS.primary,
        marginLeft: 4
    },
})

export default VerticalHotelCard