import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainScreen from '../src/screens/MainScreen';
import ModalScreen from '../src/screens/ModalScreen';
import PlayerScreen from '../src/screens/PlayerScreen';
import SongDetailScreen from '../src/screens/SongDetailScreen';

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
  return (
    // @ts-ignore
    <NavigationContainer>
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
      </BottomNav.Navigator>
    </NavigationContainer>
  );
};

export default BottomTab;
