import { View, Platform, Image, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { COLORS, FONTS, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import MainPage from '../views/screens/MainPage';
import Home from '../screens/Home';
import Services from '../views/services/Services';
import ProfileScreen from '../views/screens/ProfileScreen';
import Profile from '../screens/Profile';
import BookingScreen from '../views/screens/BookingScreen';
import InboxScreen from '../views/screens/InboxScreen';
import HomeNewScreen from '../views/new/HomeNewScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CekInOnline from '../screens/CekinOnline';
import Profil from '../views/new/Profil/Profil';
import TransactionPpob from '../views/new/TransactionPpob/TransactionPpob';
import CekInOnlineTab from '../views/new/cekin/CekInOnlineTab';
import BookingPage from '../views/booking/BookingPage';

const Tab = createBottomTabNavigator();

// Drawer Navigator

const BottomTabNavigation = () => {
    const { dark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    paddingTop:10,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: Platform.OS === 'ios' ? 90 : 60,
                    backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                    borderTopColor: COLORS.dark1,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNewScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                            <Icon name="house" size={25} color={focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3} />
                            
                            <Text style={{
                                ...FONTS.body4,
                                color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                                width:95,textAlign: "center",
                            }}>Home</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="BookingScreen"
                component={BookingPage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                        <Icon name="bookmark" size={25} color={focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3} />

                            <Text style={{
                                ...FONTS.body4,
                                color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                                width:95,textAlign: "center",
                            }}>Pesanan</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="CekInOnline"
                component={CekInOnlineTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                        <Icon name="edit-calendar" size={25} color={focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3} />
                            <Text style={{
                                ...FONTS.body4,
                                color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                                width:95,textAlign: "center",
                            }}>Aktivitas</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={TransactionPpob}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                        <Icon name="shopping-bag" size={25} color={focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3} />
                            <Text style={{
                                ...FONTS.body4,
                                color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                                width:95,textAlign: "center",
                            }}>Transaksi</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profil}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                        <Icon name="person" size={25} color={focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3} />
                            <Text style={{
                                ...FONTS.body4,
                                color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                                width:95,textAlign: "center",
                            }}>Profil</Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigation