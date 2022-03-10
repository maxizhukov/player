import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Sound from 'react-native-sound';

interface IProps {
  route: any;
}

interface IPlay {
  title: string;
  state: 'play' | 'stop';
}

Sound.setCategory('Playback');

const TracksList = (props: IProps) => {
  const [playedSongTitle, setPlayedSongTitle] = useState('');
  const [soundState, setSoundState] = useState<any>(null);
  const [songPlayState, setSongPlayState] = useState<
    'not_played' | 'play' | 'paused'
  >('not_played');

  const handlePlayButton = (data: any) => {
    if (data.title === playedSongTitle && songPlayState === 'paused') {
      setSoundState('play');
      resumeSound();
    }

    // Working mp3 url:
    // https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3

    setSongPlayState('play');
    setPlayedSongTitle(data.title);
    const sound = new Sound(data.media.mp3.url, '', error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    setSoundState(sound);
    sound.play();
  };

  const pauseSound = () => {
    setSongPlayState('paused');
    soundState.pause();
  };

  const resumeSound = () => {
    soundState.resume();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: props.route.params.banner}}
        resizeMode="cover"
        imageStyle={{borderRadius: 10}}
        style={styles.title_image}>
        <View style={styles.title_image_box}>
          <Text style={styles.title_image_title}>
            {props.route.params.title}
          </Text>
        </View>
      </ImageBackground>
      <Text style={{marginTop: 10, marginBottom: 10}}>
        {`Available tracks: (${props.route.params.tracks.length})`}
      </Text>
      {props.route.params.tracks && props.route.params.tracks.length ? (
        <ScrollView>
          {props.route.params.tracks.map((track: any, idx: number) => (
            <TouchableOpacity
              key={`${track.title}_${idx.toString()}`}
              style={styles.track_item}>
              <View>
                <Text>{track.title}</Text>
              </View>
              {soundState &&
              playedSongTitle === track.title &&
              songPlayState !== 'paused' ? (
                <TouchableOpacity onPress={() => pauseSound()}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../assets/pause.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handlePlayButton(track)}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../assets/play_icon.png')}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>No tracks</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title_image: {
    width: '100%',
    height: 100,
  },
  title_image_box: {
    alignSelf: 'flex-start',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_image_title: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    paddingLeft: 7,
    paddingTop: 5,
    paddingRight: 7,
    paddingBottom: 5,
  },
  track_item: {
    width: '100%',
    height: 50,
    borderColor: '#cecece',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TracksList;
