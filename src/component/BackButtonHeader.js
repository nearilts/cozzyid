import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';

const BackButtonHeader = ({ title = "", backgroundColor = "#fff", arrowColor = "#000" }) => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor, padding: 16, flexDirection: "row", alignItems: "center", paddingBottom:20,paddingTop: Platform.OS === 'android' ? 40 : 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
        <Icon name="arrow-back" size={24} color={arrowColor} />
      </TouchableOpacity>
      {title ? <Text style={{ fontSize: 18, fontWeight: "bold", color: arrowColor }}>{title}</Text> : null}
    </View>
  );
};

export default BackButtonHeader;
