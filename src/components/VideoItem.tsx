import React, {FC} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

const VideoItem: FC = ({item}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('VideoDetail', {
          item: item,
        })
      }>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${item.id.videoId}/maxresdefault.jpg`,
          }}
          style={styles.image}
          alt={'Video Image'}
        />
        <View style={styles.videoWrapper}>
          <Text style={{...styles.videoTitle, color: colors.text}}>
            {item.snippet.title}
          </Text>
          <Text style={{...styles.videoChannel, color: colors.text}}>
            {item.snippet.channelTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    flexDirection: 'row',
    margin: 6,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    height: 100,
    width: '30%',
  },
  videoWrapper: {
    flexShrink: 1,
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  videoTitle: {
    textAlign: 'center',
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  videoChannel: {
    textAlign: 'center',
  },
});

export default VideoItem;
