import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import {
  remove_popup,
  remove,
  add,
  add_white,
} from '../images/images';

const AgendaEventCard = ({ item, removeFromAgendaLists }) => {
  let { _id: id, title, description, time, isStageShow, performedBy } = item
  let today = new Date()
  let past = today > new Date(time)
  let eventTime = ''

  if (time) {
    eventTime = (new Date(time)).toLocaleString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
  }

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
        <View style={styles.outterContainer}>
          <View key={id} style={[styles.eventCardContainer, past ? styles.eventPast : styles.eventNotPast]}>
            <Text style={styles.eventText}>{isStageShow === false ? title : eventTime}</Text>
            <View style={styles.titleDescriptionContainer}>
              <Text style={styles.eventName}>{isStageShow === false ? description : title}</Text>
            </View >
            <TouchableHighlight style={styles.plusButtonView} onPress={() => removeFromAgendaLists(id, isStageShow)}>
              <View style={styles.plusButtonView}>
                <Image source={remove} style={styles.stageBoothremoveIcon} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={infoModalVisible} 
             onRequestClose={() => {setInfoModalVisible(infoModalVisible);}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{ title }</Text>
              <View style={styles.headerIconContainer}>
                <TouchableOpacity onPress={() => setInfoModalVisible(false)}>
                  <Image source={remove_popup} style={styles.stageBoothremoveIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalBodySubHeader}>Full Description</Text>
              <Text style={styles.modalBodySubcontent}>{description}</Text>
              {isStageShow === false && performedBy && (
                <View>
                  <Text style={styles.modalBodySubHeader}>Who's Performing</Text>
                  <Text style={styles.modalBodySubcontent}>{description}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCardContainer: {
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
    backgroundColor: "#4f2684",
  },
  eventNotPast: {
    backgroundColor: "#4f2684",
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
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

export default AgendaEventCard
