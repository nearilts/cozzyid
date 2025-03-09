// AuthContext.js

import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL, BASE_URL_CHAT } from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Platform, Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userInfoChat, setUserInfoChat] = useState({});
  const [IsVerif, setIsVerif] = useState({});
  const [emailverif, setemailverif] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false)


  const logins = (email, password) => {
    setIsLoading(true);
    let device_name = 'api';
    console.log(`${BASE_URL}auth/login`, { email, password, device_name });

    axios
      .post(`${BASE_URL}auth/login`, { email, password, device_name })
      .then((res) => {
        let userData = res.data;
          console.log('userInfo', userData);
            setUserInfo(userData);
        AsyncStorage.setItem('userInfo', JSON.stringify(userData))
          .then(() => {
            setIsLoading(false);
            if (userData.status && userData.status != 0) {
              // alert("Login Success")
              loginchat(email)
            }else{
              if(userData && userData.message){
                alert("Login Gagal, " + userData?.message)

              }else{
                alert("Login Gagal "  )

              }
            }
          })
          .catch((err) => {
            console.log('Error saving userInfo to AsyncStorage:', err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log('error login', err);
        alert("Login Faled, Try Again");
        setIsLoading(false);
      });
  };

  
  const loginchat = (email) => {
    console.log(`${BASE_URL_CHAT}login_sso`, { email });

    axios
      .post(`${BASE_URL_CHAT}login_sso`, { email })
      .then((res) => {
        let userData = res.data;
          console.log('userInfoChat', userData);
            setUserInfoChat(userData);
            AsyncStorage.removeItem('userInfoChat')
            AsyncStorage.setItem('userInfoChat', JSON.stringify(userData))
          .then(() => {
            if (userData.success) {
            }else{
              if(userData && userData.message){
                alert("Login Gagal, " + userData?.message)
              }else{
                alert("Login Gagal "  )
              }
            }
          })
          .catch((err) => {
            console.log('Error saving userInfo to AsyncStorage:', err);
          });
      })
      .catch((err) => {
        console.log('error login chat', err);
      });
  };

  const registers = (email, password,first_name,last_name,phone,referral,navigation) => {

    if (Platform.OS === "android") {
      if (!email || !password || !first_name || !last_name || !phone) {
        alert("Semua field wajib diisi!");
        return;
      }
    }else{
      if (!email || !password || !first_name || !last_name) {
        alert("Semua field wajib diisi!");
        return;
      }
    }
  
    setIsLoading(true);
    let term = 1;
    let locale = 'apk'+term;
    axios
      .post(`${BASE_URL}auth/register`, { email, password,first_name, last_name,phone,term,locale,referral })
      .then((res) => {
        console.log('Response register', res.data)
        setIsLoading(false);

        if (res.data.status && res.data.status != 0) {
          loginchat(email)

          alert("Berhasil Daftar, Login Sekarang")
          navigation.navigate('LoginScreen');
          
        }else{
          alert("Gagal Daftar, Coba Email Lain")
        }
        
      })
      .catch((err) => {
        console.log('error login', err);
        setIsLoading(false);
      });
  };
  const profils = async (token) => {
      axios
        .get(`${BASE_URL}auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          let userData = res.data;
          setemailverif(userData.data.email_verified_at)

        })
        .catch((err) => {
          console.log('error login', err);
          setUserInfo({})
          AsyncStorage.removeItem('userInfo')
          AsyncStorage.removeItem('token')
          setIsLoading(false);
        });
    };
  
    const cekverif = async (token) => {
      axios
        .get(`${BASE_URL}cek_validasi_email`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          let cekverif = res.data.data;
          console.log('PROFILE', cekverif)
          setIsVerif(cekverif)
        })
        .catch((err) => {
          console.log('error login', err);
          setUserInfo({})
          AsyncStorage.removeItem('userInfo')
          AsyncStorage.removeItem('token')
          setIsLoading(false);
        });
    };

    const logouts = async (navigation) => {
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1]

        
      axios
      .post(`${BASE_URL}auth/logout`, {  },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
        
      )
      .then((res) => {
        setUserInfo({})
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('userInfoChat')
  
        navigation.navigate('LoginScreen');
      })
      .catch((err) => {
        console.log('error login', err);
        alert("Logout Faled, Try Again");
        setIsLoading(false);
      });

    
    };
  

  const isLoggedIn = async () =>{
    try{
      
      setSplashLoading(true)
      let userInfo = await AsyncStorage.getItem('userInfo');

      console.log('USER cobas', userInfo)
      userInfo = JSON.parse(userInfo);


      if(userInfo){
       

        let token = userInfo.access_token.split('|')[1]
        profils(token)
        cekverif(token)
        
        setUserInfo(userInfo)

        loginchat(userInfo.user.email)

        console.log('userInfoChatCheck',userInfoChat)
      }else{
        setUserInfo(userInfo)

      }

      setSplashLoading(false)
    }catch(e){
      console.log(e)
      setSplashLoading(false)

    }
  }


  useEffect(() => {
    isLoggedIn();
  }, [])
  return (
    <AuthContext.Provider value={{ 
      isLoading,
      userInfo,
      IsVerif,
      emailverif,
      splashLoading,
      logins,
      registers,
      logouts
     }}>
      {children}
    </AuthContext.Provider>
  );
};
