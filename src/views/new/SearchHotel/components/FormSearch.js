import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../../../../const/color';
import DatePickerInput from '../../../../component/DatePickerInput';
import { Picker } from '@react-native-picker/picker';

const FormSearch = ({ formData, handleInputChange, handleSearch, location }) => {
    return (
        <View>
            <View style={{alignItems:'center', top:10}}>
            <View style={{
                backgroundColor: COLORS.white,
                borderRadius: 10,
                height: 350,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                
                <View style={styles.inputContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={formData.locations}
                        onValueChange={(itemValue) => handleInputChange('locations', itemValue)}
                        style={styles.picker}
                        >
                            {/* buat picker item dari api locations */}
                            <Picker.Item label="Choose Location" value="" />
                                {location.map((loc) => (
                                    <Picker.Item key={loc.id} label={loc.title} value={loc.id} />
                                ))}
                        </Picker>
                    </View>
                    </View>
            
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                
                <View>
                <Text style={{ color: COLORS.dark }} >Cek in</Text>
                <DatePickerInput type="start"
                onChange={(value) => handleInputChange('startDate', value)} defaultDate={formData.startDate}  />
                </View>
                <View>
                <Text style={{ color: COLORS.dark }}  >Cek Out</Text>
                <DatePickerInput type="end" 
                onChange={(value) => handleInputChange('endDate', value)} defaultDate={formData.endDate} 
                />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
                <View>
                <Text style={{ color: COLORS.dark }} >Adults/Number</Text>
                <TextInput
                value={formData.adults}
                onChangeText={(value) => handleInputChange('adults', value)}
                keyboardType="numeric" 
                placeholder='0' 
                placeholderTextColor={COLORS.dark} 
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 10, width: 150, color: COLORS.dark }} />
                </View>
                <View>
                <Text style={{ color: COLORS.dark }}  >Child</Text>
                <TextInput
                value={formData.childs}
                onChangeText={(value) => handleInputChange('childs', value)}
                keyboardType="numeric" 
                placeholder='0' 
                placeholderTextColor={COLORS.dark} 
                defaultValue='1' 
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 10, width: 150, color: COLORS.dark }} />
                </View>
            </View>
            <View style={{ marginHorizontal: 30, top: 20 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleSearch}>
                <View style={{ ...styles.btnContainer, backgroundColor: COLORS.primary }}>
                    <Text style={{ ...styles.title, color: COLORS.white }} >Search</Text>
                </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
    inputContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
      },
      pickerContainer: {
          borderWidth: 1,
          borderColor: COLORS.grey,
          borderRadius: 10,
      },
      picker: {
          height: 50,
          width:360,
          color: COLORS.dark,
      },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        width: 150,
        color: COLORS.dark
    },
    btnContainer: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default FormSearch;
