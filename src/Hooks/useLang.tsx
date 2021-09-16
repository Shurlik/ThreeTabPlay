import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import {setCurrLang} from '../store/lang/actions';

export const useLang = async () => {
  const lang = useSelector(state => state.lang.currentLang);
  const dispatch = useDispatch();
  const storeData = async (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  return async () => {
    const newLang = lang === 'en' ? 'ru' : 'en';
    dispatch(setCurrLang(newLang));
    await i18next.changeLanguage(newLang);
    await storeData('lang', newLang);
  };
};
