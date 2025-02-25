import { View, Text, SafeAreaView, StyleSheet,StatusBar, ScrollView,ImageBackground, TextInput, TouchableOpacity, FlatList,Dimensions, Image,Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../const/color'
import places from '../../const/places'
import axios from 'axios';
import { BASE_URL } from '../../config'
const {width} = Dimensions.get("screen"); 
const cardwidht = width / 1.8;
import Spinner from 'react-native-loading-spinner-overlay'
import { addDays } from 'date-fns';
import DatePickerInput from '../../component/DatePickerInput';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/AuthContext'
import ModalDataDiri from '../../component/ModalDataDiri'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalOtpShow from '../../component/ModalOtpShow'


const MainPage = ({navigation}) => {
    const categories = [ 'Hotel'];
    const [selectedCategory, setselectedCategory] = React.useState(0);

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(false);

    const url = BASE_URL;
    const [hotels, sethotels] = useState([])
    const [listHotelArray, setlistHotelArray] = useState([])
    const [listRecomendedArray, setlistRecomendedArray] = useState([])
    const [modalDataDiri, setModalDataDiri] = useState(false);
    const [ModalOtp, setModalOtp] = useState(false);
  
      const profils = async (cekverif) => {
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
              let userData = res.data;
              console.log('cekverif', cekverif)
              console.log('userData.data.email_verified_at', userData.data)
  
  
              if(cekverif.val == 1  && userData.data.email_verified_at == '-' ){
                  setModalDataDiri(true)
              }else{
                  setModalDataDiri(false)
              }
  
              if ((userData.data.is_otp === 0 || userData.data.is_otp === null) && userData.data.setting_otp_apps === '1') {
                  setModalOtp(true);
              }else{
                  setModalOtp(false)
              }
            })
            .catch((err) => {
              console.log('error login', err);
            });
        };
      
  
      
      const {userInfo} = useContext(AuthContext);
  
    const cekverif = async (token) => {
      axios
        .get(`${BASE_URL}cek_validasi_email`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          let cekverif = res.data.data;
          profils(cekverif);
        })
        .catch((err) => {
          console.log('error login', err);
        });
    };
  
    
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        cekverif();
       
      });
  
      // Hapus listener ketika komponen tidak lagi dipakai
      return unsubscribe;
    }, [navigation]);
  
  
  
    
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    adults: '1',
    childs: '',
    locations: '',
  });
  
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

    const [location, setlocation] = useState([])
    const getLocations = async () =>{

        try {
            const response = await axios.get(`${url}locations`);
            setlocation(response.data.data)
            
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        getLocations();
        cekverif();
       
      }, []);

    useEffect(()=> {
    
        const getUser = async () =>{
            setIsLoading(true);
    
            try {
                const response = await axios.get(`${url}home-page`);
                sethotels(response.data)
                    setIsLoading(false);
                
            } catch (error) {
                console.error(error);
                setIsLoading(false);

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

            // recomended
            const listRecomendedArrays = hotels.data.filter(item => item.type === "list_locations");
            const RecomendedModels = listRecomendedArrays.map(item => item.model.data);
            // console.log('Recomended', RecomendedModels);
            
    
            setlistRecomendedArray(RecomendedModels[0]);
        }

    }, [hotels]);

    const categoryfilter=(index) => {
        setselectedCategory(index);
            if (hotels && hotels.data && hotels.data.length > 0) {
                let listHotelArrays;
                if (index == 0) {
                    listHotelArrays = hotels.data.filter(item => item.type === "list_hotel");
                } 
                const hotelModels = listHotelArrays.map(item => item.model.data);
                console.log('index', index);
                
        
                setlistHotelArray(hotelModels[0]);
            }
    }
    const CategoryList = () => {
        return (
            <View style={styles.CategoryListContainer}>
                {categories.map((item, index)=> (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => categoryfilter(index)}>
                        <View><Text style={{...styles.categorytext, color: selectedCategory == index? COLORS.primary : COLORS.grey}}>{item}</Text></View>
                        {selectedCategory == index && (
                            <View style={{height:3, width:30, backgroundColor:COLORS.primary, marginTop: 2}}></View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
    const renderStars = (score) => {
        const totalStars = 5;
        const filledStars = Math.floor(score);
        const stars = [];
    
        for (let i = 0; i < filledStars; i++) {
            stars.push(
                <Icon key={`filled_${i}`} name='star' size={15} color={COLORS.orange} />
            );
        }
    
        if (score - filledStars >= 0.5) {
            stars.push(
                <Icon key={`half_star`} name='star-half' size={15} color={COLORS.orange} />
            );
        }
    
        const emptyStars = totalStars - filledStars - (score - filledStars >= 0.5 ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Icon key={`empty_${i}`} name='star' size={15} color={COLORS.grey} />
            );
        }
    
        return (
            <View style={{flexDirection: 'row'}}>
                {stars}
            </View>
        );
    }

    const Card = ({hotel, index}) => {
        const inputRange = [
            (index - 1) * cardwidht,
            index * cardwidht,
            (index + 1) * cardwidht,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0, 0.7],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
          });
          const formatPrice = (price) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
          };

        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("DetailScreen", hotel )}>
            <Animated.View style={{...styles.card,transform: [{scale}]}}>
                <Animated.View style={{...styles.overLayCard, opacity}} />
                <View style={styles.priceTag}>
                    <Text style={{color:COLORS.white, fontSize: 20, fontWeight:'bold'}}>  {formatPrice(hotel.price)}</Text>
                </View>
                <Image source={{uri: hotel && hotel.image }} style={styles.cardimage} />
                <View style={styles.cardDetails}>
                   <View>
                        <Text style={{fontWeight: 'bold', fontSize: 17, color:COLORS.dark}}>{hotel.title}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 12, color:COLORS.grey}}>{hotel.location?.name}</Text>
                    </View>
                   <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                   
                    {renderStars(hotel.review_score.score_total)}
                    <Text style={{fontSize: 10, color:COLORS.grey}}>{hotel.review_score.total_review} reviews</Text>
                   </View>
                </View>
            </Animated.View>
            </TouchableOpacity>
        )
    } 
    

    const RecomendedCard = ({place}) => {
        return <ImageBackground style={styles.recomendedcardImage} source={{uri: place && place.image }}>
            <Text style={{color:COLORS.white, fontSize:22, fontWeight: 'bold', marginTop:10}}>{place.title}</Text>
            <View style={{ flexDirection: 'row', marginTop:10}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="place" size={20} color={COLORS.white} />
                    <Text style={{marginLeft: 5, color:COLORS.white}}>{place.location}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Text style={{marginLeft: 5, color:COLORS.white}}>5.0</Text>
                </View>
            </View>
        </ImageBackground>
    }
    const handleSearch = () => {
        console.log('Form Data:', formData);
        if(!formData.locations ){
            alert('Location Is Required.');
            return;
        }
        navigation.navigate('Services',formData )
    };




    // SETTING VERIFICATION EMAIL
 

  const resendemail = async () => {
    try {
        let users = await AsyncStorage.getItem('userInfo');
        users = JSON.parse(users);
        let token = users.access_token.split('|')[1]

        console.log('token', token)

        const response = await axios.post(`${url}email/resend`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('xekdata', response.data)
       if(response.data.messages == 'OK'){
        alert('Already Sent ')
       }

    } catch (error) {
        console.error(error);
    }
}
const Resends = () => {
    resendemail()
    
  };
  const cekemail = async () => {
    try {
        let users = await AsyncStorage.getItem('userInfo');
        users = JSON.parse(users);
        let token = users.access_token.split('|')[1]
        const response = await axios.get(`${url}auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('response', response.data)
        if(response.data.data.email_verified_at != '-'){
            userInfo
            alert('Check Success ')
            setModalDataDiri(false)
        }else{
            alert('Not Verified ')
        }

       
    } catch (error) {
        console.error(error);
    }
}

  const Checkemail = () => {
        cekemail()
      
    };
    // SETTING VERIFICATION EMAIL


    // OTP

    

  const resend_otp = async () => {
    try {
        let users = await AsyncStorage.getItem('userInfo');
        users = JSON.parse(users);
        let token = users.access_token.split('|')[1]


        const response = await axios.get(`${url}resend-otp`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('token', response.data)

        alert(response.data.message)

    } catch (error) {
        console.error(error);
    }
}
const ResendOtp = () => {
    resend_otp()
    
  };
  const [OtpInput, setOtpInput] = useState({
        otp: ""
    });
    const handleOtpChange = (key, value) => {
        setOtpInput(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

  const chekOtp = async (OtpInput) => {
    try {
        let users = await AsyncStorage.getItem('userInfo');
        users = JSON.parse(users);
        let token = users.access_token.split('|')[1]

        const response = await axios.post(`${url}validate-otp`,{otp : OtpInput.otp} ,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('response', response.data)
        if(response.data.error != true){
            setModalOtp(false)
        }
        
        alert(response.data.message)


       
    } catch (error) {
        console.error(error);
    }
}

  const CheckOTP = () => {
    if (OtpInput.otp !== null && OtpInput.otp  !== '') {
        chekOtp(OtpInput)
    } else {
        // Handle jika ada properti yang null atau string kosong
        alert('Please fill in all required fields.');
    }
      
    };

    // OTPEND
    const handleCloseModal = () => {
        // Function to handle closing modal and navigating to MainPage
        setModalOtp(false); // Close the modal
        navigation.navigate('OnBoardScreen'); // Navigate to MainPage
      };
  return (
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.white}}>
      <StatusBar translucent backgroundColor={COLORS.primary}/>
      <Spinner visible={isLoading} />

      <ModalDataDiri visible={modalDataDiri} Checkemail={Checkemail} Resends={Resends} onClose={handleCloseModal} />
      <ModalOtpShow visible={ModalOtp} Checkemail={CheckOTP} Resends={ResendOtp} handleOtpChange={handleOtpChange}  onClose={handleCloseModal}/>

      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>Cozzy</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>Hallo, {userInfo?.user.first_name}</Text>
        </View>
        {/* <Icon name="notifications-none" size={25} color={COLORS.white} /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{alignItems:'center', top:10}}>
            <View style={{
                backgroundColor: COLORS.white,
                borderRadius: 10,
                elevation: 10,
                height: 350,
                borderColor:COLORS.dark,
                borderWidth:1
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                
                <View style={styles.inputContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={formData.locations}
                        onValueChange={(itemValue) => handleInputChange('locations', itemValue)}
                        style={styles.picker}
                        >
                            {/* buat picker item dari api locations */}
                            <Picker.Item label="Choose Location" value="" />
                                {location.map((loc) => (
                                    <Picker.Item key={loc.id} label={loc.title} value={loc.id} />
                                ))}
                        </Picker>
                    </View>
                    </View>
            
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                
                <View>
                <Text style={{ color: COLORS.dark }} >Cek in</Text>
                <DatePickerInput type="start"
                onChange={(value) => handleInputChange('startDate', value)} defaultDate={formData.startDate}  />
                </View>
                <View>
                <Text style={{ color: COLORS.dark }}  >Cek Out</Text>
                <DatePickerInput type="end" 
                onChange={(value) => handleInputChange('endDate', value)} defaultDate={formData.endDate} 
                />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                <View>
                <Text style={{ color: COLORS.dark }} >Adults/Number</Text>
                <TextInput
                value={formData.adults}
                onChangeText={(value) => handleInputChange('adults', value)}
                keyboardType="numeric" 
                placeholder='0' 
                placeholderTextColor={COLORS.dark} 
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 10, width: 150, color: COLORS.dark }} />
                </View>
                <View>
                <Text style={{ color: COLORS.dark }}  >Child</Text>
                <TextInput
                value={formData.childs}
                onChangeText={(value) => handleInputChange('childs', value)}
                keyboardType="numeric" 
                placeholder='0' 
                placeholderTextColor={COLORS.dark} 
                defaultValue='1' 
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 10, width: 150, color: COLORS.dark }} />
                </View>
            </View>
            <View style={{ marginHorizontal: 30, top: 20 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleSearch}>
                <View style={{ ...styles.btnContainer, backgroundColor: COLORS.primary }}>
                    <Text style={{ ...styles.title, color: COLORS.white }} >Search</Text>
                </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>


        {/* <ListCategories /> */}

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <CategoryList />
                <View style={{justifyContent:'center', top:15}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("Services", null)} >
                        <Text  style={{ ...styles.categorytext, color: COLORS.primary, paddingRight:20 }}>More Hotel</Text>

                    </TouchableOpacity>
                </View>
            </View>


            <View>
                <Animated.FlatList
                snapToInterval={cardwidht}
                horizontal
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true},
                )}
                data={listHotelArray}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index}) => <Card hotel={item} index={index} />}
                contentContainerStyle={{paddingVertical: 30, paddingLeft: 20,paddingRight: cardwidht / 2-40}} />
        </View>
        

        <Text style={styles.sectionTitle}>Top Destination</Text>
        <FlatList contentContainerStyle={{paddingLeft: 20, paddingBottom:70}} showsHorizontalScrollIndicator={false} horizontal data={listRecomendedArray} renderItem={({item}) => <RecomendedCard place={item} />} /> 

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header:{
        paddingTop:20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor:COLORS.primary
    },
    input: {
        width: 360,
        height: 60,
        borderWidth: 1, borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        color:COLORS.dark
      },
    searchInputContainer:{
        height: 50,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryContainer:{
        marginTop: 60,
        marginHorizontal: 20,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    iconContainer: {
        height:60,
        width: 60,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    CategoryListContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30
    },
    categorytext:{
        fontSize: 17,
        fontWeight: 'bold',
    },
    card:{
        height: 280,
        width: cardwidht,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: COLORS.white
    },
    cardimage:{
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    priceTag:{
        height: 60,
        width: 160,
        backgroundColor:COLORS.primary,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardDetails:{
        height: 120,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%'
    },
    overLayCard:{
        height: 280,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: cardwidht,
        borderRadius: 15
    },
    recomendedcardImage:{
        height:200,
        width: width - 40,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10
    },
    recomendedcardImages:{
        height:150,
        width: width - 40,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10
    },
    sectionTitle:{
        marginHorizontal: 20,
        marginVertical: 20,
        fontSize:20,
        fontWeight: 'bold',
        color: COLORS.dark
    },
    btnContainer: {
        backgroundColor: COLORS.primary,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
      },

        pickerContainer: {
            borderWidth: 1,
            borderColor: COLORS.grey,
            borderRadius: 10,
        },
        picker: {
            height: 50,
            width:360,
            color: COLORS.dark,
        },
})
export default MainPage