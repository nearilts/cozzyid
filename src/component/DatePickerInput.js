import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const DatePickerInput = ({ type, onChange }) => {
  const [date, setDate] = useState(new Date()); // Set nilai default agar picker tidak kosong
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    onChange(selectedDate);
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <TouchableOpacity style={{padding:15}} onPress={() => setDatePickerVisibility(true)}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            borderRadius: 10,
            width: 150,
          }}
          value={date ? moment(date).format("YYYY-MM-DD") : ""}
          placeholder={type === "start" ? "Select Start Date" : "Select End Date"}
          editable={false}
        />
      </TouchableOpacity>

      <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={date || new Date()} // Pastikan date tidak null
          minimumDate={new Date()}
          display={Platform.OS === "ios" ? "compact" : "default"} // Ubah inline menjadi compact
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
          locale="id_ID" // Pastikan format sesuai bahasa
        />
    </View>
  );
};

export default DatePickerInput;
