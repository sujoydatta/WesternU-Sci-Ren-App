import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { additionalDetails } from '../utility/additionalDetails';
import { accessibilityInformation } from '../utility/accessibilityInformation';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';

const Location = () => {
  const myLocation = { latitude: 42.99987147136105, longitude: -81.27380136807624 };

  const bulletRow = (item) => {
    return (
      <View key={item.id} style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bodyText}>
          {item["description"]}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <LinearGradient colors={['#c91f39', '#4f2684']} style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Location and Event Information
            </Text>
            <View style={styles.mapInfoCard}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: myLocation.latitude,
                  longitude: myLocation.longitude,
                  latitudeDelta: 0.0122,
                  longitudeDelta: 0.0021,
                }}
                provider={PROVIDER_GOOGLE}
              >
                {myLocation.latitude && myLocation.longitude &&
                  <Marker
                    coordinate={{
                      latitude: myLocation.latitude,
                      longitude: myLocation.longitude
                    }}
                    title='Alumni Stadium'
                    description='Science Rendezvous Event Location'
                  />
                }
              </MapView>
            </View>
            <View style={styles.infoCard}>
              <Text style={[styles.address, styles.boldText]}>
                Address: Western University Alumni Stadium,{"\n"}
                100 Philip Aziz Ave, London, ON N6A 5P9
              </Text>
              <Text style={styles.boldText}>Time: 2PM - 9:30PM</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.subHeading}>Additional Details:</Text>
              {additionalDetails.map(item => bulletRow(item))}
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.subHeading}>Accessibility Information:</Text>
              {accessibilityInformation.map(item => bulletRow(item))}
            </View>
          </View>
        </ScrollView>
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
  },

  infoCard: {
    backgroundColor: "#FFFCFA",
    borderRadius: 5,
    padding: 20,
    marginTop: "4%",
  },

  boldText: {
    fontFamily: "balsamiq-bold",
    fontSize: 12,
    color: "#1a1a1a",
  },

  address: {
    marginBottom: 8
  },

  subHeading: {
    fontFamily: "balsamiq-bold",
    fontSize: 14,
    color: "#1a1a1a",
    marginBottom: 8
  },

  bodyText: {
    fontFamily: "balsamiq-regular",
    fontSize: 12,
    color: "#1a1a1a",
    flexDirection: 'row',
  },

  bulletItem: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingRight: 20
  },

  bullet: {
    marginLeft: 10,
    marginRight: 6,
  },

  mapInfoCard: {
    backgroundColor: "#FFFCFA",
    borderRadius: 5,
    height: 300,
    marginTop: "4%",
  },

  map: {
    width: Dimensions.get('window').width,
    height: "100%",
  },
});

export default Location
