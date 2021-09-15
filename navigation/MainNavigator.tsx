import React from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DarkTheme as navigationDarkTheme,
  DefaultTheme as navigationDefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTeam,
} from 'react-native-paper';

import MainScreen from '../src/screens/MainScreen';
import ModalScreen from '../src/screens/ModalScreen';
import PlayerScreen from '../src/screens/PlayerScreen';
import SongDetailScreen from '../src/screens/SongDetailScreen';
import SwitchScreen from '../src/screens/SwitchScreen';

type RootStackParamList = {
  Main: undefined;
  Modal: undefined;
  Player: undefined;
};

const BottomNav = createBottomTabNavigator<RootStackParamList>();
const SongsStack = createNativeStackNavigator();

function SongsStackScreen() {
  MaterialCommunityIcons.loadFont(); // Using for Ios
  return (
    <SongsStack.Navigator>
      <SongsStack.Screen name="Home" component={MainScreen} />
      <SongsStack.Screen name="Detail" component={SongDetailScreen} />
    </SongsStack.Navigator>
  );
}

const BottomTab = () => {
  const themeIsDark = useSelector(state => state.theme.isDark);

  const customDefTheme = {
    ...navigationDefaultTheme,
    ...PaperDefaultTeam,
    colors: {
      ...navigationDefaultTheme.colors,
      ...PaperDefaultTeam.colors,
      title: 'darkblue',
    },
  };

  const customDarkTheme = {
    ...navigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...navigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      title: 'lightblue',
    },
  };

  const currentTheme = themeIsDark ? customDefTheme : customDarkTheme;

  return (
    <PaperProvider theme={currentTheme}>
      <StatusBar barStyle={themeIsDark ? 'dark-content' : 'light-content'} />
      <NavigationContainer theme={currentTheme}>
        <BottomNav.Navigator
          initialRouteName={'Main'}
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {backgroundColor: '#ccc', paddingTop: 10},
          }}>
          <BottomNav.Screen
            name={'Main'}
            component={SongsStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <BottomNav.Screen
            name={'Modal'}
            component={ModalScreen}
            options={{
              tabBarLabel: 'Modal',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="hail" color={color} size={26} />
              ),
            }}
          />
          <BottomNav.Screen
            name={'Player'}
            component={PlayerScreen}
            options={{
              tabBarLabel: 'Music',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="music-circle"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <BottomNav.Screen
            name={'Switcher'}
            component={SwitchScreen}
            options={{
              tabBarLabel: 'Switch',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="circle" color={color} size={26} />
              ),
            }}
          />
        </BottomNav.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default BottomTab;
