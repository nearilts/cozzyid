import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    StatusBar
} from 'react-native';
import axios from 'axios';
import COLORS from '../../../const/color';
import { BASE_URL } from '../../../config';

const Carousel = ({ navigation }) => {
    const flatlistRef = useRef();
    const url = BASE_URL;
    
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const [home, setHome] = useState({ sliders: [] });
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get(url+'slider')
            .then(response => {
                setHome({ sliders: response.data.data.data });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        let interval = setInterval(() => {
            if (currentIndex === home.sliders.length - 1) {
                flatlistRef.current.scrollToIndex({
                    index: 0,
                    animated: true
                });
            } else {
                flatlistRef.current.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true
                });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex, home.sliders.length]);

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index
    });

    const renderImage = ({ item }) => (
        <Image resizeMode='contain' source={{ uri: item.image }} style={styles.image} />
    );

    const renderDotImage = () =>{
        return (
            home.sliders.map((dot, index) => {
                return (
                    <View key={index} style={{backgroundColor: index === currentIndex ? COLORS.red : COLORS.dark
                        , height:13, width:13, borderRadius:10, marginHorizontal:6}}>
    
                    </View>
                )
            })
        )
    }
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        setCurrentIndex(index);
    };

    return (
        <View style={{  }}>
            {/* <StatusBar translucent backgroundColor="transparent" /> */}
            <FlatList
                data={home.sliders}
                ref={flatlistRef}
                getItemLayout={getItemLayout}
                keyExtractor={(item) => item.id}
                renderItem={renderImage}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{top: -80, flexDirection:'row', justifyContent: 'center'}}>
                        {renderDotImage()} 
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 230, width: Dimensions.get("window").width
    },
    dotContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    dot: {
        height: 13,
        width: 13,
        borderRadius: 6.5,
        marginHorizontal: 6,
    },
});

export default Carousel;
