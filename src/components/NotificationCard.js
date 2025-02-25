import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { COLORS, images, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
const NotificationCard = ({ icon, title, description, date, onPress }) => {
    const { dark } = useTheme();

    const getTimeAgo = (datePost) => {
        const currentDate = new Date();
        const postDate = new Date(datePost);
      
        const seconds = Math.floor((currentDate - postDate) / 1000);
        if (seconds < 60) {
          return `${seconds} seconds ago`;
        }
      
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
          return `${minutes} minutes ago`;
        }
      
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
          return `${hours} hours ago`;
        }
      
        const days = Math.floor(hours / 24);
        if (days < 30) {
          return `${days} days ago`;
        }
      
        const months = Math.floor(days / 30);
        if (months < 12) {
          return `${months} months ago`;
        }
      
        const years = Math.floor(months / 12);
        return `${years} years ago`;
      }
    return (
        <View
            style={styles.container}
            onPress={onPress}>
            <View style={styles.leftContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../assets/ic_launcher_round.png")}
                        resizeMode='cover'
                        // style={styles.icon}
                    />
                </View>
                <View>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            <Text style={styles.date}>{getTimeAgo(date)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        width: SIZES.width - 32,
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    iconContainer: {
        height: 44,
        width: 44,
        backgroundColor: COLORS.black2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        marginRight: 12
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: COLORS.white
    },
    title: {
        fontSize: 14,
        fontFamily: "Urbanist Medium",
        color: COLORS.black,
        marginBottom: 6
    },
    description: {
        fontSize: 14,
        fontFamily: "Urbanist Regular",
        color: "gray"
    },
    date: {
        fontSize: 12,
        fontFamily: "Urbanist Regular",
        color: "gray",
    }
})

export default NotificationCard