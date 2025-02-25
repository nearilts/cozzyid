import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import COLORS from '../../const/color'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Linking } from 'react-native';
import ContactInfo from '../../component/ContactInfo'
import { ScrollView } from 'react-native-gesture-handler'

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const {isLoading, logins} = useContext(AuthContext);

    const handleOpenURL = (url) => {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  return (
    <View style={{...style.container, backgroundColor: COLORS.white}}>
      <Spinner visible={isLoading} />
      <ImageBackground style={{ flex: 1, height: 170 }} source={require('../../assets/login_top_image.png')}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{ alignItems: 'center', marginTop: 180 }}>
            <View style={{ justifyContent: 'center', backgroundColor: COLORS.white, width: 364, height: 100, borderRadius: 25 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 25 }}>Selamat Datang</Text>
                <View style={{marginLeft: 20, marginRight: 20, alignItems: 'center'}}>
                <Text style={{ color: COLORS.dark, fontSize: 15, textAlign: 'center' }}>
                Cozzy.id Pesan hotel murah, menginap di hotel terdekat, dan mudah bayar dgn QRIS/CC
                </Text>
              </View>
              </View>
            </View>

            <View style={style.wrapper}>
              <View style={style.inputContainer}>
                <Icon name="mail-outline" size={28} color={COLORS.dark} />
                <TextInput
                  style={{flex: 1, fontSize: 18, color: COLORS.dark}} value={email} onChangeText={text => setEmail(text)} placeholder='Email' placeholderTextColor={COLORS.dark} />
              </View>
              <View style={{paddingTop: 20, paddingBottom: 20}}>
                <View style={style.inputContainer}>
                  <Icon name="lock" size={28} color={COLORS.dark} />
                  <TextInput style={{flex: 1, fontSize: 18, color: COLORS.dark}} value={password} onChangeText={text => setPassword(text)} placeholder='Password' secureTextEntry placeholderTextColor={COLORS.dark} />
                </View>
              </View>

              <TouchableOpacity style={{backgroundColor: COLORS.primary, padding: 10, alignItems: 'center', borderRadius: 10}} onPress={() => {
                  logins(email, password)
              }}>
                  <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>MASUK</Text>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row'}}>
                <Text style={{color: COLORS.dark}}>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                  <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 19}}>Daftar Sekarang</Text>
                </TouchableOpacity>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                  <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 15}}>Lupa Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ContactInfo />
        </View>
      </ImageBackground>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderColor: COLORS.dark,
        borderWidth: 1
    },
    wrapper: {
        width: '80%',
        paddingTop: 20
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 10,
        paddingHorizontal: 14,
        color: COLORS.dark
    }
})

export default LoginScreen
