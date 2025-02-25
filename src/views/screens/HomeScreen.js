import { SafeAreaView, StatusBar, StyleSheet, Text, View,ScrollView, TextInput, ImageBackground, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../const/color'
import Icon from 'react-native-vector-icons/MaterialIcons'
import places from '../../const/places'

const {width} = Dimensions.get("screen"); 

const HomeScreen = ({navigation}) => {

    const CategoryIcons = [
        <Icon name="beach-access" size={25} color={COLORS.primary} />,
        <Icon name="hotel" size={25} color={COLORS.primary} />,
        <Icon name="car-rental" size={25} color={COLORS.primary} />,
        <Icon name="business" size={25} color={COLORS.primary} />,
    ]

    const ListCategories = () => {
        return <View style={styles.categoryContainer}>
                {CategoryIcons.map((icon, index) =>(
                    <View key={index} style={styles.iconContainer}>
                        {icon}
                    </View>
                ))}
        </View>
    }

    const Card = ({place}) => {
        return  (
        <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("DetailScreen", place )}>
        <ImageBackground style={styles.cardImage} source={place.image}>
            <Text style={{color:COLORS.white, fontSize:20, fontWeight: 'bold', marginTop:10}}>{place.name}</Text>
            <View style={{flex:1, justifyContent: 'space-between', flexDirection: 'row', alignItems:'flex-end'}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="place" size={20} color={COLORS.white} />
                    <Text style={{marginLeft: 5, color:COLORS.white}}>{place.location}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Text style={{marginLeft: 5, color:COLORS.white}}>5.0</Text>
                </View>
            </View>
        </ImageBackground>
        </TouchableOpacity>)
    }

    const RecomendedCard = ({place}) => {
        return <ImageBackground style={styles.recomendedcardImage} source={place.image}>
            <Text style={{color:COLORS.white, fontSize:22, fontWeight: 'bold', marginTop:10}}>{place.name}</Text>
            <View style={{ flexDirection: 'row', marginTop:10}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="place" size={20} color={COLORS.white} />
                    <Text style={{marginLeft: 5, color:COLORS.white}}>{place.location}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Text style={{marginLeft: 5, color:COLORS.white}}>5.0</Text>
                </View>
            </View>
            <Text style={{color:COLORS.white}}>{place.details}</Text>
        </ImageBackground>
    }



      
  return (
   <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
    
    
    <StatusBar translucent={false} backgroundColor={COLORS.primary} />
    
    
    <View style={styles.header}>
    <Text style={{fontSize:18, fontWeight:'bold', color:COLORS.white}}>cozzy.id</Text>
        {/* <Icon name="sort" size={28} color={COLORS.white} />
        <Icon name="notifications-none" size={28} color={COLORS.white} /> */}
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor:COLORS.primary, height:120, paddingHorizontal:20}}>
           <View>
           <Text style={styles.headerTytle}>Explore the</Text>
            <Text style={styles.headerTytle}>Beautiful places</Text>
            <View style={styles.InputContainer}>
                <Icon name="search" size={28} color={COLORS.dark} />
                <TextInput placeholder='Search Place' style={{color:COLORS.grey}} />
            </View>
           </View>
        </View>


        <ListCategories />


        <Text style={styles.sectionTitle}>Tours</Text>
        <View>
            <FlatList contentContainerStyle={{paddingLeft: 20}} showsHorizontalScrollIndicator={false} horizontal data={places} renderItem={({item}) => <Card place={item} />} /> 
        </View>

        <Text style={styles.sectionTitle}>Hotel</Text>
        <View>
            <FlatList contentContainerStyle={{paddingLeft: 20}} showsHorizontalScrollIndicator={false} horizontal data={places} renderItem={({item}) => <Card place={item} />} /> 
        </View>

        <Text style={styles.sectionTitle}>Cars</Text>
        <View>
            <FlatList contentContainerStyle={{paddingLeft: 20}} showsHorizontalScrollIndicator={false} horizontal data={places} renderItem={({item}) => <Card place={item} />} /> 
        </View>

        <Text style={styles.sectionTitle}>Spaces</Text>
        <View>
            <FlatList contentContainerStyle={{paddingLeft: 20}} showsHorizontalScrollIndicator={false} horizontal data={places} renderItem={({item}) => <Card place={item} />} /> 
        </View>

        <Text style={styles.sectionTitle}>Recomended</Text>
        <FlatList contentContainerStyle={{paddingLeft: 20, paddingBottom:20}} showsHorizontalScrollIndicator={false} horizontal data={places} renderItem={({item}) => <RecomendedCard place={item} />} /> 

    </ScrollView>

   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header:{
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
        paddingHorizontal:20
    },
    headerTytle:{
        color:COLORS.white,
        fontWeight: 'bold',
        fontSize: 23
    },
    InputContainer:{
        height: 60,
        width : '100%',
        backgroundColor:COLORS.white,
        borderRadius:10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems : 'center',
        elevation: 12

    },
    categoryContainer:{
        marginTop: 60,
        marginHorizontal: 20,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    iconContainer: {
        height:60,
        width: 60,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    sectionTitle:{
        marginHorizontal: 20,
        marginVertical: 20,
        fontSize:20,
        fontWeight: 'bold',
        color: COLORS.dark
    },
    cardImage:{
        height:220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10
    },
    recomendedcardImage:{
        height:200,
        width: width - 40,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10
    }
})

export default HomeScreen;