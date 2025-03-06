import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import React, { createContext,useContext, useState } from 'react'
import COLORS from '../../const/color'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ContactInfo from '../../component/ContactInfo'

const RegisterScreen = ({navigation}) => {

    const [first, setfirst] = useState(null)
    const [last, setlast] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [phone, setphone] = useState(null)
    const [referral, setreferral] = useState(null)

    const {isLoading,registers} = useContext(AuthContext);

  return (
    <SafeAreaView style={{...style.container, backgroundColor:COLORS.white}}>
      <Spinner visible={isLoading} />
      <ImageBackground style={{ flex: 1, height: 170 }} source={require('../../assets/login_top_image.png')}>
       
          {/* <ScrollView> */}
          <View style={{ alignItems: 'center', top: 180 }}>
            <View style={{ justifyContent: 'center',  paddingBottom:20 }}>
              <View style={{ alignItems:'center' }}>
                <Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 25 }}>Cozzy</Text>
                <Text style={{ color: COLORS.dark, fontSize: 15 }}>Pendaftaran Cepat dan Mudah dalam Hitungan Menit</Text>
              </View>
            </View>


           
              <View style={style.wrapper}>
                <View style={style.inputContainer}>
                <Icon name="mail-outline" size={28} color={COLORS.dark} />
                <TextInput
                  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={email} onChangeText={text => setEmail(text)} placeholder='Email'  placeholderTextColor={COLORS.dark} />
              </View>
              <View style={{paddingTop:20}}>
                
              <View style={{...style.inputContainer}}>
                <Icon name="lock" size={28} color={COLORS.dark} />
                <TextInput  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={password} onChangeText={text => setPassword(text)} placeholder='Password' secureTextEntry placeholderTextColor={COLORS.dark} />
              </View>

              </View>
              
              <View style={{paddingTop:20}}>
                
                <View style={{...style.inputContainer}}>
                  <Icon name="person-outline" size={28} color={COLORS.dark} />
                  <TextInput  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={first} onChangeText={text => setfirst(text)} placeholder='First Name' placeholderTextColor={COLORS.dark} />
                </View>

              </View>
              
              <View style={{paddingTop:20}}>
                
                <View style={{...style.inputContainer}}>
                  <Icon name="person-outline" size={28} color={COLORS.dark} />
                  <TextInput  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={last} onChangeText={text => setlast(text)} placeholder='Last Name' placeholderTextColor={COLORS.dark} />
                </View>

              </View>

              <View style={{paddingTop:20}}>
                
                <View style={{...style.inputContainer}}>
                  <Icon name="call" size={28} color={COLORS.dark} />
                  <TextInput style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={phone} 
                keyboardType="phone-pad"
                onChangeText={text => setphone(text)} placeholder='Phone'  placeholderTextColor={COLORS.dark} />
                </View>

              </View>
              
              <View style={{paddingTop:20,paddingBottom:20}}>
                
                <View style={{...style.inputContainer}}>
                  <Icon name="person-outline" size={28} color={COLORS.dark} />
                  <TextInput  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={referral} onChangeText={text => setreferral(text)} placeholder='Kode Referral' placeholderTextColor={COLORS.dark} />
                </View>

              </View>

              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10,marginBottom: 20, flexDirection: 'row'}}>
                <Text style={{color: COLORS.dark}}>Sudah punya akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                  <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 19}}>Masuk Sekarang</Text>
                </TouchableOpacity>
              </View>

                <TouchableOpacity style={{backgroundColor: COLORS.primary, padding: 10, alignItems:'center', borderRadius: 10}} onPress={() => {
                    registers(email, password,first,last,phone,referral,navigation)
                }}>
                    <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>REGISTER</Text>
                </TouchableOpacity>
                
              </View>
              <ContactInfo />
              
          </View>

          {/* </ScrollView> */}
        </ImageBackground>
        
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        width: '80%',
        marginBottom:40
    }, 
    input:{
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 10,
        paddingHorizontal: 14,
        color: COLORS.dark
    },
    inputContainer: {
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      alignItems: 'center',
      paddingHorizontal: 20,
      borderColor:COLORS.dark,
      borderWidth:1
    },
})

export default RegisterScreen