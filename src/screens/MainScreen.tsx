import * as React from 'react';
import {Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import SongItem from '../components/SongItem';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setTheme} from '../store/theme/actions';
import {setCurrLang} from '../store/lang/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import music from '../../model/data';
import {useTranslation} from 'react-i18next';

const MainScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const retrieveData = async (key, setter) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        dispatch(setter(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveData('theme', setTheme);
    // retrieveData('lang', setCurrLang);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
