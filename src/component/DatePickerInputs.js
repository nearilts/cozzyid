import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import COLORS from '../const/color';
const DatePickerInputs = ({ type, onChange, defaultDate }) => {
    const [date, setDate] = useState(defaultDate);
    const [open, setOpen] = useState(false);
  
    const formattedDate = date.toLocaleDateString();
  
    return (
      <>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <TextInput
            style={{ 
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
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            minimumDate={new Date()}
            onConfirm={(selectedDate) => {
              setOpen(false);
              setDate(selectedDate);
              onChange(selectedDate); // Panggil prop onChange dengan tanggal yang dipilih
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}
      </>
    );
  };
  
  export default DatePickerInputs;