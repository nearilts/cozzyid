import { PermissionsAndroid,View, Text, StyleSheet, Image, TouchableOpacity,Dimensions, TextInput, FlatList, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { COLORS, SIZES, icons, images } from "../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { ScrollView } from 'react-native-virtualized-view';
import { banners, categories, featuredHotels, recommendedHotels } from '../data';
import SectionHeader from '../components/SectionHeader';
import FeaturedHotelCard from '../components/FeaturedHotelCard';
import VerticalHotelCard from '../components/VerticalHotelCard';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { addDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDataDiri from '../component/ModalDataDiri';
import ModalOtpShow from '../component/ModalOtpShow';
import places from '../const/places';
import * as Notifications from 'expo-notifications';
const {width} = Dimensions.get("screen"); 
const cardwidht = width / 1.8;
const Home = ({ navigation }) => {


    useEffect(() => {
   const requestUserPermission = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Notification permission not granted.');
      return;
    }

    console.log('Notification permission granted');

    // Dapatkan token untuk push notifications
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

    requestUserPermission();
  }, []);

  const [tokenApps, settokenApps] = useState(null)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexs, setCurrentIndexs] = useState(0);
  const { dark, colors } = useTheme();
  /**
   * render header
   */


    const [isLoading, setIsLoading] = useState(false);
    const url = BASE_URL;
    const [hotels, sethotels] = useState([])
    const [listHotelArray, setlistHotelArray] = useState([])
    const [listFeatured, setlistFeatured] = useState([])
    const [listRecomendedArray, setlistRecomendedArray] = useState([])
    const [modalDataDiri, setModalDataDiri] = useState(false);
    const [ModalOtp, setModalOtp] = useState(false);
    const [Slider, setSlider] =  useState([]);
    const [Notifikasi, setNotifikasi] =  useState([]);
    const [users, setusers] = useState([])


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
          setusers(userData);

          if(cekverif.val == 1  && userData.data.email_verified_at == '-' ){
              setModalDataDiri(true)
          }else{
              setModalDataDiri(false)
          }
          console.log('userData.data.setting_otp_apps', userData.data.setting_otp_apps)

          if ((userData.data.is_otp === 0 || userData.data.is_otp === null) && (userData.data.setting_otp_apps === '1' || userData.data.setting_otp_apps === 1)) {
              setModalOtp(true);
          }else{
              setModalOtp(false)
          }

          console.log('TOkenApps users', userData.data.token_app)
          console.log('TOkenApps users tokenApps', tokenApps)
          if (tokenApps !== null && (tokenApps !== userData.data.token_app || userData.data.token_app === null) ) {
            console.log('TOkenApps users', userData.data.token_app)
            console.log('TOkenApps users tokenApps', tokenApps)
            updatetokenapp()
          }
        })
        .catch((err) => {
          console.log('error login', err);
        });
    };
  

    const updatetokenapp = async () => {
      try {
        // setIsLoading(true)
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        console.log('formData', formData);
  
        const response = await axios.post(`${url}update_token_app`, {
          token_app: tokenApps,
         
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setIsLoading(false)
  
        console.log('response', response.data);
        
      } catch (error) {
        console.error(error);
        setIsLoading(false)
      }
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
  if (tokenApps !== null) {
    // Call the profils function when tokenApps is updated
    cekverif();
  }
}, [tokenApps]);
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    cekverif();
    getnotif();
   
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

const getslider = async () =>{

  try {
      const response = await axios.get(`${url}slider`);
      setSlider(response.data.data.data)
      console.log("SLIDERS", response.data.data)
      setCurrentIndexs(0)
  } catch (error) {
      console.error(error);

  }
}

const getnotif = async () => {
  let userInfo = await AsyncStorage.getItem('userInfo');

  userInfo = JSON.parse(userInfo);
  let token = userInfo.access_token.split('|')[1]
  console.log('getnotif get_notif_user', token);
  axios
    .get(`${BASE_URL}get_notif_user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      let cekverif = res.data.data;
      setNotifikasi(cekverif);
      console.log('get_notif_user', cekverif);
    })
    .catch((err) => {
      console.log('error login', err);
    });
};


useEffect(() => {
    getLocations();
    cekverif();
    getslider();
    getnotif();
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


        const listFeaturedArrays = hotels.data.filter(item => item.type === "list_featured_item");
        const listFeaturedModels = listFeaturedArrays.map(item => item.model.list_item);
        setlistFeatured(listFeaturedModels[0]);
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
  alert('Harap isi semua kolom yang diperlukan.');
}

};

// OTPEND
const handleCloseModal = () => {
  // Function to handle closing modal and navigating to MainPage
  setModalOtp(false); // Close the modal
  navigation.navigate('OnBoardScreen'); // Navigate to MainPage
};




  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.viewLeft}>
          <Image
            source={images.logo}
            resizeMode='contain'
            style={styles.userIcon}
          />
          <View style={styles.viewNameContainer}>
            <Text style={styles.greeeting}>Hi... 👋</Text>
            <Text style={[styles.title, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{userInfo?.user.first_name}</Text>
          </View>
        </View>
        <View style={styles.viewRight}>
        <TouchableOpacity
             onPress={() => navigation.navigate("Notifications",Notifikasi)}
            >
            <Image
              source={icons.notificationBell2}
              resizeMode='contain'
              style={[styles.bellIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{Notifikasi.countUnread?? 0}</Text>
            </View>
          </TouchableOpacity>
          {/*
          <TouchableOpacity
             onPress={() => navigation.navigate("Favourite")}
            >
            <Image
              source={icons.bookmarkOutline}
              resizeMode='contain'
              style={[styles.bookmarkIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }

  /**
  * Render search bar
  */
  const renderSearchBar = () => {

    const handleInputFocus = () => {
      // Redirect to another screen
      navigation.navigate('MainPage');
    };

    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate("Search")}
        style={[styles.searchBarContainer, {
          backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite
        }]}>
        <TouchableOpacity>
          <Image
            source={icons.search2}
            resizeMode='contain'
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder='Search'
          placeholderTextColor={COLORS.black}
          style={styles.searchInput}
          onFocus={handleInputFocus}
        />
        {/* <TouchableOpacity>
          <Image
            source={icons.filter}
            resizeMode='contain'
            style={styles.filterIcon}
          />
        </TouchableOpacity> */}
      </TouchableOpacity>
    )
  }

  const renderBannerItem = ({ item }) => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerTopContainer}>
        <View>
          {/* <Text style={styles.bannerDicount}>{item.discount} OFF</Text> */}
          <Text style={styles.bannerDiscountName}>{item.title}</Text>
        </View>
        {/* <Text style={styles.bannerDiscountNum}>{item.discount}</Text> */}
      </View>
      <View style={styles.bannerBottomContainer}>
        <Text style={styles.bannerBottomTitle}>{item.sub_title}</Text>
        {/* <Text style={styles.bannerBottomSubtitle}>{item.bottomSubtitle}</Text> */}
      </View>
    </View>
  );

  const keyExtractor = (item) => item.icon_image.toString();

  const handleEndReached = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const renderDot = (index) => {
    return (
      <View
        style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
        key={index}
      />
    );
  };

  /**
  * Render banner
  */
  const renderBanner = () => {
    return (
      <View style={styles.bannerItemContainer}>
        <FlatList
          data={listFeatured}
          renderItem={renderBannerItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / SIZES.width
            );
            setCurrentIndex(newIndex);
          }}
        />
        <View style={styles.dotContainer}>
          {banners.map((_, index) => renderDot(index))}
        </View>
      </View>
    )
  }

  /**
   * render featured hotels
   */
  const renderFeaturedHotels = () => {
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
    )
  }

  /**
   * render recommendations hotels
   */
  const renderOurRecommendationHotels = () => {
    const [selectedCategories, setSelectedCategories] = useState(["1"]);

    const filteredHotels = recommendedHotels.filter(hotel => selectedCategories.includes("1") || selectedCategories.includes(hotel.categoryId));

    // Category item
    const renderCategoryItem = ({ item }) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
          padding: 10,
          marginVertical: 5,
          borderColor: COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        // onPress={() => toggleCategory(item.id)}
        >
        <Text style={{
          color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
        }}>{item.name}</Text>
      </TouchableOpacity>
    );

    // Toggle category selection
    const toggleCategory = (categoryId) => {
      const updatedCategories = [...selectedCategories];
      const index = updatedCategories.indexOf(categoryId);

      if (index === -1) {
        updatedCategories.push(categoryId);
      } else {
        updatedCategories.splice(index, 1);
      }

      setSelectedCategories(updatedCategories);
    };

    return (
      <View>
        <SectionHeader
          title="Our Recommendation"
          subtitle="See All"
          onPress={() => navigation.navigate("MainPage")}
        />
       
        <View style={{
          backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
          marginVertical: 16
        }}>
          <FlatList
            data={listHotelArray}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: 16 }}
            renderItem={({ item }) => {
              return (
                <VerticalHotelCard
                  name={item.title}
                  image={item.image}
                  rating={item.review_score?.total_review}
                  price={item.price}
                  location={item.location?.name}
                  onPress={() => navigation.navigate('DetailScreen', item)}
                />
              )
            }}
          />
        </View>
      </View>
    )
  }
  const flatListRef = useRef(0);
  const RecomendedCards = ({place}) => {
      return <ImageBackground style={styles.recomendedcardImages} source={{uri:place.image}}>

      </ImageBackground>
  }

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {Slider.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndexs === index ? styles.activeDot : null
            ]}
          />
        ))}
      </View>
    );
  };
  
  useEffect(() => {
    console.log('currentIndexs',currentIndexs); // Ini akan mencetak nilai currentIndexs yang terbaru setiap kali nilainya berubah
  }, [currentIndexs]);
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <Spinner visible={isLoading} />
      <ModalDataDiri visible={modalDataDiri} Checkemail={Checkemail} Resends={Resends} onClose={handleCloseModal} />
      <ModalOtpShow visible={ModalOtp} Checkemail={CheckOTP} Resends={ResendOtp} handleOtpChange={handleOtpChange}  onClose={handleCloseModal} users={users}/>

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>

          {renderSearchBar()}
          
          <FlatList
            contentContainerStyle={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Slider}
            renderItem={({ item }) => <RecomendedCards place={item} />}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.floor(event.nativeEvent.contentOffset.x / cardwidht);
              if (newIndex !== currentIndexs) {
                setCurrentIndexs(newIndex);
              }
            }}
          />
          {renderDots()}
          {/* {renderBanner()} */}
          {renderFeaturedHotels()}
          {renderOurRecommendationHotels()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  recomendedcardImages:{
    height:150,
    width: width - 60,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
},
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    alignItems: "center"
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 32
  },
  viewLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  greeeting: {
    fontSize: 12,
    fontFamily: "Urbanist Regular",
    color: "gray",
    marginBottom: 4
  },
  title: {
    fontSize: 20,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900
  },
  viewNameContainer: {
    marginLeft: 12
  },
  viewRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  bellIcon: {
    height: 27,
    width: 27,
    tintColor: COLORS.black,
    marginRight: 8
  },

  notificationBadge: {
    position: 'absolute',
    top: -8, // Adjust based on icon size
    right: 1, // Adjust based on icon size
    backgroundColor: 'red',  // Red color for the badge
    borderRadius: 10,  // Makes the badge circular
    width: 19,  // Width of the badge
    height: 19,  // Height of the badge
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,  // Ensures the badge is on top of the icon
  },
  notificationBadgeText: {
    color: 'white',  // White text color
    fontWeight: 'bold',
    fontSize: 11,
  },
  bookmarkIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Urbanist Regular",
    marginHorizontal: 8
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  bannerContainer: {
    width: SIZES.width - 32,
    height: 154,
    paddingHorizontal: 28,
    paddingTop: 28,
    borderRadius: 32,
    backgroundColor: COLORS.primary
  },
  bannerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: "Urbanist Medium",
    color: COLORS.white,
    marginBottom: 4
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: "Urbanist Bold",
    color: COLORS.white
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: "Urbanist Bold",
    color: COLORS.white
  },
  bannerBottomContainer: {
    marginTop: 8
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: "Urbanist Medium",
    color: COLORS.white
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: "Urbanist Medium",
    color: COLORS.white,
    marginTop: 4
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 999
  },
  firstName: {
    fontSize: 16,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.dark2,
    marginTop: 6
  },
  bannerItemContainer: {
    width: "100%",
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    height: 170,
    borderRadius: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  }

})

export default Home