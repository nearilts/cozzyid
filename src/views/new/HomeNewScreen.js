import React from 'react';
import { View, StyleSheet,Text,ScrollView , SafeAreaView,TouchableOpacity,Image } from 'react-native';
import Carousel from './components/Carousel';
import ButtonMenu from './components/ButtonMenu';
import COLORS from '../../const/color';
import { icons, images } from "../../constants";
import ButtonCircle from './components/ButtonCircle';
import ButtomIcon from './components/ButtomIcon';
import ListHotelBig from './components/ListHotelBig';
import CekValidasi from './components/CekValidasi';
import { useTheme } from '../../theme/ThemeProvider';

const HomeNewScreen = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.white }}>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <CekValidasi />
        
      <Carousel />


      <View style={styles.buttonContainer}>
        <ButtonMenu />
      </View>


      <View style={styles.buttonContainer}>
        <ButtomIcon />  
      </View>


      <View style={styles.buttonContainer}>
        <View style={{marginLeft:20, marginTop:20}}>
        <ListHotelBig />  
        </View>
      </View>
       
      <View style={styles.buttonContainer}>
        
      </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    top:-70,
    width: '100%',
  },
  
});

export default HomeNewScreen;
