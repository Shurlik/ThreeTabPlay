import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Switch} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, connect} from 'react-redux';
import {setTheme} from '../store/theme/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

const SwitchScreen = ({themeIsDark}) => {
  const [lang, setLang] = useState('en');

  const paperTheme = useTheme();
  const dispatch = useDispatch();

  const toggleSwitch = async () => {
    await storeData('theme', !themeIsDark);
    dispatch(setTheme(!themeIsDark));
  };

  const langSwitch = async () => {
    setLang(lang === 'en' ? 'ru' : 'en');
    await i18next.changeLanguage(lang);
  };

  const storeData = async (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Switch
        trackColor={{false: 'lightblue', true: '#ccc'}}
        thumbColor={paperTheme.dark ? 'red' : 'lightgreen'}
        ios_backgroundColor="#ccc"
        onValueChange={toggleSwitch}
        value={paperTheme.dark}
      />
      <Switch
        trackColor={{false: 'lightgreen', true: '#c0c0c0'}}
        thumbColor={paperTheme.dark ? 'yellow' : 'lightblue'}
        ios_backgroundColor="#ccc"
        onValueChange={langSwitch}
        value={lang === 'en'}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    themeIsDark: state.theme.isDark,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(SwitchScreen);
