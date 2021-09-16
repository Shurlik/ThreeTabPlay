import React from 'react';
import {SafeAreaView, StyleSheet, Switch, View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, connect} from 'react-redux';
import {setTheme} from '../store/theme/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import {setCurrLang} from '../store/lang/actions';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SwitchScreen = ({themeIsDark, lang}) => {
  const paperTheme = useTheme();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();

  const toggleSwitch = async () => {
    await storeData('theme', !themeIsDark);
    dispatch(setTheme(!themeIsDark));
  };

  const langSwitch = async () => {
    const newLang = lang === 'en' ? 'ru' : 'en';
    dispatch(setCurrLang(newLang));
    await i18next.changeLanguage(newLang);
    await storeData('lang', newLang);
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
      <View style={styles.switchWrapper}>
        <MaterialCommunityIcons
          name="weather-sunny"
          size={26}
          color={paperTheme.dark ? '#fff' : '#000'}
        />
        <Switch
          trackColor={{false: 'lightblue', true: '#ccc'}}
          thumbColor={paperTheme.dark ? 'red' : 'lightgreen'}
          ios_backgroundColor="#ccc"
          onValueChange={toggleSwitch}
          value={paperTheme.dark}
          style={styles.switch}
        />
        <MaterialCommunityIcons
          name="weather-night"
          size={26}
          color={paperTheme.dark ? '#fff' : '#000'}
        />
      </View>
      <View style={styles.switchWrapper}>
        <Text style={{color: colors.text}}>{t('Switch.Eng')}</Text>
        <Switch
          trackColor={{false: 'lightgreen', true: '#c0c0c0'}}
          thumbColor={paperTheme.dark ? 'yellow' : 'lightblue'}
          ios_backgroundColor="#ccc"
          onValueChange={langSwitch}
          value={lang !== 'en'}
          style={styles.switch}
        />
        <Text style={{color: colors.text}}>{t('Switch.Rus')}</Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    themeIsDark: state.theme.isDark,
    lang: state.lang.currentLang,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchWrapper: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  switch: {
    marginHorizontal: 10,
    flexShrink: 2,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(SwitchScreen);
