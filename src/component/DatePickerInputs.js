import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
// import DatePicker from 'react-native-date-picker';
import COLORS from '../const/color';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
const DatePickerInputs = ({ type, onChange, defaultDate }) => {
    const [date, setDate] = useState(defaultDate);
    const [open, setOpen] = useState(false);
  
    const formattedDate = date.toLocaleDateString();
  
    return (
      <>
        <TouchableOpacity  style={{padding:15}} onPress={() => setOpen(true)}>
          <TextInput
            style={{ 
              paddingLeft:20,
              paddingRight:20,
              width: 299,
              height: 60,
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              marginBottom: 10,
              backgroundColor:COLORS.white,
              color: COLORS.dark,}}
            value={formattedDate}
            editable={false}
            placeholder={type === 'start' ? 'Select Start Date' : 'Select End Date'}
          />
        </TouchableOpacity>
        {open && (
          
        <DateTimePickerModal
          isVisible={open}
          mode="date"
          date={date || new Date()}
          minimumDate={new Date()}
           display={Platform.OS === "ios" ? "compact" : "default"}
          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate(selectedDate);
            onChange(selectedDate); // Panggil prop onChange dengan tanggal yang dipilih
          }}
          onCancel={() => setOpen(false)}
            locale="id_ID"
        />
        )}
      </>
    );
  };
  
  export default DatePickerInputs;