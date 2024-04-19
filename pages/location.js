import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Toast from 'react-native-root-toast';
import { LinearGradient } from 'expo-linear-gradient';

const Location = () => {
  
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <LinearGradient colors={['#c91f39', '#4f2684']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Location and Event Information
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#EFFFFD',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  background: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 22,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
    fontFamily: 'balsamiq-bold',
    color: "#FFFCFA"
  },

  subTitle: {
    fontFamily: 'Roboto_400Regular',
    paddingBottom: 5,
  },

  heading: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 15,
    paddingBottom: 5,
  },

  text: {
    fontFamily: 'Roboto_400Regular',
    paddingBottom: 5,
  },

  flatList: {
    flex: 1,
    marginBottom: 10,
  },

  loadingView: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Location
