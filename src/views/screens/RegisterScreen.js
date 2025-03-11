import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, ScrollView, Image ,Linking} from 'react-native'
import React, { createContext,useContext, useState } from 'react'
import COLORS from '../../const/color'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ContactInfo from '../../component/ContactInfo'
import { KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'expo-checkbox';

const RegisterScreen = ({navigation}) => {

    const [first, setfirst] = useState(null)
    const [last, setlast] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [phone, setphone] = useState(null)
    const [referral, setreferral] = useState(null)

    const {isLoading,registers} = useContext(AuthContext);
    const [checked, setChecked] = useState(false);
    const [checkeds, setCheckeds] = useState(false);

const handleOpenURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};
  return (
    <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{ flex: 1 }}
      >
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
              <Image style={{ width:'100%', height: 170 }} source={require('../../assets/login_top_image.png')} />
       
          <View style={{ alignItems: 'center', }}>
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
              <Text style={{color:COLORS.red  }}>* Wajib Di isi</Text>

              <View style={{paddingTop:20}}>
                
              <View style={{...style.inputContainer}}>
                <Icon name="lock" size={28} color={COLORS.dark} />
                <TextInput  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={password} onChangeText={text => setPassword(text)} placeholder='Password' secureTextEntry placeholderTextColor={COLORS.dark} />
              </View>

              </View>
              <Text style={{color:COLORS.red  }}>* Wajib Di isi</Text>
              
              <View style={{paddingTop:20}}>
                
                <View style={{...style.inputContainer}}>
                  <Icon name="person-outline" size={28} color={COLORS.dark} />
                  <TextInput  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={first} onChangeText={text => setfirst(text)} placeholder='First Name' placeholderTextColor={COLORS.dark} />
                </View>

              </View>
              <Text style={{color:COLORS.red  }}>* Wajib Di isi</Text>
              
              <View style={{paddingTop:20}}>
                
                <View style={{...style.inputContainer}}>
                  <Icon name="person-outline" size={28} color={COLORS.dark} />
                  <TextInput  style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={last} onChangeText={text => setlast(text)} placeholder='Last Name' placeholderTextColor={COLORS.dark} />
                </View>

              </View>
              <Text style={{color:COLORS.red  }}>* Wajib Di isi</Text>

              <View style={{paddingTop:20}}>
                
                <View style={{...style.inputContainer}}>
                  <Icon name="call" size={28} color={COLORS.dark} />
                  <TextInput style={{flex: 1, fontSize: 18,color:COLORS.dark}} value={phone} 
                keyboardType="phone-pad"
                onChangeText={text => setphone(text)} placeholder='Phone'  placeholderTextColor={COLORS.dark} />
                </View>

              </View>
              {Platform.OS === 'android' && <Text style={{color: COLORS.red}}>* Wajib Di isi</Text>}
              
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

               <View style={{flexDirection:'row',paddingLeft: 20, paddingTop: 10,paddingBottom:10}}>
                            
                  <CheckBox
                    tintColors={{ true: COLORS.primary, false: 'black' }}
                      title='Check me!'
                        disabled={false}
                        value={checked}
                        onValueChange={() => setChecked(!checked)}
                    />
                    <TouchableOpacity  onPress={() =>  handleOpenURL('https://www.cozzy.id/page/kebijakan-informasi-pribadi')}>
                    <Text style={{paddingLeft: 10,  paddingTop:5, fontSize: 15, color: COLORS.primary, fontWeight: 'bold' }}> Kebijakan Privacy</Text>
    
                    </TouchableOpacity>
                  </View>

                  <View style={{flexDirection:'row',paddingLeft: 20, paddingTop: 10,paddingBottom:30}}>
                            
                    <CheckBox
                      tintColors={{ true: COLORS.primary, false: 'black' }}
                        title='Check me!'
                          disabled={false}
                          value={checkeds}
                          onValueChange={() => setCheckeds(!checkeds)}
                      />
                      <TouchableOpacity  onPress={() =>  handleOpenURL('https://www.cozzy.id/page/ketentuan-layanan')}>
                      <Text style={{paddingLeft: 10, paddingTop:5, fontSize: 15, color: COLORS.primary, fontWeight: 'bold' }}> Ketentuan Layanan</Text>
      
                      </TouchableOpacity>
                    </View>
                <TouchableOpacity style={{backgroundColor: COLORS.primary, padding: 10, alignItems:'center', borderRadius: 10}} onPress={() => {
                    if (!checked || !checkeds) {
                      alert("Harap setujui Kebijakan Privasi dan Ketentuan Layanan.");
                      return;
                    }
                    registers(email, password,first,last,phone,referral,navigation)
                }}>
                    <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>REGISTER</Text>
                </TouchableOpacity>
                
              </View>
              <ContactInfo />
              
          </View>

    </ScrollView>
</KeyboardAvoidingView>
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