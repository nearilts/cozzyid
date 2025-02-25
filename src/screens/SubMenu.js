import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, FlatList, TextInput, LayoutAnimation } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HelpCenterItem from '../components/HelpCenterItem';
import { faqKeywords } from '../data';
import { useTheme } from '../theme/ThemeProvider';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import axios from 'axios';
import { Linking } from 'react-native';



const contactUsRoute = () => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    const [contactus, setcontactus] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const url = BASE_URL;

    const handleOpenURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const apibacaan = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}sub_menu`);
            console.log('RESPONSES bacan', response.data);
            setcontactus(response.data.data.data); // Adjust this based on actual response structure
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

   

    useEffect(() => {
        apibacaan();
    }, []);
    const renderItem = ({ item }) => (
        <HelpCenterItem
            icon={icons.internetOutline}
            title={item.title}
            onPress={() => handleOpenURL(item.link)}
        />
    );
    return (
        <View style={[styles.routeContainer, {
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite
        }]}>
            <FlatList
                data={contactus}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            
        </View>
    )
}


const SubMenu = ({ navigation }) => {
    const layout = useWindowDimensions();
    const { dark, colors } = useTheme();


    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        style={[styles.backIcon, {
                            tintColor: dark ? COLORS.white : COLORS.greyscale900
                        }]} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, {
                    color: dark ? COLORS.white : COLORS.greyscale900
                }]}>Information</Text>
            </View>
            {/* <TouchableOpacity>
                <Image
                    source={icons.moreCircle}
                    resizeMode='contain'
                    style={[styles.moreIcon, {
                        tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                    }]}
                />
            </TouchableOpacity> */}
        </View>
    )

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                {contactUsRoute()}
               
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
        marginRight: 16
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "Urbanist Bold",
        color: COLORS.black
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    routeContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 22
    },
    searchBar: {
        width: SIZES.width - 32,
        height: 56,
        borderRadius: 16,
        backgroundColor: COLORS.grayscale100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    searchIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.grayscale400
    },
    input: {
        flex: 1,
        color: COLORS.grayscale400,
        marginHorizontal: 12
    },
    faqContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    question: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Urbanist SemiBold",
        color: '#333',
    },
    icon: {
        fontSize: 18,
        color: COLORS.gray2,
    },
    answer: {
        fontSize: 14,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 10,
        fontFamily: "Urbanist Regular",
        color: COLORS.gray2,
    },
})

export default SubMenu;
