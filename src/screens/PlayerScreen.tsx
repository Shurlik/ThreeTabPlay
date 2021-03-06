import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import Button from '../components/Button';
import {useTheme} from '@react-navigation/native';
import music from '../../model/data';
import {useTranslation} from 'react-i18next';

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});
const PlayerScreen = () => {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [currentArtist, setCurrentArtist] = useState('Player.NoArtist');
  const [currentSong, setCurrentSong] = useState('Player.NoTracks');
  const [artwork, setArtWork] = useState();
  const setUpPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(music);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  const [devHeight, setDevHeight] = useState(Dimensions.get('window').height);
  const [devWidth, setDevWidth] = useState(Dimensions.get('window').width);
  useEffect(() => {
    const updateLayout = () => {
      setDevWidth(Dimensions.get('window').width);
      setDevHeight(Dimensions.get('window').height);
    };
    const turning = Dimensions.addEventListener('change', updateLayout);
    return () => turning.remove();
  }, []);

  const getTitle = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    setCurrentArtist(trackObject.artist);
    setCurrentSong(trackObject.title);
    setArtWork(trackObject.artwork);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.trackInfo,
          devHeight > devWidth ? {} : styles.contPortrait,
        ]}>
        <View>
          <Text style={{...styles.artist, color: colors.text}}>
            <Text style={{color: 'grey'}}>{t('Player.Artist')}:</Text>
            &nbsp;&nbsp;
            {t(currentArtist)}
          </Text>
        </View>
        <View>
          <Text style={{...styles.song, color: colors.text}}>
            <Text style={{color: 'grey'}}>{t('Player.Song')}:</Text>
            &nbsp;&nbsp;
            {t(currentSong)}
          </Text>
        </View>
      </View>
      <View
        style={[
          {alignItems: 'center'},
          devHeight > devWidth ? {} : styles.row,
        ]}>
        <View style={styles.artwork}>
          <Image
            source={artwork}
            style={[
              styles.artworkImage,
              devHeight > devWidth ? {} : styles.artworkPortraitImg,
            ]}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              TrackPlayer.skipToPrevious();
              getTitle();
            }}>
            {t('Player.Prev')}
          </Button>
          <View style={{height: '100%', justifyContent: 'space-between'}}>
            <Button
              onPress={() => {
                TrackPlayer.play();
                getTitle();
              }}>
              {t('Player.Play')}
            </Button>
            <Button
              onPress={() => {
                TrackPlayer.pause();
              }}>
              {t('Player.Pause')}
            </Button>
          </View>
          <Button
            onPress={() => {
              TrackPlayer.skipToNext();
              getTitle();
            }}>
            {t('Player.Next')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contPortrait: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  trackInfo: {
    marginTop: '10%',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  artist: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
    color: '#fff',
  },
  song: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    color: '#fff',
  },
  artworkImage: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  artworkPortraitImg: {
    width: 200,
    height: 200,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
    marginBottom: '10%',
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});
export default PlayerScreen;
