import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { registerForPushNotifications, listenForNotifications } from './utility/pushNotificationService'

import Home from './pages/home';
import Location from './pages/location';
import Map from './pages/map';
import Faq from './pages/faq';
import Agenda from './pages/agenda';

import {
  settings_inactive,
  agenda_active,
  agenda_inactive,
  map_active,
  map_inactive,
  location_active,
  location_inactive,
  FAQ_active,
  FAQ_inactive
} from './images/images';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const App = () => {
  const [agendaChange, setAgendaChange] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const handleAgendaChange = () => {
    setAgendaChange(!agendaChange);
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    'Phosphate_pro': require('./assets/fonts/Phosphate_pro.otf'),
    'balsamiq-bold': require('./assets/fonts/BalsamiqSans-Bold.ttf'),
    'balsamiq-regular': require('./assets/fonts/BalsamiqSans-Regular.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded])

  useEffect(() => {
    registerForPushNotifications()
    listenForNotifications()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const CustomHeader = ({ title, icon }) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{ title }</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar
        barStyle={'dark-content'}
      />

      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Agenda') {
              iconName = focused ? agenda_active : agenda_inactive;
            } else if (route.name === 'Map') {
              iconName = focused ? map_active : map_inactive;
            } else if (route.name === 'Location') {
              iconName = focused ? location_active : location_inactive;
            } else if (route.name === 'Faq') {
              iconName = focused ? FAQ_active : FAQ_inactive;
            }
            // return <Ionicons name={iconName} size={size} color={color} />;
            // icon = require(iconName);
            return <Image source={iconName} style={styles.tabIcon} />
          },
          headerShown: true,
          tabBarActiveTintColor: '#0BB4A9',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}
        >
          <Tab.Screen name="Agenda" 
                      children={() => <Agenda agendaChange={agendaChange} handleAgendaChange={handleAgendaChange} />}
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={settings_inactive} />,
                      }}
          />
          <Tab.Screen name="Map" 
                      component={Map} 
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={settings_inactive} />,
                      }}
          />
          <Tab.Screen name="Location"
                      component={Location} 
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={settings_inactive} />,
                      }}
          />
          <Tab.Screen name="Faq"
                      component={Faq} 
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={settings_inactive} />,
                      }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBDEBF',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  headerText: {
    marginLeft: 8,
    textAlign: 'left',
    fontFamily: "Phosphate_pro",
    fontSize: 28,
    color: "#4f2684",
    paddingTop: 8,
    paddingBottom: 8,
  },

  headerIconContainer: {
    padding: 8, // Adjust as needed
    borderRadius: 24, // Adjust as needed
  },

  headerIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default App
