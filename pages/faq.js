import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const axios = require('axios').default;
import { LinearGradient } from 'expo-linear-gradient';

import FaqCard from '../components/faqCard';
import { bgImage } from '../images/images';

const Faq = () => {
  const [faq, setFaq] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFaq = async () => {
      setLoading(true)

      // get faq
      await axios.get('https://western-sciren-server.vercel.app/api/faq/getAllFaq')
        .then(res => {
          console.error(res.data);
          setFaq(res.data);
        })
        .catch(error => {
          console.error(error);
          setFaq([]);
        });

      setLoading(false)
    }

    fetchFaq();
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <LinearGradient colors={['#c91f39', '#4f2684']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Contact Us!
          </Text>
          <View style={styles.contactContainer}>
            <Text style={styles.question}>Want to get in touch?</Text>
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>
                Email us at sr-comms@uwo.ca and we will do our best to get back to you in couple business days.
              </Text>
            </View>
          </View>
          <Text style={styles.title}>
            FAQ - Frequently Asked Questions
          </Text>
          {loading && (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="hsv(0°, 0%, 75%)" />
            </View>
          )}
          {!loading && <FlatList
            style={styles.flatList}
            data={faq}
            renderItem={({ item }) => (
              <FaqCard item={item} />
            )}
            keyExtractor={(item) => item._id.toString()}
          />}
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

  text: {
    fontFamily: 'Roboto_400Regular',
  },

  flatList: {
    flex: 1,
  },

  loadingView: {
    flex: 1,
    justifyContent: 'center'
  },

  contactContainer: {
    padding: 20,
    borderRadius: 5,
    marginTop: "4%",
    backgroundColor: '#FFFFFF',
  },

  question: {
    fontSize: 14,
    fontFamily: 'balsamiq-bold',
    marginBottom: 10,
  },

  answerContainer: {
    flexDirection: 'row',
  },

  answer: {
    flex: 1,
  },

  answerText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'balsamiq-regular',
  }
});

export default Faq
