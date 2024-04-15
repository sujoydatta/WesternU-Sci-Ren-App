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
import Events from './pages/events';
import Map from './pages/map';
import Faq from './pages/faq';
import Agenda from './pages/agenda';

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
    Roboto_700Bold
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
        <View style={styles.headerIconContainer}>
          <Image source={icon} style={styles.headerIcon} />
        </View>
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

            if (route.name === 'Home') {
              iconName = focused ? './assets/settings_inactive.svg' : './assets/settings_inactive.svg';
            } else if (route.name === 'Agenda') {
              iconName = focused ? './assets/Active/agenda_active.svg' : './assets/Inactive/agenda_inactive.svg';
            } else if (route.name === 'Map') {
              iconName = focused ? './assets/Active/map_active.svg' : './assets/Inactive/map_inactive.svg';
            } else if (route.name === 'Events') {
              iconName = focused ? './assets/Active/location_active.svg' : './assets/Inactive/location_inactive.svg';
            } else if (route.name === 'Faq') {
              iconName = focused ? './assets/Active/FAQ_active.svg' : './assets/Inactive/FAQ_inactive.svg';
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
          <Tab.Screen name="Home" 
                      component={Home} 
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={require('./assets/settings_inactive.svg')} />,
                      }} 
          />
          <Tab.Screen name="Agenda" 
                      children={() => <Agenda agendaChange={agendaChange} />}
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={require('./assets/settings_inactive.svg')} />,
                      }}
          />
          <Tab.Screen name="Map" 
                      component={Map} 
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={require('./assets/settings_inactive.svg')} />,
                      }}
          />
          <Tab.Screen name="Events"
                      children={() => <Events handleAgendaChange={handleAgendaChange} />} 
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={require('./assets/settings_inactive.svg')} />,
                      }}
          />
          <Tab.Screen name="Faq"
                      component={Faq} 
                      options={{
                        header: () => <CustomHeader title="SCIENCE RENDEZVOUS" icon={require('./assets/settings_inactive.svg')} />,
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
    display: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  headerText: {
    marginLeft: 8,
    textAlign: 'left'
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
