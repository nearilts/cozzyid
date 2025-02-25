import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../const/color';
import { useNavigation } from '@react-navigation/native';

const ButtonMenu = () => {
      const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.menuBox}>
        <TouchableOpacity style={styles.touchable} onPress={() => {navigation.navigate("MainPage")}}>
          <View style={styles.innerContainer}>
            <View style={styles.input}>
              <Text style={styles.inputText}>Cari Hotel</Text>
            </View>
            <View style={{height:50, width:1, backgroundColor:COLORS.grey}}>

            </View>
            <View style={styles.iconContainer}>
              <Icon name="near-me" size={35} color={COLORS.primary} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.background, // Ensure there's a background color for better visibility
  },
  menuBox: {
    height: 70,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 3, // Optional: Adds shadow on Android
    shadowColor: '#000', // Optional: Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondgrey,
    marginRight: 10,
  },
  inputText: {
    color: COLORS.dark,
    fontSize:15,
    lineHeight: 50, // Align text vertically
  },
  iconContainer: {
    justifyContent: 'center',
  },
});

export default ButtonMenu;
