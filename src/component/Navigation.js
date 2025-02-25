import { View, Text,StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutBooking from "../views/services/CheckoutBooking";
import BookingPage from "../views/booking/BookingPage";
import LoginScreen from "../views/screens/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import DetailScreen from "../views/screens/DetailScreen";
import OnBoardScreen from "../views/screens/OnBoardScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialIcons";
import ProfileScreen from "../views/screens/ProfileScreen";
import BookingScreen from "../views/screens/BookingScreen";
import MainPage from "../views/screens/MainPage";
import Services from '../views/services/Services';
import COLORS from '../const/color';
import WebViews from '../views/services/WebViews';
import WebViewUrl from '../views/services/WebViewUrl';
import CheckAvailability from '../views/services/CheckAvailability';
import { AuthContext } from '../context/AuthContext';
import RegisterScreen from '../views/screens/RegisterScreen';
import MenuPage from '../views/screens/MenuPage';
import { Onboarding1, Onboarding2, Onboarding3, Onboarding4 } from '../screens';
import Home from '../screens/Home';
import { useTheme } from '../theme/ThemeProvider';
import BottomTabNavigation from '../components/BottomTabNavigation';
import Profile from '../screens/Profile';
import HelpCenter from '../screens/HelpCenter';
import SubMenu from '../screens/SubMenu';
import CekInOnline from '../screens/CekinOnline';
import AddCekinOnline from '../screens/AddCekinOnline';
import ForgotPassword from '../screens/ForgotPassword';
import Notifications from '../screens/Notifications';
import Chat from '../views/screens/Chat';
import AddGroup from '../views/screens/AddGroup';
import ListFriendGroup from '../views/screens/ListFriendGroup';
import DetailHotel from '../views/new/DetailHotel/DetailHotel';
import SearchHotel from '../views/new/SearchHotel/SearchHotel';
import Profil from '../views/new/Profil/Profil';
import CouponList from '../views/new/coupon/CouponList';
import UpdateProfil from '../views/new/Profil/UpdateProfil';
import TopUp from '../views/new/TopUp/TopUp';
import TransaksiTopUp from '../views/new/TopUp/TransaksiTopUp';
import PaketData from '../views/new/TopUp/PaketData/PaketData';
import MasaAktif from '../views/new/TopUp/MasaAktif/MasaAktif';
import Roaming from '../views/new/TopUp/Roaming/Roaming';
import TransferPulsa from '../views/new/TopUp/TransferPulsa/TransferPulsa';
import Pascabayar from '../views/new/TopUp/Pascabayar/Pascabayar';
import BayarPpob from '../views/new/BayarPpob/BayarPpob';
import DetailBayar from '../views/new/BayarPpob/Pascabayar/DetailBayar';
import SemuaPpob from '../views/new/SemuaPpob/SemuaPpob';
import VoucherPpob from '../views/new/Voucher/VoucherPpob';
import DetailVoucher from '../views/new/Voucher/Pascabayar/DetailVoucher';
import GamePpob from '../views/new/Games/GamePpob';
import DetailGame from '../views/new/Games/Pascabayar/DetailGame';
import PageTransaction from '../views/new/TransactionPpob/PageTransaction';
import InboxScreen from '../views/screens/InboxScreen';
import Ticket from '../views/new/Ticket/Ticket';
import Pesawat from '../views/new/Ticket/Pesawat/Pesawat';
import ListPesawat from '../views/new/Ticket/Pesawat/ListPesawat';
import BookingPesawat from '../views/new/Ticket/Pesawat/BookingPesawat';
import RatingReview from '../views/new/RatingReview/RatingReview';
import OpenDoorLock from '../views/new/cekin/OpenDoorLock';
import OnOfLight from '../views/new/cekin/OnOfLight';
import HistoryCredit from '../views/new/Profil/HistoryCredit';
import AddTicket from '../screens/AddTicket';
import ReplyTicket from '../screens/ReplyTicket';
import CodeReferral from '../views/new/Profil/CodeReferral';
import ListProduct from '../views/ProductFood/ListProduct';
import DetailProduct from '../views/ProductFood/DetailProduct';
import ShopCart from '../views/ProductFood/ShopCart';
import AddAddress from '../views/ProductFood/AddAddress';
import TransactionList from '../views/ProductFood/TransactionList';
import ListDoorLockRemote from '../views/new/cekin/ListDoorLockRemote';
import ListRemote from '../views/new/cekin/ListRemote';
import RemoteTv from '../views/new/cekin/RemoteTv';
import RemoteAc from '../views/new/cekin/RemoteAc';



const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          // Tentukan ikon berdasarkan nama rute
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "MenuPage") {
            iconName = "list";
          }  else if (route.name === "SouvenirScren") {
            iconName = "store";
          }  else if (route.name === "DompetScreen") {
            iconName = "wallet";
          }  else if (route.name === "BookingScreen") {
            iconName = "menu-book";
          } 

          // Kembalikan komponen Ionicons dengan nama ikon yang sesuai
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderRadius:30,
          overflow: 'hidden', // pastikan ini ditambahkan untuk memastikan sudut radius diterapkan dengan benar
          position: 'absolute',
          bottom: 6,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
        },
      })}
    >
      <Tab.Screen name="Home" options={{title:'Home'}}  component={Home} />
      <Tab.Screen name="BookingScreen" options={{title:'Booking'}} component={BookingScreen} />
      <Tab.Screen name="MenuPage" options={{title:'Menu'}} component={MenuPage} />
    </Tab.Navigator>
  );
}



