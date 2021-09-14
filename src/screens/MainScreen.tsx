import * as React from 'react';
import {Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import SongItem from '../components/SongItem';

import music from '../../model/data';

const MainScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tracks</Text>
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
