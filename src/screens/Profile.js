import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary, launchCamera } from 'expo-image-picker';
import SettingsItem from '../components/SettingsItem';
import { useTheme } from '../theme/ThemeProvider';
import RBSheet from "react-native-modal";
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import ImageResizer from 'react-native-image-resizer';

const Profile = ({ navigation }) => {
  const url = BASE_URL;
    const [profil, setprofil] = useState({})
    const {isLoading,logouts} = useContext(AuthContext);


    const fetchprofil = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            let token = userInfo.access_token.split('|')[1]
            const response = await axios.get(`${url}auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response.data)
            setprofil(response.data.data)

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchprofil();
        });
        fetchprofil();

        return unsubscribe;
    }, [navigation]);


    console.log('profil', profil)
    const HandledLogout = () => {
        logouts(navigation)
        
      };


  const refRBSheet = useRef();
  const { dark, colors, setScheme } = useTheme();

  /**
   * Render Header
   */
  const renderHeader = () => {
    return (
      <TouchableOpacity style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image
            source={images.logo}
            resizeMode='contain'
            style={styles.logo}
          />
          <Text style={[styles.headerTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>Profile</Text>
        </View>
        {/* <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode='contain'
            style={[styles.headerIcon, {
              tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900
            }]}
          />
        </TouchableOpacity> */}
      </TouchableOpacity>
    )
  }
  /**
   * Render User Profile
   */
  const renderProfile = () => {
    const [image, setImage] = useState(profil.avatar_url)

    const kirim_file = async (files) => {
      try {
        if (!files) {
          Alert.alert('No file selected', 'Please select a file to upload.');
          return;
        }
    
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        let token = userInfo.access_token.split('|')[1];
        const formDatas = new FormData();
        formDatas.append('file', {
          uri: files.uri,
          name: files.fileName || 'default.jpg',
          type: files.type || 'image/jpeg',
        });
        console.log(`${url}upload_foto`);
        console.log('File URI:', files.uri);
        console.log('File Name:', files.fileName);
        console.log('File Type:', files.type);
        console.log('formDatas:', formDatas);
    
        const response = await axios.post(`${url}upload_foto`, formDatas, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
          }
        });
    
        console.log('File', response.data);
        fetchprofil();
    
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };
    // Image Profile handler
    const pickImage = () => {
      Alert.alert(
        "Pilih Sumber Gambar",
        "Pilih Kamera Atau Galeri",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Camera",
            onPress: () => launchCamera({ mediaType: 'photo', quality: 1 }, async (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
              } else {
                // setFile(response.assets[0]);
              const resizedImage = await ImageResizer.createResizedImage(response.assets[0].uri, 800, 600, 'JPEG', 80);
              console.log('resizedImage',resizedImage);

                kirim_file(resizedImage);
              }
            })
          },
          {
            text: "Gallery",
            onPress: () => launchImageLibrary({ mediaType: 'photo', quality: 1 },async (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
              } else {
                const resizedImage = await ImageResizer.createResizedImage(response.assets[0].uri, 800, 600, 'JPEG', 80);
                console.log('resizedImage',resizedImage);
                kirim_file(resizedImage);
              }
            })
          }
        ],
        { cancelable: true }
      );
    };
    return (
      <View style={styles.profileContainer}>
        <View>
          <Image
            source={{uri : profil.avatar_url}}
            resizeMode='cover'
            style={styles.avatar}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={styles.picContainer}>
            <MaterialIcons name="edit" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{profil.first_name}</Text>
        <Text style={[styles.subtitle, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{profil.email}</Text>
      </View>
    )
  }
  /**
   * Render Settings
   */
  const renderSettings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setIsDarkMode((prev) => !prev);
      dark ? setScheme('light') : setScheme('dark')
    };

    return (
      <View style={styles.settingsContainer}>
      <SettingsItem
          icon={icons.calendar}
          name="Pesanan Saya"
          onPress={() => navigation.navigate("BookingScreen")}
        />
        <SettingsItem
          icon={icons.calendar}
          name="Cek in Online"
          onPress={() => navigation.navigate("CekInOnline")}
        />
        <SettingsItem
          icon={icons.userOutline}
          name="Ubah Profil"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
        {/* <SettingsItem
          icon={icons.bell2}
          name="Notification"
          onPress={() => navigation.navigate("SettingsNotifications")}
        /> */}
        {/* <SettingsItem
          icon={icons.wallet2Outline}
          name="Payment"
          onPress={() => navigation.navigate("SettingsPayment")}
        /> */}
        {/* <SettingsItem
          icon={icons.shieldOutline}
          name="Security"
          onPress={() => navigation.navigate("SettingsSecurity")}
        /> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("SettingsLanguage")}
          style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.more}
              resizeMode='contain'
              style={[styles.settingsIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
            <Text style={[styles.settingsName, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Language & Region</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={[styles.rightLanguage, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>English (US)</Text>
            <Image
              source={icons.arrowRight}
              resizeMode='contain'
              style={[styles.settingsArrowRight, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.show}
              resizeMode='contain'
              style={[styles.settingsIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
            <Text style={[styles.settingsName, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Dark Mode</Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? '#fff' : COLORS.white}
              trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
              ios_backgroundColor={COLORS.white}
              style={styles.switch}
            />
          </View>
        </TouchableOpacity> */}
        {/* <SettingsItem
          icon={icons.lockedComputerOutline}
          name="Privacy Policy"
          onPress={() => navigation.navigate("SettingsPrivacyPolicy")}
        /> */}
        <SettingsItem
          icon={icons.infoCircle}
          name="Pusat Bantuan"
          onPress={() => navigation.navigate("HelpCenter")}
        />
        {/* <SettingsItem
          icon={icons.people4}
          name="Invite Friends"
          onPress={() => navigation.navigate("InviteFriends")}
        /> */}
        
        <SettingsItem
          icon={icons.infoCircle}
          name="Informasi Lainnya"
          onPress={() => navigation.navigate("SubMenu")}
        />
        <TouchableOpacity
          onPress={HandledLogout}
          style={styles.logoutContainer}>
          <View style={styles.logoutLeftContainer}>
            <Image
              source={icons.logout}
              resizeMode='contain'
              style={[styles.logoutIcon, {
                tintColor: "red"
              }]}
            />
            <Text style={[styles.logoutName, {
              color: "red"
            }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProfile()}
          {renderSettings()}
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={SIZES.height * .8}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.gray2 : COLORS.grayscale200,
            height: 4
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 260,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white
          }
        }}
      >
        <Text style={styles.bottomTitle}>Logout</Text>
        <View style={[styles.separateLine, {
          backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
        }]} />
        <Text style={[styles.bottomSubtitle, {
          color: dark ? COLORS.white : COLORS.black
        }]}>Are you sure you want to log out?</Text>
        <View style={styles.bottomContainer}>
          <Button
            title="Cancel"
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refRBSheet.current.close()}
          />
          <Button
            title="Yes, Logout"
            filled
            style={styles.logoutButton}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 32
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    height: 32,
    width: 32,
    // tintColor: COLORS.primary
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900
  },
  profileContainer: {
    alignItems: "center",
    borderBottomColor: COLORS.grayscale400,
    borderBottomWidth: .4,
    paddingVertical: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999
  },
  picContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    position: "absolute",
    right: 0,
    bottom: 12
  },
  title: {
    fontSize: 18,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900,
    marginTop: 12
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.greyscale900,
    fontFamily: "Urbanist Medium",
    marginTop: 4
  },
  settingsContainer: {
    marginVertical: 12
  },
  settingsItemContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900
  },
  settingsName: {
    fontSize: 18,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  settingsArrowRight: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  rightLanguage: {
    fontSize: 18,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.greyscale900,
    marginRight: 8
  },
  switch: {
    marginLeft: 8,
    transform: [{ scaleX: .8 }, { scaleY: .8 }], // Adjust the size of the switch
  },
  logoutContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12
  },
  logoutLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900
  },
  logoutName: {
    fontSize: 18,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "Urbanist SemiBold",
    color: "red",
    textAlign: "center",
    marginTop: 12
  },
  bottomSubtitle: {
    fontSize: 20,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 28
  },
  separateLine: {
    width: SIZES.width,
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginTop: 12
  }
})

export default Profile