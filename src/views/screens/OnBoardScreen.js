import { ImageBackground, StatusBar, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'   
import COLORS from '../../const/color'

const OnBoardScreen = ({navigation}) => {
  
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate("LoginScreen");
//     }, 1500); 
    

//     return timer;
// }, [navigation]);
  
  return (
    <View style={{flex:1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)"/>
      <ImageBackground  style={{ flex: 1 }}  source={require('../../assets/first.png')} resizeMode="stretch">
        <View style={styles.details}>
          <Text style={{color: COLORS.primary, fontSize:35, fontWeight: 'bold'}}>
            {/* Cozzy */}
            </Text>
          <Text style={{color: COLORS.primary, lineHeight:25, marginTop:15}}>
            {/* Easy Booking Hotel Reservation. */}
            </Text>

          <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={()=> navigation.navigate("LoginScreen")}>
              <Text style={{color:COLORS.white,fontWeight:'bold'}}> Mulai</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  details:{
    height:'30%',
    bottom:0,
    position:'absolute',
    paddingHorizontal: 40

  },
  btn:{
    height:50,
    width:90,
    backgroundColor: COLORS.secondary,
    marginTop:20,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:200,
  }
})

export default OnBoardScreen;