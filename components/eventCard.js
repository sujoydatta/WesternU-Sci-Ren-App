import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import {
  remove_popup,
  remove,
  add,
  add_white,
} from '../images/images';


const EventCard = ({ item, handleAgendaChange }) => {
  let { _id: id, title, description, time, isStageShow } = item
  let today = new Date()
  let past = today > new Date(time)
  let eventTime = ''

  if (time) {
    eventTime = (new Date(time)).toLocaleString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
  }

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

  const addStageShowToAgenda = async (item, stageShow) => {
    try {
      const stringValue = await AsyncStorage.getItem(stageShow ? 'stageShowAgendaList' : 'boothAgendaList')
      let agendaList = JSON.parse(stringValue)
      if (containsObject(item, agendaList)) {
        Toast.show('Event already in Agenda');
        return
      }
      else {
        agendaList.push(item)
        let stringUpdatedValue = JSON.stringify(agendaList)
        Toast.show('Event added to Agenda');
        await AsyncStorage.setItem(stageShow ? 'stageShowAgendaList' : 'boothAgendaList', stringUpdatedValue)
        handleAgendaChange()
      }
    } catch (error) {
      console.error("Error setting agenda lists:", error)
    }
  }


  useEffect(() => {
    setEmptyAgendaLists()
  }, [])

  let containsObject = (obj, list) => {
    return list.some(elem => elem._id === obj._id)
  }

  return (
    <View style={styles.outterContainer}>
      <View key={id} style={[styles.eventContainer, past ? styles.eventPast : styles.eventNotPast]}>
        <Text style={styles.eventText}>{isStageShow === false ? title : eventTime}</Text>
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.eventName}>{isStageShow === false ? description : title}</Text>
        </View >
        <TouchableHighlight style={styles.plusButtonView} onPress={() => addStageShowToAgenda(item, isStageShow)}>
          <View style={styles.plusButtonView}>
            <Image source={add_white} style={styles.stageBoothremoveIcon} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    height: "85%",
  },
  eventPast: {
    backgroundColor: "#8d8d8d",
  },
  eventNotPast: {
    backgroundColor: "#8d8d8d",
  },
  eventName: {
    fontSize: 12,
    fontFamily: 'balsamiq-regular',
    color: "#FFFCFA",
  },
  eventText: {
    fontFamily: 'balsamiq-regular',
    width: "25%",
    color: "#FFFCFA",
    fontSize: 12,
  },
  titleDescriptionContainer: {
    flex: 5,
  },
  timeContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outterContainer: {
    flexDirection: 'row',
    margin: '1%',
    marginBottom: 0,
    borderRadius: 5,
  },

  stageBoothremoveIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default EventCard
