import React from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
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
import {useTranslation} from 'react-i18next';

import MainScreen from '../src/screens/MainScreen';
import ModalScreen from '../src/screens/ModalScreen';
import PlayerScreen from '../src/screens/PlayerScreen';
import SongDetailScreen from '../src/screens/SongDetailScreen';
import SwitchScreen from '../src/screens/SwitchScreen';
import VideoScreen from '../src/screens/VideoScreen';
import VideoDetailScreen from '../src/screens/VideoDetailScreen';

type RootStackParamList = {
  Main: undefined;
  Modal: undefined;
  Player: undefined;
};

const BottomNav = createBottomTabNavigator<RootStackParamList>();
const SongsStack = createNativeStackNavigator();
const VideoStack = createNativeStackNavigator();

MaterialCommunityIcons.loadFont(); // Using for Ios
function SongsStackScreen() {
  return (
    <SongsStack.Navigator>
      <SongsStack.Screen name="Home" component={MainScreen} />
      <SongsStack.Screen name="Detail" component={SongDetailScreen} />
    </SongsStack.Navigator>
  );
}

function VideoStackScreen() {
  return (
    <VideoStack.Navigator>
      <VideoStack.Screen
        name="Video"
        component={VideoScreen}
        options={{headerShown: false}}
      />
      <VideoStack.Screen
        name="VideoDetail"
        component={VideoDetailScreen}
        options={{title: ''}}
      />
    </VideoStack.Navigator>
  );
}

const BottomTab = ({themeIsDark}) => {
  const {t, i18n} = useTranslation();

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
              tabBarLabel: t('Home.Header'),
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <BottomNav.Screen
            name={'Modal'}
            component={ModalScreen}
            options={{
              tabBarLabel: t('Modal.Header'),
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="hail" color={color} size={26} />
              ),
            }}
          />
          <BottomNav.Screen
            name={'Player'}
            component={PlayerScreen}
            options={{
              tabBarLabel: t('Player.Header'),
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
            name={'VideoStack'}
            component={VideoStackScreen}
            options={{
              tabBarLabel: t('Video.Header'),
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="video" color={color} size={26} />
              ),
            }}
          />
          <BottomNav.Screen
            name={'Switcher'}
            component={SwitchScreen}
            options={{
              tabBarLabel: t('Switch.Header'),
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

const mapStateToProps = state => {
  return {
    themeIsDark: state.theme.isDark,
  };
};

export default connect(mapStateToProps)(BottomTab);
