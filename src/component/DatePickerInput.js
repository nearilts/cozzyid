import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import COLORS from '../const/color';
const DatePickerInput = ({ type, onChange, defaultDate }) => {
  const [date, setDate] = useState(defaultDate);
  const [open, setOpen] = useState(false);

  // Update state date ketika defaultDate berubah
  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  const formattedDate = date ? date.toISOString().split('T')[0] : '';

    return (
      <>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius:10, width: 150 , color:COLORS.dark}}
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
  
  export default DatePickerInput;