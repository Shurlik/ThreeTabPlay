import * as React from 'react';
import {Text, StyleSheet, SafeAreaView, FlatList, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import SongItem from '../components/SongItem';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../store/theme/actions';
import {setCurrLang} from '../store/lang/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import music from '../../model/data';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';

const MainScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const retrieveData = async (key, setter) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        dispatch(setter(value));
        return value;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  useEffect(async () => {
    retrieveData('theme', setTheme);
    const lang = await retrieveData('lang', setCurrLang);
    if (lang) {
      await i18next.changeLanguage(lang);
    }
    setLoaded(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!loaded && (
        <View style={styles.content}>
          <Text>Loading....</Text>
        </View>
      )}
      {loaded && (
        <View style={styles.content}>
          <Text style={{...styles.title, color: colors.text}}>
            {t('Player.Tracks')}
          </Text>
          <FlatList
            style={styles.musicList}
            data={music}
            renderItem={({item}) => (
              <SongItem item={item} navigation={navigation} />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // flex: 1,
    alignItems: 'center',
  },
  title: {
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },
  musicList: {
    width: '100%',
  },
});
export default MainScreen;
