import { View, Text, SafeAreaView, StyleSheet, TextInput, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import COLORS from '../../const/color'
import Icon from 'react-native-vector-icons/MaterialIcons'
import bookings from '../../const/bookings'
import country from '../../const/country'
import profils from '../../const/profils'
import RadioGroup from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown'
import {Picker} from '@react-native-picker/picker';
import { BASE_URL } from '../../config'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import ModalSelector from 'react-native-modal-selector';


const CheckoutBooking = ({ navigation, route }) => {
    console.log('route', route.params)
    
    const code = route.params.code ? route.params.code : route.params.booking_code;
    const url = BASE_URL;
    const [gateway, setgateway] = useState({})
    const [booking, setbooking] = useState({})
    const [profil, setprofil] = useState({})
    
    const [isLoading, setIsLoading] = useState(false);
    console.log('booking', booking)

    useEffect(()=> {
    
        const gateways = async () =>{
    
            try {
                let userInfo = await AsyncStorage.getItem('userInfo');
                userInfo = JSON.parse(userInfo);
                let token = userInfo.access_token.split('|')[1]
                  const response = await axios.get(`${url}gateways`,{
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });

                console.log('response GATEWAY',response.data)
                setgateway(response.data)
            } catch (error) {
                console.error(error);
            }
        }
    
        const bookings = async () =>{
    
            try {
                let userInfo = await AsyncStorage.getItem('userInfo');
                userInfo = JSON.parse(userInfo);
                let token = userInfo.access_token.split('|')[1]
                  const response = await axios.get(`${url}booking/${code}`,{
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });

                console.log('response booking',response.data)
                setbooking(response.data.booking)
            } catch (error) {
                console.error(error);
            }
        }
        
        const profils = async () => {
            console.log('codes', code)

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]

            axios
            .get(`${BASE_URL}auth/me`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setprofil(res.data.data)
                console.log('profiles',res.data.data )
                
                setCheckoutData({
                    code: code,
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    email: res.data.data.email,
                    phone: res.data.data.phone,
                    country: res.data.data.country,
                    term_conditions: "on",
                    payment_gateway: ""
                })
                setSelectedCountry(res.data.data.country)

            })
            .catch((err) => {
                console.log('error login', err);
            });
        };

        profils()
        bookings();
        gateways();

    },[]);

    console.log('gateway',gateway)


    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
      };
    


    const radioButtons = Object.keys(gateway)
        .filter(key => key !== "status")
        .map(key => ({
            id: key,
            label: gateway[key].name,
            color: '#ffffff',
        }));

    const [selectedId, setSelectedId] = useState();

    
    const countrys = country;
    const [selectedCountry, setSelectedCountry] = useState(profil.country);
    const countryOptions = Object.keys(country).map(countryCode => (
      <Picker.Item
        key={countryCode}
        label={country[countryCode]}
        value={countryCode}
      />
    ));

    const countryOptionss = Object.keys(countrys).map(countryCode => ({
        key: countryCode,
        label: countrys[countryCode], // Nama negara
        value: countryCode, // Kode negara
      }));  
      const defaultLabel =
      country[profil.country] || "Select Country"; 

    const [checkoutData, setCheckoutData] = useState({
        code: code,
        first_name: profil.first_name,
        last_name: profil.last_name,
        email: profil.email,
        phone: profil.phone,
        country: profil.country,
        term_conditions: "on",
        payment_gateway: ""
    });

    const [CouponData, setCouponData] = useState({
        coupon_code: ""
    });
    const handleCouponChange = (key, value) => {
        setCouponData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    
    const handleCoupon = () => {
        
            console.log('CouponData', CouponData.coupon_code);
        if (CouponData.coupon_code !== null && CouponData.coupon_code  !== '') {
            doCheckCoupount(CouponData)
        } else {
            // Handle jika ada properti yang null atau string kosong
            alert('Please fill in all required fields.');
        }
    };
    
    const doCheckCoupount = async (CouponData) =>{
    
        try {
            setIsLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]
              const response = await axios.post(`${url}booking/${code}/apply-coupon`,{coupon_code: CouponData.coupon_code},{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
             
           

            console.log('responses doCheckCoupount',response.data)
            setIsLoading(false);
            alert(response.data.message)
            bookings();
        } catch (error) {
            console.error(error);
        }
    }
    const bookings = async () =>{
    
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]
              const response = await axios.get(`${url}booking/${code}`,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

            console.log('response booking',response.data)
            setbooking(response.data.booking)
        } catch (error) {
            console.error(error);
        }
    }
    const handleInputChange = (key, value) => {
        setCheckoutData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };
    
    const handleRadioChange = (id) => {
        setSelectedId(id);
        handleInputChange('payment_gateway', id); // Menyimpan nilai radio button ke dalam objek checkoutData
    };
    const handleSelectChange = (id) => {
        console.log(id)
        setSelectedCountry(id);
        handleInputChange('country', id); // Menyimpan nilai radio button ke dalam objek checkoutData
    };

    const doCheckout = async (checkoutData) =>{
    
        try {
            setIsLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]
              const response = await axios.post(`${url}booking/doCheckout`,checkoutData,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              setIsLoading(false);

            console.log('responses',response.data)
            console.log('response',response.data.url)
            if(response.data.url){
                navigation.navigate('WebViews',response.data.url);
            }else{
                alert(response.data.message)
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleCheckout = () => {
        const isValid = Object.values(checkoutData).every(value => value !== null && value !== '');

        if (isValid) {
            console.log('checkoutData', checkoutData);
            doCheckout(checkoutData)
        } else {
            // Handle jika ada properti yang null atau string kosong
            alert('Please fill in all required fields.');
        }
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor={COLORS.primary} />
      <Spinner visible={isLoading} />

            <View style={style.header}>
                <View>
                    <View style={{ flexDirection: 'row', top: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack} />
                            <Text style={{ fontSize: 28, color: COLORS.white }}>Checkout</Text>
                        </View>
                        <Text style={{ fontSize: 28, color: COLORS.white, marginLeft: 10 }}>
                            Page
                        </Text>
                    </View>
                </View>
            </View>


            <View style={{ alignItems: 'center', top: 10 }}>
                <View style={{
                    backgroundColor: COLORS.secondary,
                    width: '90%',
                    borderRadius: 10,
                    padding: 10
                }}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>First Name</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark,height:50, width: 350  }}
                            defaultValue={profil.first_name}
                            onChangeText={(value) => handleInputChange('first_name', value)}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Last Name</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark,height:50, width: 350 }}
                            defaultValue={profil.last_name}
                            onChangeText={(value) => handleInputChange('last_name', value)}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Email</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark,height:50, width: 350 }}
                            defaultValue={profil.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Phone</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark,height:50, width: 350 }}
                            defaultValue={profil.phone}
                            onChangeText={(value) => handleInputChange('phone', value)}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Country</Text>
                       
                                    <ModalSelector
                                    data={countryOptionss}
                                    initValue={defaultLabel}
                                    onChange={(option) => setSelectedCountry(option.value)}
                                    style={{
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        color:COLORS.dark
                                    }}
                                    selectTextStyle={{
                                        color: COLORS.dark,
                                    }}
                                    />
                      {/* <Picker
                            style={{backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark,height:50, width: 350}}
                            selectedValue={selectedCountry}
                            onValueChange={handleSelectChange}>
                            {countryOptions}
                        </Picker> */}
                    </View>
                </View>

            </View>
            <View style={{ alignItems: 'center', top: 20 }}>
                <View style={{
                    backgroundColor: COLORS.secondary,
                    width: '90%',
                    borderRadius: 10,
                    padding: 10
                }}>
                   
                <View style={{ marginTop: 5 }}>
                <View style={{ marginTop: 10 }}>
                     <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>COUPON</Text>
                     <TextInput
                         style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark,height:50, width: 350 }}
                         onChangeText={(value) => handleCouponChange('coupon_code', value)}
                     />
                     <Text style={{ color: COLORS.white, fontSize: 15,marginTop:5, marginBottom: 15, marginLeft: 5, fontWeight: 'bold' }}>{formatPrice(booking.coupon_amount)}</Text>
                             <TouchableOpacity activeOpacity={0.8} onPress={handleCoupon}>
                                 <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                                     <Text style={{ ...style.title, color: COLORS.white }} >Check Coupon</Text>
                                 </View>
                                 </TouchableOpacity>
                 </View>
                     
                 </View>
                   
                   <View style={{ marginTop: 5 }}>
                   <View style={{ marginTop: 10 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Point Credit</Text>
                        <TextInput
                            style={{ backgroundColor: COLORS.white, borderRadius: 10, color: COLORS.dark,height:50, width: 350 }}
                            defaultValue='0'
                            onChangeText={(value) => handleInputChange('credit', value)}
                        />
                        <Text style={{ color: COLORS.white, fontSize: 15,marginTop:5, marginBottom: 15, marginLeft: 5, fontWeight: 'bold' }}>{formatPrice(profil.credit_balance)}</Text>
                             
                    </View>
                        
                    </View>
                </View>

            </View>

            {booking.service && (
                <View style={{ alignItems: 'center', top: 30, paddingBottom:20 }}>
                <View style={{
                    backgroundColor: COLORS.secondary,
                    width: '90%',
                    borderRadius: 10,
                    padding: 10
                }}>
                   
                   <View style={{ marginTop: 5 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 15, marginLeft: 5, fontWeight: 'bold' }}>Info Booking</Text>
                        <Text style={{ color: COLORS.white, fontSize: 20, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>{booking.service? booking.service.title : ''}</Text>
                        <Text style={{ color: COLORS.white, fontSize: 20, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>{formatPrice(booking.total)}</Text>
                        <Text style={{ color: COLORS.white, fontSize: 20, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>{booking.start_date}</Text>
                        
                    </View>
                </View>

            </View>
            ) }
            

            <View style={{ alignItems: 'center', top: 30 }}>
                <View style={{
                    backgroundColor: COLORS.secondary,
                    width: '90%',
                    borderRadius: 10,
                    padding: 10
                }}>
                   
                   <View style={{ marginTop: 5 }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Payment Gateway</Text>
                        <RadioGroup 
                            buttonOuterColor='#ffffff' 
                            buttonInnerColor='#ffffff' 
                            labelStyle={{color:COLORS.white}}
                            containerStyle={{alignItems:'flex-start'}}
                            layout='column'
                            radioButtons={radioButtons} 
                            onPress={handleRadioChange}
                            selectedId={selectedId}
                        />
                    </View>
                </View>

            </View>

            <View style={{ marginHorizontal: 30, top:40, marginBottom:50 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleCheckout}>
                  <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                    <Text style={{ ...style.title, color: COLORS.white }} >Checkout</Text>
                  </View>
                </TouchableOpacity>
              </View>


        </ScrollView>
    )
}

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        paddingBottom: 15
    },
    title: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 },
    btnContainer: {
      backgroundColor: COLORS.primary,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },

})
export default CheckoutBooking