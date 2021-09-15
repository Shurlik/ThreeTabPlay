import React from 'react';
import {SafeAreaView, StyleSheet, Switch} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../store/theme/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SwitchScreen = () => {
  const paperTheme = useTheme();
  const dispatch = useDispatch();
  const themeIsDark = useSelector(state => state.theme.isDark);

  const toggleSwitch = async () => {
    await storeData('theme', !themeIsDark);
    dispatch(setTheme(!themeIsDark));
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SwitchScreen;
