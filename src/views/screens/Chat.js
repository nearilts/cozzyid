import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/color'; // Your color constants file
import { BASE_URL_CHAT } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const Chat = ({  route }) => {
  const navigation = useNavigation();

  const { id, name } = route.params.id; // Destructure id and name
  const [messages, setMessages] = useState([]);
  const [infogrup, setinfogrup] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [file, setFile] = useState(null); // State for file
  const [UserData, setUserData] = useState('');
  const flatListRef = useRef(null); // Create a ref for FlatList

  const url = BASE_URL_CHAT;

  const kirim_pesan = async (message) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const formData = new FormData();
      formData.append('message', message);
      formData.append('is_archive_chat', 0);
      formData.append('to_id', id);
      if (route.params.is_group && route.params.is_group === 1) {
        formData.append('is_group', 1);
      }
      const response = await axios.post(`${url}send-messages`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.data.success) {
        fetchChat()
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const kirim_pesan_file = async (message,file_name,message_type) => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const formData = new FormData();
      formData.append('message', message);
      formData.append('is_archive_chat', 0);
      formData.append('to_id', id);
      formData.append('file_name', file_name);
      formData.append('message_type', message_type);
      if (route.params.is_group && route.params.is_group === 1) {
        formData.append('is_group', 1);
      }

      console.log('formData ', formData);
    
      const response = await axios.post(`${url}send-messages`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.data.success) {
        fetchChat()
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchChat = async () => {
    try {
      
      

      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      setUserData(userInfo.data);
    let token = userInfo.data.token;
      let param = '';
      if (route.params.is_group && route.params.is_group === 1) {
        param = '?is_group=1'
      }
      const response = await axios.get(`${url}users/${id}/conversation${param}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(response.data.data.conversations);
      if (route.params.is_group && route.params.is_group === 1) {
        setinfogrup(response.data.data.group);

      }
    } catch (error) {
      console.error('Error fetching chat:', error);
      setMessages([]); // Default to empty array in case of error
    }
  };

  useEffect(() => {
    fetchChat(); // Initial fetch

    // Auto-refresh messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchChat();
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages(prevMessages => [
        { id: Date.now().toString(), message: messageInput, message_type: 0},
        ...prevMessages
      ]);
      kirim_pesan(messageInput);
      setMessageInput('');
    }
  };

  const kirim_file = async (files) => {
    try {
      if (!files) {
        Alert.alert('No file selected', 'Please select a file to upload.');
        return;
      }

      let userInfo = await AsyncStorage.getItem('userInfoChat');
      userInfo = JSON.parse(userInfo);
      let token = userInfo.data.token;
      const formDatas = new FormData();
      if (files) {
           const fileUri = files.uri;
           const fileInfo = await FileSystem.getInfoAsync(fileUri);
           
           if (fileInfo.exists) {
             const fileBlob = {
               uri: fileUri,
               name: fileUri.split("/").pop(),
               type: "image/jpeg", 
             };
     
             formDatas.append("file[]", fileBlob);
           } else {
             console.error("File tidak ditemukan:", fileUri);
             alert("File tidak ditemukan, coba unggah ulang.");
             setIsLoading(false);
             return;
           }
         }
      console.log('formDatas:', formDatas);

      const response = await axios.post(`${url}file-uploads`, formDatas, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

        console.log('File', response.data);
      if (response.data.success) {
        const uploadedFile = response.data.data[0];

        console.log('File uploaded attachment:', uploadedFile.attachment);
        console.log('File uploaded file_name:', uploadedFile.file_name);
        console.log('File uploaded message_type:', uploadedFile.message_type);
       
        kirim_pesan_file(uploadedFile.attachment,uploadedFile.file_name,uploadedFile.message_type)
      }
    } catch (error) {
      console.error('Error sending file:', error);
    }
  };


  const handleFilePick = async () => {
    Alert.alert(
      "Pilih Sumber Gambar",
      "Pilih Kamera atau Galeri",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Camera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert("Izin Ditolak", "Aplikasi membutuhkan izin untuk mengakses kamera.");
              return;
            }
  
            try {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
              });
  
              if (!result.canceled) {
                kirim_file(result.assets[0]); // Mengirim file yang dipilih
              }
            } catch (error) {
              console.error("Error membuka kamera:", error);
            }
          },
        },
        {
          text: "Gallery",
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert("Izin Ditolak", "Aplikasi membutuhkan izin untuk mengakses galeri.");
              return;
            }
  
            try {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
              });
  
              if (!result.canceled) {
                kirim_file(result.assets[0]); // Mengirim file yang dipilih
              }
            } catch (error) {
              console.error("Error membuka galeri:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  const handleOpenWebView = (url) => () => {
    navigation.navigate('WebViewUrl',url);

  };
  console.log('UserData',UserData.user?.id)

  const Message = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.from_id === UserData.user?.id ? styles.userMessage : styles.otherMessage
    ]}>
     {item.message_type !== 0  ? (
        <>
        {item.message_type !== 9 ? (
           <>
            <Text style={styles.senderName}>{item.sender?.name}</Text>
          <TouchableOpacity onPress={handleOpenWebView(item.message)} style={styles.openWebViewButton}>
            <Text style={styles.openWebViewButtonText}>View File</Text>
          </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.centeredMessageText}>{item.message}</Text>
          )}
       
        </>
      ) : (
        <>
        <Text style={styles.senderName}>{item.sender?.name}</Text>
        <Text style={item.from_id === UserData.user?.id ? styles.messageText : styles.messageText2}>
          {item.message}
        </Text>
        </>
        
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat with {name} </Text>
        <View>
        {route.params.is_group && route.params.is_group === 1 && infogrup.privacy === 1 || infogrup.privacy === 2 && UserData.user?.id === infogrup.created_by ?  (
          <TouchableOpacity onPress={() => { navigation.navigate('ListFriendGroup', id)}} style={styles.addButton}>
            <Icon name="group-add" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        ) : null}

        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <FlatList
          ref={flatListRef} // Attach the ref to FlatList
          data={messages.slice().reverse()} // Reverse messages for rendering
          renderItem={Message}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatList}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No messages yet.</Text>
          }
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleFilePick} style={styles.uploadButton}>
            <Icon name="attach-file" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.dark}
            value={messageInput}
            onChangeText={setMessageInput}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Icon name="send" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    top: 20
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatList: {
    padding: 10,
    flexGrow: 1, // Ensure FlatList grows to fill available space
    justifyContent: 'flex-end', // Align items to bottom
  },
  messageContainer: {
    borderRadius: 20,
    marginVertical: 5,
    padding: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: COLORS.white,
  },
  messageText2: {
    color: COLORS.dark,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.inputBackground,
    marginBottom: 20
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    color: COLORS.dark,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    marginRight: 10,
  },
  emptyMessage: {
    color: COLORS.dark,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  openWebViewButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  openWebViewButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  centeredMessageText: {
    textAlign: 'center', // Align text to the center
    color: COLORS.dark,
    fontSize: 16,
    marginVertical: 10,
  },
});

export default Chat;
