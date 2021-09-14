import React, {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const SongDetailScreen: FC = ({route}) => {
  const currentItem = route.params.item;
  return (
    <View style={styles.container}>
      <View style={styles.dataWrapper}>
        <Text style={styles.artist}>{currentItem.artist}</Text>
        <Image source={currentItem.artwork} style={styles.artwork} />
        <Text style={styles.title}>{currentItem.title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dataWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  artist: {
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: 35,
  },
  title: {
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: 25,
  },
  artwork: {
    height: 300,
    aspectRatio: 1,
    resizeMode: 'center',
    marginVertical: 20,
  },
});

export default SongDetailScreen;
