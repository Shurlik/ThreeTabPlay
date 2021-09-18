import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import YouTube from 'react-native-youtube';

const VideoDetailScreen = ({route}) => {
  const API_KEY = 'AIzaSyBRcy_dzUpcQhH4sQPRFaaL1Vax1w84Q1M';

  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );

  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    const turning = Dimensions.addEventListener('change', updateLayout);
    return () => turning.remove();
  }, []);
  const currentItem = route.params.item;

  return (
    <SafeAreaView style={styles.container}>
      <YouTube
        style={{
          height: availableDeviceWidth > availableDeviceHeight ? '100%' : '35%',
          width: '100%',
        }}
        videoId={currentItem.id.videoId}
        play={false}
        apiKey={API_KEY}
        controls={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default VideoDetailScreen;
