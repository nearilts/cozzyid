import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import DotsView from '../components/DotsView';
import Button from '../components/Button';
import Onboarding1Styles from '../styles/OnboardingStyles';
import { images } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const Onboarding = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 1) {
          clearInterval(intervalId);
          return prevProgress;
        }
        return prevProgress + 0.5;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      // navigate to the onboarding2 Screen
    //   navigation.navigate('Onboarding2');
    }
  }, [progress, navigation]);

  return (
    <SafeAreaView style={[Onboarding1Styles.container, {
      backgroundColor: colors.background
    }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <PageContainer>
        <View style={Onboarding1Styles.contentContainer}>
          <Image
            source={images.onboarding1}
            resizeMode="contain"
            style={Onboarding1Styles.illustration}
          />
          {/* <Image
            source={images.ornament}
            resizeMode="contain"
            style={Onboarding1Styles.ornament}
          /> */}
          <View style={[Onboarding1Styles.buttonContainer, {
            backgroundColor: colors.background
          }]}>
            <View style={Onboarding1Styles.titleContainer}>
              <Text style={[Onboarding1Styles.title, {
                color: colors.text
              }]}>Selamat datang </Text>
              <Text style={Onboarding1Styles.subTitle}>Cozzy.id</Text>
            </View>

            <Text style={[Onboarding1Styles.description, { color: colors.text }]}>
              
            Booking hotel murah, penginapan nyaman dan cari hotel terdekat ?
            Cozzy.id Online market place hotel booking reservasi di Indonesia
            
            </Text>

            <View style={Onboarding1Styles.dotsContainer}>
              {progress < 1 && <DotsView progress={progress} numDots={4} />}
            </View>
            <Button
              title="Next"
              filled
              onPress={() => navigation.navigate('Onboarding2')}
              style={Onboarding1Styles.nextButton}
            />
            <Button
              title="Skip"
              onPress={() => navigation.navigate('LoginScreen')}
              textColor={colors.primary}
              style={Onboarding1Styles.skipButton}
            />
          </View>
        </View>
      </PageContainer>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Onboarding;