import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import COLORS from '../../const/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import rooms from '../../const/rooms';
import details from '../../const/details';
import CheckBox from 'expo-checkbox';
//  '@react-native-community/checkbox';
import DatePickerInput from '../../component/DatePickerInput';
import { addDays } from 'date-fns';
import { BASE_URL } from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'

const CheckAvailability = ({ navigation, route }) => {
  const listData = route.params;
  const [isLoading, setIsLoading] = useState(false);

  // const room = listData.rooms;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(price);
  };

  const extraServicesData = listData.extra_price;
  const bookingFee = listData.booking_fee;
  const extraServicesArray = Object.values(extraServicesData);
  // State untuk mengelola jumlah setiap item
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const increaseQuantity = (itemId) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1
    }));
  };

  const decreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 0) {
      setItemQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1
      }));
    }
  };

  const [extraServicesStatus, setExtraServicesStatus] = useState({}); // Deklarasi extraServicesStatus

  useEffect(() => {
    calculateTotalPrice();
  }, [itemQuantities, extraServicesStatus]); // Menggunakan extraServicesStatus di dalam dependencies

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const itemId in itemQuantities) {
      let selectedItem = [];
      // console.log("itemQuantities", itemQuantities, "itemQuantities.");

      if (listData.object_model == 'hotel' || listData.object_model == 'car'|| listData.object_model == 'space') {
         selectedItem = services.find(item => item.id == itemId);

        
      } else {
         selectedItem = services[0].person_types[itemId];
        
      }
      if (selectedItem) {
        totalPrice += selectedItem.price * itemQuantities[itemId];
      } else {
        // console.log("Item with ID", itemId, "not found in room array.");
      }
    }
    if (bookingFee && bookingFee.length > 0) {
      bookingFee.forEach(fee => {
        if(fee.unit == 'percent'){
          let total = (totalPrice*fee.price) / 100;
          totalPrice += parseInt(total);
        }else{
          totalPrice += parseInt(fee.price);
        }
      

      });
    }
        console.log("extraServicesData", extraServicesArray);
      if (extraServicesArray && extraServicesArray.length > 0) {
        extraServicesArray.forEach(fee => {
        if (extraServicesStatus[fee.name]) { // Periksa status checkbox untuk item tambahan
          totalPrice += parseInt(fee.price);
        }
      });
    }
    setTotalPrice(totalPrice.toFixed(2));
  };

  const toggleExtraService = (serviceName) => {
    setExtraServicesStatus(prevStatus => ({
      ...prevStatus,
      [serviceName]: !prevStatus[serviceName] // Toggle status checkbox
    }));
  };

  const CartCard = ({ item, index }) => {
    let itemId;
    let cek = false;
    let tour = false;
    if (listData.object_model == 'hotel'|| listData.object_model == 'car') {
       itemId = item.id;
       cek = true;
      
    } else if (listData.object_model == 'tour')  {
       itemId = index;
        cek = true;
        tour = true;
      
    }
    const totalPrice = (item.price * (itemQuantities[itemId] || 0)).toFixed(2);

    return (
          <View>
          {cek && (
          <View style={style.cartCard}>
            <Image source={{ uri: item.image ? item.image : listData.image }} style={{ height: 80, width: 80 }} />
            <View
              style={{
                height: 100,
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16,color: COLORS.dark }}>
                  {item.title ? item.title : `${item.name}-${item.desc}`}
                </Text>
                 {item.price_discount ? (
                    <Text style={{fontSize: 13, color: COLORS.red,textDecorationLine: 'line-through'}}>
                      {formatPrice(item.price_discount)}
                    </Text>
                  ) : (
                    <Text style={style.defaultPrice}> </Text>
                  )}

              
              <Text style={{ fontSize: 13, color: COLORS.dark }}>
                {item.price_text ? item.price_text : item.display_price}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold',color: COLORS.dark }}>{`${formatPrice(totalPrice)}`}</Text>
            </View>
           {!tour && (
             <View style={{ marginRight: 20, alignItems: 'center' }}>
             <Text style={{ color: COLORS.dark }}>Qty</Text>
             <TextInput
               style={{ fontWeight: 'bold', fontSize: 18,color: COLORS.dark }}
               value={(itemQuantities[itemId] || 0).toString()} // Mengambil jumlah dari objek state
               onChangeText={text => setItemQuantities(prevQuantities => ({
                 ...prevQuantities,
                 [itemId]: parseInt(text) || 0
               }))}
             />
             
             <View style={style.actionBtn}>
             <TouchableOpacity onPress={() => decreaseQuantity(itemId)}>
                 <Icon name="remove" size={25} color={COLORS.white} />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => increaseQuantity(itemId)}>
                 <Icon name="add" size={25} color={COLORS.white} />
                 </TouchableOpacity>
              
             </View>
           </View>
           )}
          </View>
        )}
          
        </View>
      
    );
  };
  const [isDataVisible, setIsDataVisible] = useState(false); // State to control visibility of FlatList
  const getLocalDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  };
  
  const getLocalDateInIndonesianTimeZone = (date) => {
    console.log("date:", date);
    const formatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta', // Zona waktu untuk WIB
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const parts = formatter.formatToParts(date);
  const dateObject = {};
  parts.forEach(({ type, value }) => {
    if (type !== 'literal') dateObject[type] = value;
  });

  // Buat tanggal baru berdasarkan string yang diformat
  let localDate = new Date(`${dateObject.year}-${dateObject.month}-${dateObject.day}T${dateObject.hour}:${dateObject.minute}:${dateObject.second}`);

  // Tambahkan offset waktu dalam jam
  localDate.setHours(localDate.getHours() + 7);

  return localDate;
};
  const [startDate, setStartDate] = useState(getLocalDateInIndonesianTimeZone(new Date()));
  const [endDate, setEndDate] = useState(getLocalDateInIndonesianTimeZone(addDays(new Date(), 1)));

  useEffect(() => {
    console.log("Initial start startDate:", startDate);
    console.log("Initial start date:", startDate.toISOString().split('T')[0]);
    console.log("Initial end date:", endDate.toISOString().split('T')[0]);
  }, [startDate, endDate]);
  const [adults, setAdults] = useState(1);
  const [childs, setChilds] = useState(0);

  const handleStartDateChange = (date) => {
    const localDate = getLocalDateInIndonesianTimeZone(date);
    console.log("Selected start date:", localDate);
    setStartDate(localDate);
  };

  const handleEndDateChange = (date) => {
    const localDate = getLocalDateInIndonesianTimeZone(date);
    console.log("Selected end date:", localDate);
    setEndDate(localDate);
  };

  const handleAdultsChange = (text) => {
    setAdults(parseInt(text));
  };

  const handleChildsChange = (text) => {
    setChilds(parseInt(text));
  };

  const [services, setservices] = useState([])
  const url = BASE_URL;
  const checkAvailability = async () => {
    
    try {
      setIsLoading(true);
      
        let start = startDate.toISOString().split('T')[0];
        let end = endDate.toISOString().split('T')[0];

        console.log("start:", start);
        console.log("end:", end);
        // console.log("Adults:", adults);
        // console.log("Childs:", childs);
        if (listData.object_model == 'hotel' ) {
          const response = await axios.get(`${url}${listData.object_model}/availability/${listData.id}?start_date=${start}&end_date=${end}&adults=${adults}`);
          console.log("checkAvailability:", response.data.rooms);
          if (Array.isArray(response.data.rooms) && response.data.rooms.length > 0) {
            setservices(response.data.rooms);
            setIsDataVisible(true);
        } else {
            alert("Tidak ada kamar tersedia di tanggal tersebut");
        }
          
        }else if (listData.object_model == 'space' ) {
          const response = await axios.get(`${url}${listData.object_model}/availability/${listData.id}?start_date=${start}&end_date=${end}&adults=${adults}`);
          // console.log("checkAvailability:", response.data);
          setservices([{person_types:null}]);
          
        }else if (listData.object_model == 'car' ) {
          const response = await axios.get(`${url}${listData.object_model}/availability/${listData.id}?start=${start}&end=${end}&adults=${adults}`);
          // console.log("checkAvailability:", response.data);
          setservices(response.data);
          
        }
         else {
          const response = await axios.get(`${url}${listData.object_model}/availability/${listData.id}?start=${start}&end=${end}&adults=${adults}`);
          // console.log("checkAvailability tour:", response.data);
          setservices(response.data);
          
        }
        setIsLoading(false);

        // setservices(response.data.data);
       // Set the state to true when "Check" button is pressed
        
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
}


  const handleCheckAvailability = () => {
    checkAvailability();

  };
  const transformBookingData = (bookingData) => {
    let transformedData = [];
    if (listData.object_model == 'hotel'){
       transformedData = {
        service_id: listData.id,
        service_type: listData.object_model,
        start_date: bookingData.start_date.toISOString().split("T")[0],
        end_date: bookingData.end_date.toISOString().split("T")[0],
        extra_price: [],
        adults: bookingData.adults,
        children: bookingData.children,
        rooms: []
      };
       // Menambahkan data layanan tambahan yang dipilih
        // for (const service in bookingData.extra_price) {
        //   if (bookingData.extra_price[service]) {
        //     transformedData.extra_price.push({
        //       name: service.trim(),
        //       price: extraServicesArray.find(item => item.name == service).price, // Ubah harga sesuai kebutuhan
        //       type: "one_time",
        //       number: 0,
        //       enable: 1
        //     });
        //   }
        // }
      
        extraServicesArray.forEach(service => {
          transformedData.extra_price.push({
            name: service.name.trim(),
            price: service.price,           
            type: service.type,            
            number: service.per_person === "on" ? 1 : 0,  
            enable: extraServicesStatus[service.name] ? 1 : 0 
          });
        });
        // Menambahkan data kamar yang dipilih
        for (const roomId in bookingData.rooms) {
          transformedData.rooms.push({
            id: parseInt(roomId),
            number_selected: bookingData.rooms[roomId]
          });
        }
    
    }
   
   
  
    return transformedData;
  };
  const Bookings = async (transformedData, navigation) => {
    try {
      setIsLoading(true);

      console.log(`${url}booking/addToCart`);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.access_token.split('|')[1]

      const response = await axios.post(`${url}booking/addToCart`, transformedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('response', response.data);
      setIsLoading(false);

      if (response.data.status == 1) {
        
        navigation.navigate('CheckoutBooking', response.data);
      }
      else{
        alert(response.data.message)
      }
    } catch (error) {
      setIsLoading(false);

      console.error('error Bookings: ', error);
    }
  };
  
  // Panggil fungsi transformasi data saat tombol "Book" ditekan
  const handleBook = () => {
    
    // Kumpulkan semua data yang diperlukan dari state
    console.log('extraServicesStatus: ',extraServicesStatus)
    console.log('extraServicesArray: ',extraServicesArray)
    
    const dataToBook = {
      start_date: startDate,
      end_date: endDate,
      adults: adults,
      children: childs,
      rooms: itemQuantities, // Jumlah kamar yang dipilih
      extra_price: extraServicesStatus // Layanan tambahan yang dipilih
    };
  
    // Transformasikan data ke format yang diinginkan
    const transformedData = transformBookingData(dataToBook);
  
    // Kirim data tersebut ke tujuan yang sesuai (misalnya, simpan di database atau kirim ke server)
    console.log("Data to book:", transformedData);
   

    // Pastikan bahwa `navigation` adalah parameter yang dilewatkan dan bahwa komponen ini memiliki akses ke navigasi.
    Bookings(transformedData, navigation);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Spinner visible={isLoading} />

      <StatusBar translucent backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: 'row', top:10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack} />
              <Text style={{ fontSize: 28, color: COLORS.white }}>Check</Text>
            </View>
            <Text style={{ fontSize: 28, color: COLORS.white, marginLeft: 10 }}>
              Available
            </Text>
          </View>
        </View>
      </View>
      {/* <ScrollView> */}
        {!isDataVisible && (
        <View style={{
          backgroundColor: COLORS.white,
          borderRadius: 10,
          elevation: 10,
          height: 250
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
            <View>
              <Text style={{ color: COLORS.dark }} >Start Date</Text>
              <DatePickerInput type="start" onChange={handleStartDateChange} defaultDate={startDate}  />
            </View>
            <View>
              <Text style={{ color: COLORS.dark }}  >End Date</Text>
              <DatePickerInput type="end" onChange={handleEndDateChange} defaultDate={endDate} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 10 }}>
            <View>
              <Text style={{ color: COLORS.dark }} >Adults/Number</Text>
              <TextInput onChangeText={handleAdultsChange} keyboardType="numeric" placeholder='0' placeholderTextColor={COLORS.dark} defaultValue='1' style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 10, width: 150, color: COLORS.dark }} />
            </View>
            <View>
              <Text style={{ color: COLORS.dark }}  >Child</Text>
              <TextInput onChangeText={handleChildsChange} keyboardType="numeric" placeholder='0' placeholderTextColor={COLORS.dark} style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 10, width: 150, color: COLORS.dark }} />
            </View>
          </View>
          <View style={{ marginHorizontal: 30, top: 20 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleCheckAvailability}>
              <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                <Text style={{ ...style.title, color: COLORS.white }} >Check</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
)}

        {/* Additional Services */}
        {isDataVisible && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={services[0].person_types ? services[0].person_types : services}
          renderItem={({ item, index }) => <CartCard item={item} index={index} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          ListFooterComponent={() => (
            <View>
             <FlatList
              style={style.cartFee}
              data={extraServicesArray}
              renderItem={({ item }) => (
                <View style={style.itemContainer}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: COLORS.dark }} numberOfLines={2}>{item.name}</Text>
                    <Text style={{ color: COLORS.dark }}>{formatPrice(item.price)}</Text>
                  </View>
                  <CheckBox
                    tintColors={{ true: COLORS.primary, false: 'black' }}
                    disabled={false}
                    value={extraServicesStatus[item.name] || false}
                    onValueChange={() => toggleExtraService(item.name)}
                  />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
              <FlatList
                style={style.cartFee}
                data={bookingFee}
                renderItem={({ item }) => (
                  <View style={style.itemContainer}>
                    <Text style={{ color: COLORS.dark }}>{item.name}</Text>
                    <Text style={{ color: COLORS.dark }}>{item.price}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.dark }}>
                  Total Price
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark }}>{formatPrice(totalPrice)}</Text>
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleBook}>
                  <View style={{ ...style.btnContainer, backgroundColor: COLORS.primary }}>
                    <Text style={{ ...style.title, color: COLORS.white }} >Booked</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}


const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    paddingBottom: 15
  },
  cartCard: {
    height: 120,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartFee: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    elevation: 15,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 },
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


export default CheckAvailability;
