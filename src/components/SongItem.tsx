import React, {FC} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

const SongItem: FC = ({item, navigation}) => {
  const {t, i18n} = useTranslation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', {
          item: item,
        })
      }>
      <View style={styles.song}>
        <View>
          <Text style={styles.songArtist}>
            {t('Player.Artist')}:{' '}
            <Text style={{fontWeight: 'bold'}}>{item.artist}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.songTitle}>
            {t('Player.Title')}:{' '}
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;

const styles = StyleSheet.create({
  song: {
    width: '100%',
    marginVertical: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#ccc',
    padding: 20,
  },
  songArtist: {
    fontSize: 18,
    paddingVertical: 5,
  },
  songTitle: {
    fontSize: 14,
  },
});
