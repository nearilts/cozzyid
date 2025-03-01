import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, FlatList, TextInput, LayoutAnimation } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HelpCenterItem from '../components/HelpCenterItem';
import { faqKeywords } from '../data';
import { useTheme } from '../theme/ThemeProvider';
import { ScrollView } from 'react-native-virtualized-view';
import { BASE_URL } from '../config';
import axios from 'axios';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Dummy Components for Each Tab Content


const FaqsRoute = ({ navigation }) => {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [expanded, setExpanded] = useState(-1);
    const [searchText, setSearchText] = useState('');
    const { dark } = useTheme();
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const url = BASE_URL;

    const apibacaan = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}faqs`);
            console.log('RESPONSES xxx', response.data.data.data);
            setFaqs(response.data.data.data); // Adjust this based on actual response structure
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

   

    useEffect(() => {
        apibacaan();
    }, []);

    const handleKeywordPress = (id) => {
        setSelectedKeywords((prevSelectedKeywords) => {
            const selectedKeyword = faqKeywords.find((keyword) => keyword.id === id);

            if (!selectedKeyword) {
                return prevSelectedKeywords;
            }

            if (prevSelectedKeywords.includes(selectedKeyword.name)) {
                return prevSelectedKeywords.filter((keyword) => keyword !== selectedKeyword.name);
            } else {
                return [...prevSelectedKeywords, selectedKeyword.name];
            }
        });
    };

    const KeywordItem = ({ item, onPress, selected }) => {
        const itemStyle = {
            paddingHorizontal: 14,
            marginHorizontal: 5,
            borderRadius: 21,
            height: 39,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: COLORS.primary,
            borderWidth: 1,
            backgroundColor: selected ? COLORS.primary : "transparent",
        };

        return (
            <TouchableOpacity style={itemStyle} onPress={() => onPress(item.id)}>
                <Text style={{ color: selected ? COLORS.white : COLORS.primary }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const toggleExpand = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded((prevExpanded) => (prevExpanded === index ? -1 : index));
    };

    return (
        <View>
            <View style={{ marginVertical: 16 }}>
               
            </View>
            <View
                style={[
                    styles.searchBar,
                    {
                        backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale100,
                    },
                ]}
            >
                <TouchableOpacity>
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={[
                            styles.searchIcon,
                            {
                                tintColor: dark ? COLORS.greyscale600 : COLORS.grayscale400,
                            },
                        ]}
                    />
                </TouchableOpacity>
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: dark ? COLORS.greyscale600 : COLORS.grayscale400,
                        },
                    ]}
                    placeholder="Search"
                    placeholderTextColor={dark ? COLORS.greyscale600 : COLORS.grayscale400}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginVertical: 22 }}
            >
                {faqs
                    // .filter((faq) => {
                    //     if (selectedKeywords.length === 0) return true;
                    //     return faq.title && selectedKeywords.includes(faq.title);
                    // })
                    // .filter((faq) => faq.title.toLowerCase().includes(searchText.toLowerCase()))
                    .map((faq, index) => (
                        <View key={index} style={[styles.faqContainer, {
                            backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale100,
                        }]}>
                            <TouchableOpacity
                                onPress={() => toggleExpand(index)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.questionContainer}>
                                    <Text style={[styles.title, {
                                        color: dark ? COLORS.white : COLORS.black,
                                    }]}>{faq.title}</Text>
                                    <Text style={[styles.icon, {
                                        color: dark ? COLORS.white : COLORS.black,
                                    }]}>
                                        {expanded === index ? '-' : '+'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {expanded === index && (
                                <Text style={[styles.answer, {
                                    color: dark ? COLORS.secondaryWhite : COLORS.gray2
                                }]}>{faq.description}</Text>
                            )}
                        </View>
                    ))}
            </ScrollView>
        </View>
    );
};


const TicketRoute = () => {
    const navigation = useNavigation();
    const url = BASE_URL;
    const [profil, setProfil] = useState([]);
    
    const fetchProfil = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1];
            const response = await axios.get(`${url}ticket`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response.data);
            setProfil(response.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchProfil();
        });
        fetchProfil();

        return unsubscribe;
    }, [navigation]);

    
    const AddGroups = () => {
        navigation.navigate('AddTicket');
      };

      
    const renderItem = ({ item }) => (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', padding: 5 }}>
                    <Text style={{ color: COLORS.black, fontSize: 18 }}>
                        {item.title}
                    </Text>
                    <Text style={{ color: COLORS.black, fontSize: 13 }}>
                         {item.content}
                    </Text>
                    <Text style={{ color: COLORS.black, fontSize: 13 }}>
                        Last Reply:  {item.last_reply?.name}
                    </Text>
                </View>
                <View style={{ padding: 5, backgroundColor: COLORS.primary, borderRadius: 10, width: 80, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    {item.status === 'open'  ? (
                        <TouchableOpacity onPress={() => navigation.navigate('ReplyTicket', item)}>
                            <Text style={{ color: COLORS.white, fontSize: 13 }}>
                                Balas
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ color: COLORS.white, fontSize: 13 }}>
                            {item.status}
                        </Text>
                    )}
                </View>
            </View>
            <View style={{ backgroundColor: COLORS.black, width: '100%', height: 1 }}></View>
        </View>
    );
}

const ContactUsRoute = () => {
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
            const response = await axios.get(`${url}contactus`);
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

    return (
        <View style={[styles.routeContainer, {
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite
        }]}>
            <HelpCenterItem
                icon={icons.headset}
                title="Customer Service"
                onPress={() => handleOpenURL(contactus.customer_service)}
            />
            <HelpCenterItem
                icon={icons.whatsapp}
                title="Whatsapp"
                onPress={() => handleOpenURL(contactus.whatsapp)}
            />
            <HelpCenterItem
                icon={icons.world}
                title="Website"
                onPress={() => handleOpenURL(contactus.website)}
            />
            <HelpCenterItem
                icon={icons.facebook2}
                title="Facebook"
                onPress={() => handleOpenURL(contactus.facebook)}
            />
            <HelpCenterItem
                icon={icons.twitter}
                title="Twitter"
                onPress={() => handleOpenURL(contactus.twitter)}
            />
            <HelpCenterItem
                icon={icons.instagram}
                title="Instagram"
                onPress={() => handleOpenURL(contactus.another)}
            />
        </View>
    )
}

const HelpCenter = ({ navigation }) => {
    const { dark, colors } = useTheme();
    const [activeTab, setActiveTab] = useState('faq');

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
                }]}>Help Center</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>  
            <View style={[styles.container, { backgroundColor: colors.background }]}>  
                {renderHeader()}  

                {/* Tab Buttons */}
                <View style={styles.tabContainer}>
                    {[
                        { key: 'faq', title: 'FAQ' },
                        { key: 'ticket', title: 'Ticket' },
                        { key: 'contact', title: 'Contact Us' }
                    ].map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tabButton, activeTab === tab.key && styles.activeTab]}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <Text style={activeTab === tab.key ? styles.activeText : styles.inactiveText}>
                                {tab.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                {activeTab === 'faq' && <FaqsRoute />}
                {activeTab === 'ticket' && <TicketRoute />}
                {activeTab === 'contact' && <ContactUsRoute />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    routeContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 22,
        paddingLeft:20,
        paddingRight:20
    },
    area: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.greyscale200,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: COLORS.primary,
    },
    activeText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    inactiveText: {
        color: 'gray',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },


    floatingButton: {
        position: 'absolute',
        bottom: 90,
        left: 30,
        backgroundColor: COLORS.primary,
        width: 150,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        flexDirection: 'row',
    },
    floatingButtonText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 10,
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
        paddingVertical: 22,
        
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
});

export default HelpCenter;