const Navigation = () => {
    const {userInfo,IsVerif,emailverif} = useContext(AuthContext);
   
    console.log('userInfo APPs', userInfo)
    console.log('IsVerif APPs', emailverif)
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle='dark-content' />
      <Stack.Navigator screenOptions={{headerShown: false}}>
      {userInfo && userInfo.access_token  ? (
       

       <Stack.Screen name="OnBoardScreen" component={OnBoardScreen}/>
        ) :
        (
          <Stack.Screen name="OnBoardScreen" component={Onboarding1}/>

        )
      }
       

        {userInfo && userInfo.access_token  ? (
       

          <Stack.Screen name="LoginScreen" component={BottomTabNavigation} />
          // <Stack.Screen name="LoginScreen" component={TabNavigator} />
        ) :
        (
          <Stack.Screen name="LoginScreen" component={LoginScreen}/>

        )
      }
      {userInfo && userInfo.access_token  ? (
            <Stack.Screen name="RegisterScreen" component={BottomTabNavigation}/>

            ) :
            (
              <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>

            )
          }
          
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Onboarding2" component={Onboarding2}/>
        <Stack.Screen name="Onboarding3" component={Onboarding3}/>
        <Stack.Screen name="Onboarding4" component={Onboarding4}/>
        <Stack.Screen name="BookingScreen" component={BookingScreen}/>
            <Stack.Screen name="MainTab" component={BottomTabNavigation} />
            <Stack.Screen name="MainPage" component={SearchHotel} />
            <Stack.Screen name="ProfileScreen" component={UpdateProfil}/>
        <Stack.Screen name="DetailScreen" component={DetailHotel}/>
        <Stack.Screen name="Services" component={Services}/>
        <Stack.Screen name="CheckAvailability" component={CheckAvailability}/>
        <Stack.Screen name="WebViews" component={WebViews}/>
        <Stack.Screen name="WebViewUrl" component={WebViewUrl}/>
        <Stack.Screen name="CheckoutBooking" component={CheckoutBooking}/>
        <Stack.Screen name="BookingPage" component={BookingPage}/>
        <Stack.Screen name="MenuPage" component={MenuPage}/>
        <Stack.Screen name="Profile" component={Profil}/>
        <Stack.Screen name="HelpCenter" component={HelpCenter}/>
        <Stack.Screen name="SubMenu" component={SubMenu}/>
        <Stack.Screen name="CekInOnline" component={CekInOnline}/>
        <Stack.Screen name="AddCekinOnline" component={AddCekinOnline}/>
        <Stack.Screen name="Notifications" component={Notifications}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="AddGroup" component={AddGroup}/>
        <Stack.Screen name="ListFriendGroup" component={ListFriendGroup}/>
        <Stack.Screen name="Kupon" component={CouponList}/>
        <Stack.Screen name="TopUp" component={TopUp}/>
        <Stack.Screen name="TransaksiTopUp" component={TransaksiTopUp}/>
        <Stack.Screen name="PaketData" component={PaketData}/>
        <Stack.Screen name="MasaAktif" component={MasaAktif}/>
        <Stack.Screen name="Roaming" component={Roaming}/>
        <Stack.Screen name="TransferPulsa" component={TransferPulsa}/>
        <Stack.Screen name="Pascabayar" component={Pascabayar}/>
        <Stack.Screen name="BayarPpob" component={BayarPpob}/>
        <Stack.Screen name="DetailBayar" component={DetailBayar}/>
        <Stack.Screen name="SemuaPpob" component={SemuaPpob}/>
        <Stack.Screen name="VoucherPpob" component={VoucherPpob}/>
        <Stack.Screen name="DetailVoucher" component={DetailVoucher}/>
        <Stack.Screen name="GamePpob" component={GamePpob}/>
        <Stack.Screen name="DetailGame" component={DetailGame}/>
        <Stack.Screen name="PageTransaction" component={PageTransaction}/>
        <Stack.Screen name="InboxScreen" component={InboxScreen}/>
        <Stack.Screen name="Ticket" component={Ticket}/>
        <Stack.Screen name="Pesawat" component={Pesawat}/>
        <Stack.Screen name="ListPesawat" component={ListPesawat}/>
        <Stack.Screen name="BookingPesawat" component={BookingPesawat}/>
        <Stack.Screen name="RatingReview" component={RatingReview}/>
        <Stack.Screen name="OpenDoorLock" component={OpenDoorLock}/>
        <Stack.Screen name="OnOfLight" component={OnOfLight}/>
        <Stack.Screen name="HistoryCredit" component={HistoryCredit}/>
        <Stack.Screen name="AddTicket" component={AddTicket}/>
        <Stack.Screen name="ReplyTicket" component={ReplyTicket}/>
        <Stack.Screen name="CodeReferral" component={CodeReferral}/>

        <Stack.Screen name="ListProduct" component={ListProduct}/>
        <Stack.Screen name="DetailProduct" component={DetailProduct}/>
        <Stack.Screen name="ShopCart" component={ShopCart}/>
        <Stack.Screen name="AddAddress" component={AddAddress}/>
        <Stack.Screen name="TransactionList" component={TransactionList}/>
        <Stack.Screen name="ListDoorLockRemote" component={ListDoorLockRemote}/>
        <Stack.Screen name="ListRemote" component={ListRemote}/>
        <Stack.Screen name="RemoteTv" component={RemoteTv}/>
        <Stack.Screen name="RemoteAc" component={RemoteAc}/>

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation