import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AgendaEventCard from '../components/agendaEventCard';
import { LinearGradient } from 'expo-linear-gradient';
// import { bgImage } from '../images/images';

const Agenda = ({ agendaChange }) => {
  const [agendaStageShows, setStageShows] = useState([])
  const [agendaBooths, setBooths] = useState([])

  const setEmptyAgendaLists = async () => {
    try {
      const stageShowAgendaList = await AsyncStorage.getItem('stageShowAgendaList')
      const boothAgendaList = await AsyncStorage.getItem('boothAgendaList')
      if (stageShowAgendaList === null) {
        let emptyStageShowAgendaList = []
        await AsyncStorage.setItem('stageShowAgendaList', JSON.stringify(emptyStageShowAgendaList))
      }
      if (boothAgendaList === null) {
        let emptyBoothAgendaList = []
        await AsyncStorage.setItem('boothAgendaList', JSON.stringify(emptyBoothAgendaList))
      }
    } catch (e) {
      console.error("Error setting agenda lists.")
    }
  }

  const getAgendaLists = async () => {
    try {
      const stringStageShowAgendaList = await AsyncStorage.getItem('stageShowAgendaList')
      const stringBoothAgendaList = await AsyncStorage.getItem('boothAgendaList')
      let stageShowAgendaList = JSON.parse(stringStageShowAgendaList)
      let boothAgendaList = JSON.parse(stringBoothAgendaList)
      setStageShows(stageShowAgendaList)
      setBooths(boothAgendaList)

    } catch (e) {
      console.error("error setting the agenda items:", e)
    }
  }

  const removeFromAgendaLists = async (id, stageShow) => {
    try {
      const stringValue = await AsyncStorage.getItem(stageShow === false ? 'boothAgendaList' : 'stageShowAgendaList')
      let agendaList = JSON.parse(stringValue)
      let newAgendaList = agendaList.filter((item) => item._id !== id)
      let stringUpdatedValue = JSON.stringify(newAgendaList)
      await AsyncStorage.setItem(stageShow === false ? 'boothAgendaList' : 'stageShowAgendaList', stringUpdatedValue)
      getAgendaLists()
    } catch (error) {
      console.error("Error removing from agenda lists:", error)
    }
  }

  const compareTime = (a, b) => {
    const timeA = new Date(a);
    const timeB = new Date(b);
    return timeA - timeB;
  };

  useEffect(() => {
    setEmptyAgendaLists()
    getAgendaLists()
  }, [agendaChange])

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <LinearGradient colors={['#c91f39', '#4f2684']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            My Agenda
          </Text>
          <View style={styles.stageBooth}>
            <View style={styles.stageBoothheaderContainer}>
              <Text style={styles.stageBoothheaderText}>Stage Shows & Special Events</Text>
              <View style={styles.stageBoothheaderIconContainer}>
                <Image source={require('../assets/add.svg')} style={styles.stageBoothheaderIcon} />
              </View>
            </View>
            {agendaStageShows.length === 0 && (
              <View style={styles.stageBoothEmptyCartContainer}>
                <View style={styles.stageBoothEmptyCart}>
                  <Text style={styles.stageBoothEmptyCartNothing}>Nothing to see here!</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>Click the plus icon on the</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>top-right to add new items</Text>
                </View>
              </View>
            )}
            <FlatList
              style={styles.flatList}
              data={agendaStageShows.sort((a, b) => compareTime(a.time, b.time))}
              renderItem={({ item }) => (
                <AgendaEventCard item={item} removeFromAgendaLists={removeFromAgendaLists} />
              )}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>

          <View style={styles.stageBooth}>
            <View style={styles.stageBoothheaderContainer}>
              <Text style={styles.stageBoothheaderText}>Saved Booths</Text>
              <View style={styles.stageBoothheaderIconContainer}>
                <Image source={require('../assets/add.svg')} style={styles.stageBoothheaderIcon} />
              </View>
            </View>
            {agendaBooths.length === 0 && (
              <View style={styles.stageBoothEmptyCartContainer}>
                <View style={styles.stageBoothEmptyCart}>
                  <Text style={styles.stageBoothEmptyCartNothing}>Nothing to see here!</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>Click the plus icon on the</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>top-right to add new items</Text>
                </View>
              </View>
            )}
            <FlatList
              style={styles.flatList}
              data={agendaBooths}
              renderItem={({ item }) => (
                <AgendaEventCard item={item} removeFromAgendaLists={removeFromAgendaLists} />
              )}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
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
  title: {
    fontSize: 20,
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
  background: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center'
  },
  stageBooth: {
    backgroundColor: "#FFFCFA",
    borderRadius: 5,
    marginTop: "4%",
    height: "43%",
  },

  stageBoothscrollViewContainer: {
    flexGrow: 1,
  },

  stageBoothscrollableContent: {
    height: "40%"
  },

  stageBoothheaderContainer: {
    display: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    margin: '1%',
  },

  stageBoothheaderText: {
    marginLeft: 8,
    textAlign: 'left',
    fontFamily: "balsamiq-bold",
    fontWeight: "inline",
    fontSize: 16,
    color: "#1A1A1A"
  },

  stageBoothheaderIconContainer: {
    padding: 8, // Adjust as needed
    borderRadius: 24, // Adjust as needed
  },

  stageBoothheaderIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  stageBoothEmptyCart: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },

  stageBoothEmptyCartContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },

  stageBoothEmptyCartNothing: {
    fontFamily: "balsamiq-bold",
    fontSize: 20,
    color: "#cac5c4",
    marginTop: "45%",
    marginBottom: "5%",
  },

  stageBoothEmptyCartOther: {
    fontFamily: "balsamiq-regular",
    color: "#cac5c4",
  }
});

export default Agenda
