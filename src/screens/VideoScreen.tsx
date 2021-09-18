import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import VideoItem from '../components/VideoItem';

const VideoScreen = () => {
  const API_KEY = 'AIzaSyBRcy_dzUpcQhH4sQPRFaaL1Vax1w84Q1M';
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [value, setValue] = useState('');
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const link = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${value.trim()}&type=video&key=${API_KEY}`;
  const getData = async () => {
    const response = await fetch(link);
    const data = await response.json();
    setCardData(data.items);
  };
  const searchHandler = async () => {
    setLoading(true);
    await getData();
    setValue('');
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: colors.text}}>{t('Video.Header')}</Text>
      <TextInput
        style={{...styles.input, color: colors.text, borderColor: colors.text}}
        onChangeText={setValue}
        value={value}
      />
      <Button title={t('Video.Get')} onPress={searchHandler} />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="darkblue" />
        </View>
      )}
      {!loading && (
        <FlatList
          style={styles.videoList}
          data={cardData}
          renderItem={({item}) => <VideoItem item={item} />}
          keyExtractor={item => item.id.videoId}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  videoList: {
    width: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default VideoScreen;
