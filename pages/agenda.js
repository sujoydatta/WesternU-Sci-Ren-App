import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AgendaEventCard from '../components/agendaEventCard';
import EventCard from '../components/eventCard';
import { LinearGradient } from 'expo-linear-gradient';
import {
  remove_popup,
  remove,
  add,
  add_white,
} from '../images/images';

const axios = require('axios').default;

const Agenda = ({ agendaChange, handleAgendaChange }) => {
  const [agendaStageShows, setAgendaStageShows] = useState([])
  const [agendaBooths, setAgendaBooths] = useState([])

  const [addShowModalVisible, setAddShowModalVisible] = useState(false);
  const [addBoothModalVisible, setAddBoothModalVisible] = useState(false);

  const [stageShows, setStageShows] = useState([])
  const [booths, setBooths] = useState([])
  const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState('');

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
      setAgendaStageShows(stageShowAgendaList)
      setAgendaBooths(boothAgendaList)

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

  const sortedShowData = (data) => {
    if (data) {
      return data.sort((a, b) => compareTime(a.time, b.time));
    }
    return {};
  };

  const eventAddModal = (data, setMode, modalType) => {
    const filteredData = data.filter(item => {
      const titleMatches = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatches = item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return titleMatches || descriptionMatches;
    });

    const handleModalHide = () => {
      setSearchQuery('');
      setMode(false);
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalType} 
             onRequestClose={handleModalHide}
             onDismiss={handleModalHide}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Add to Schedule</Text>
              <View style={styles.headerIconContainer}>
                <TouchableOpacity onPress={handleModalHide}>
                  <Image source={remove_popup} style={styles.stageBoothremoveIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                style={styles.searchBox}
                placeholder="Search..."
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
              />
              <FlatList
                style={styles.flatList}
                data={filteredData}
                renderItem={({ item }) => (
                  <EventCard item={item} handleAgendaChange={handleAgendaChange} />
                )}
                keyExtractor={(item) => item._id.toString()}
              />
              
            </View>
          </View>
        </View>
      </Modal>

    );
  };

  useEffect(() => {
    setEmptyAgendaLists()
    getAgendaLists()
  }, [agendaChange])

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)

      // get Events
      await axios.get('https://western-sciren-server.vercel.app/api/data/getAllEvents')
        .then(res => {
          const eventData = res.data;
          let stageShowEvents = eventData.filter(item => item.isStageShow);
          let boothEvents = eventData.filter(item => !item.isStageShow);
          setStageShows(stageShowEvents)
          setBooths(boothEvents)
        })
        .catch(error => {
          console.error(error);
        });

      setLoading(false)
    }

    fetchEvents();
  }, [])

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
                <TouchableOpacity onPress={() => setAddShowModalVisible(true)}>
                  <Image source={add} style={styles.stageBoothheaderIcon} />
                </TouchableOpacity>
                {eventAddModal(sortedShowData(stageShows), setAddShowModalVisible, addShowModalVisible)}
              </View>
            </View>
            {(!agendaStageShows || (agendaStageShows && agendaStageShows.length === 0)) ? (
              <View style={styles.stageBoothEmptyCartContainer}>
                <View style={styles.stageBoothEmptyCart}>
                  <Text style={styles.stageBoothEmptyCartNothing}>Nothing to see here!</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>Click the plus icon on the</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>top-right to add new items</Text>
                </View>
              </View>
            ) : (
            <FlatList
              style={styles.flatList}
              data={sortedShowData(agendaStageShows)}
              renderItem={({ item }) => (
                <AgendaEventCard item={item} removeFromAgendaLists={removeFromAgendaLists} />
              )}
              keyExtractor={(item) => item._id.toString()}
            />)}
          </View>

          <View style={styles.stageBooth}>
            <View style={styles.stageBoothheaderContainer}>
              <Text style={styles.stageBoothheaderText}>Saved Booths</Text>
              <View style={styles.stageBoothheaderIconContainer}>
                <TouchableOpacity onPress={() => setAddBoothModalVisible(true)}>
                  <Image source={add} style={styles.stageBoothheaderIcon} />
                </TouchableOpacity>
                {eventAddModal(booths, setAddBoothModalVisible, addBoothModalVisible)}
              </View>
            </View>
            {(!agendaBooths || (agendaBooths && agendaBooths.length === 0)) ? (
              <View style={styles.stageBoothEmptyCartContainer}>
                <View style={styles.stageBoothEmptyCart}>
                  <Text style={styles.stageBoothEmptyCartNothing}>Nothing to see here!</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>Click the plus icon on the</Text>
                  <Text style={styles.stageBoothEmptyCartOther}>top-right to add new items</Text>
                </View>
              </View>
            ) : (
            <FlatList
              style={styles.flatList}
              data={agendaBooths}
              renderItem={({ item }) => (
                <AgendaEventCard item={item} removeFromAgendaLists={removeFromAgendaLists} />
              )}
              keyExtractor={(item) => item._id.toString()}
            />)}
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
    fontSize: 14,
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
    paddingHorizontal: 22,
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
    fontSize: 14,
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
    color: "#acacac",
    marginBottom: "4%",
  },

  stageBoothEmptyCartOther: {
    fontFamily: "balsamiq-regular",
    color: "#acacac",
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: "70%",
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  modalHeader: {
    marginBottom: 10,
    backgroundColor: "#c91f39",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: "5%",
    width: "100%"
  },

  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'balsamiq-bold',
    color: "#FFFCFA"
  },

  modalBody: {
    padding: "5%",
    height: "85%",
  },

  searchBox: {
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: 5,
    height: 40,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#f4f4f4",
    fontFamily: 'balsamiq-regular',
    fontSize: 14,
    color: "#1a1a1a",
  },

  modalBodySubHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'balsamiq-bold',
    color: "#1a1a1a",
    marginBottom: "1%"
  },

  modalBodySubcontent: {
    fontSize: 12,
    fontFamily: 'balsamiq-regular',
    color: "#1a1a1a",
    marginBottom: "3%"
  }
});

export default Agenda
