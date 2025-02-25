import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/color'; // Your color constants file
import { BASE_URL, BASE_URL_CHAT } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import RenderHTML from 'react-native-render-html';

const ReplyTicket = ({ navigation, route }) => {

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [UserData, setUserData] = useState('');
  const flatListRef = useRef(null); // Create a ref for FlatList

  const url = BASE_URL;

  const fetchChat = async () => {
    try {
      
      

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      setUserData(userInfo);
      let token = userInfo.access_token.split('|')[1];
      const response = await axios.get(`${url}ticket/details/${route.params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
            }
        });
        console.log('response', response.data.data.replies);
        setMessages(response.data.data.replies);
        
    
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
  const kirim_pesan = async (message) => {
    try {
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
      const formData = new FormData();

      formData.append('content', message);
      
      const response = await axios.post(`${url}ticket/reply_store/${route.params.id}`, formData, {
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



  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        {id: Date.now().toString(), user_id: UserData?.user?.id, content: messageInput, },
      ]);
      kirim_pesan(messageInput);
      setMessageInput('');
    }
  };
  const { width } = useWindowDimensions();

  console.log('UserData',UserData?.user?.id)

  const Message = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.user_id === UserData?.user?.id ? styles.userMessage : styles.otherMessage
    ]}>
    <Text style={styles.senderName}>{item.user?.name}</Text>
    {/* <RenderHTML contentWidth={width} source={{ html: item.content }} /> */}
        <Text style={item.user_id === UserData?.user?.id ? styles.messageText : styles.messageText2}>
        <RenderHTML contentWidth={width} source={{ html: item.content }} />
        </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reply Ticket </Text>
        <View>

        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <FlatList
          ref={flatListRef} // Attach the ref to FlatList
          data={messages} // Reverse messages for rendering
          renderItem={Message}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatList}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No messages yet.</Text>
          }
        />
        <View style={styles.inputContainer}>
          
          <TextInput
            style={styles.textInput}
            placeholder="Tulis Content..."
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
    backgroundColor: COLORS.primary2,
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

export default ReplyTicket;
