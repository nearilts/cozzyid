import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Alert ,TouchableOpacity,Image,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import ModalDataDiri from '../../../component/ModalDataDiri';
import ModalOtpShow from '../../../component/ModalOtpShow';
import { BASE_URL } from '../../../config';
import axios from 'axios'; // Ensure you import axios
import { useTheme } from '../../../theme/ThemeProvider';
import COLORS from '../../../const/color';
import {  SIZES, icons, images } from "../../../constants";
import * as Notifications from 'expo-notifications';

const CekValidasi = () => {
  const [modalDataDiri, setModalDataDiri] = useState(false);
  const [modalOtp, setModalOtp] = useState(false);
  const [users, setUsers] = useState([]);
  const [Notifikasi, setNotifikasi] = useState([]);
  const [tokenApps, setTokenApps] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const url = BASE_URL;
  const { dark, colors } = useTheme();
  
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
    console.log("panggil")
    cekverif();
    getnotif()
  }, []);

  
const cekverif = async () => {
    console.log("cekverif")
    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    let token = userInfo.access_token.split('|')[1];

    axios
    .get(`${BASE_URL}cek_validasi_email`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log("res",res.data.data)
      let cekverif = res.data.data;
      profils(cekverif);
    })
    .catch((err) => {
      console.log('error login', err);
    });
};

  const profils = async (cekverif) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];

      const response = await axios.get(`${BASE_URL}auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let userData = response.data;
      setUsers(userData);
      console.log("cekverif",cekverif.val)
      console.log("userData",userData.data.setting_otp_apps)

      if (cekverif.val === 1 && userData.data.email_verified_at === '-') {
        // setModalDataDiri(true);
      } else {
        setModalDataDiri(false);
      }

      if ((userData.data.is_otp === 0 || userData.data.is_otp === null) && 
          (userData.data.setting_otp_apps === '1' || userData.data.setting_otp_apps === 1)) {
        // setModalOtp(true);
      } else {
        setModalOtp(false);
      }
      if (tokenApps && (tokenApps !== userData.data.token_app || userData.data.token_app === null)) {
        updateTokenApp();
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    const requestUserPermission = async () => {
      try {
        // Request permission untuk notifikasi
        const { status } = await Notifications.requestPermissionsAsync();
        
        if (status !== 'granted') {
          alert('Izin notifikasi tidak diberikan.');
          return;
        }
    
        // Dapatkan token perangkat untuk push notification
        const tokenData = await Notifications.getExpoPushTokenAsync();
        const tokenapp = tokenData.data;
    
        console.log('setTokenApps =', tokenapp);
    
        // Ambil token user dari AsyncStorage
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo?.access_token?.split('|')[1];
    
        // Ambil data user dari API
        const response = await axios.get(`${BASE_URL}auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        let userData = response.data;
        console.log('userData =', userData.data.token_app);
    
        // Update token jika berbeda atau null
        if (tokenapp && (tokenapp !== userData.data.token_app || userData.data.token_app === null)) {
          console.log('Token diperbarui');
          updateTokenApp(tokenapp);
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestUserPermission();
  }, []);
  const updateTokenApp = async (tokenapp) => {
    try {
      // setIsLoading(true)
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1];
      console.log('formData', tokenapp);

      const response = await axios.post(`${url}update_token_app`, {
        token_app: tokenapp,
       
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


  const Checkemail = () => {
    cekemail()
  
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

  const Resends = () => {
    resendemail()
    
    };
    
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
    
const handleCloseModal = () => {
    // Function to handle closing modal and navigating to MainPage
    setModalOtp(false); // Close the modal
    navigation.navigate('OnBoardScreen'); // Navigate to MainPage
  };
  

  
const CheckOTP = () => {
    if (OtpInput.otp !== null && OtpInput.otp  !== '') {
      chekOtp(OtpInput)
    } else {
      // Handle jika ada properti yang null atau string kosong
      alert('Harap isi semua kolom yang diperlukan.');
    }
    
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
    
const ResendOtp = () => {
    resend_otp()
    
    };
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

    
const [OtpInput, setOtpInput] = useState({
    otp: ""
  });
  const handleOtpChange = (key, value) => {
    setOtpInput(prevData => ({
        ...prevData,
        [key]: value
    }));
  };
  const formatPrice = (price) => {
    let prices = 0;
    if (price) {
      prices = price;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(prices);
  };

  
  return (
    <View style={{ }}>
      <View style={{flexDirection: "row",width:'100%' , height:85, backgroundColor:COLORS.white}}>
      <View style={styles.viewLeft}>
          <Image
            source={images.logo}
            resizeMode='contain'
            style={styles.userIcon}
          />
          <View style={styles.viewNameContainer}>
            {/* <Text style={styles.greeeting}>Hi... 👋</Text> */}
            <Text style={[styles.title, {
              color: COLORS.dark
            }]}>{userInfo?.user.first_name}</Text>
            <Text style={{color: COLORS.dark}}>Point Credit : {formatPrice(users?.data?.credit_balance)}</Text>
          </View>
        </View>
      <View style={styles.viewRight}>

      
        <TouchableOpacity
             onPress={() => navigation.navigate("InboxScreen")}
            >
            <Image
              source={icons.chatBubble}
              resizeMode='contain'
              style={[styles.bellIcon, { tintColor:  COLORS.primary, marginRight:10 }]}
            />
            
          </TouchableOpacity>

          <TouchableOpacity
             onPress={() => navigation.navigate("Notifications",Notifikasi)}
            >
            <Image
              source={icons.notificationBell}
              resizeMode='contain'
              style={[styles.bellIcon, { tintColor: COLORS.primary }]}
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{Notifikasi.countUnread?? 0}</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>

     <ModalDataDiri visible={modalDataDiri} Checkemail={Checkemail} Resends={Resends} onClose={handleCloseModal} />
      <ModalOtpShow visible={modalOtp} Checkemail={CheckOTP} Resends={ResendOtp} handleOtpChange={handleOtpChange}  onClose={handleCloseModal} users={users}/>

    </View>
  );
};

const styles = StyleSheet.create({
  
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
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 32
  },
  viewLeft: {
    top: 15,
    flexDirection: "row",
    alignItems: "center"
  },

  viewRight: {
    flexDirection:'row',
    alignItems: "center",
    top: 40,
    right: 30, // Add right positioning for the notification button
    position: 'absolute', // Position absolute for alignment
    paddingRight: 5,
  },
  bellIcon: {
    height: 27,
    width: 27,
    tintColor: COLORS.black,
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 19,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  notificationBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
});
export default CekValidasi;
