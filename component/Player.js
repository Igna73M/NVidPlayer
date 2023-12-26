import * as React from 'react';
import { View, StyleSheet, Button,TouchableHighlight,Image,Dimensions,Text } from 'react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS,Video, ResizeMode } from 'expo-av';
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";


class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

// Playlist contains videos or audio list to play
const PLAYLIST = [
  new PlaylistItem(
    "Comfort Fit - “Sorry”",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    false
  ),
  new PlaylistItem(
    "Big Buck Bunny",
    "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    true
  ),
  new PlaylistItem(
    "Mildred Bailey – “All Of Me”",
    "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    false
  ),
  new PlaylistItem(
    "Popeye - I don't scare",
    "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    true
  ),
  new PlaylistItem(
    "Podington Bear - “Rubber Robot”",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    false
  )
];

// Import/Define icons

const ICON_PLAY_BUTTON = new Icon( require('./icons/play-regular-24.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon( require('./icons/pause-regular-24.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon( require('./icons/stop-regular-24.png'), 22, 22);
const ICON_FORWARD_BUTTON = new Icon( require('./icons/fast-forward-regular-24.png'), 33, 25);
const ICON_BACK_BUTTON = new Icon( require('./icons/fast-backward-regular-24.png'), 33, 25);
const ICON_LOOP_ALL_BUTTON = new Icon( require('./icons/undo-regular-24.png'), 77, 35);
const ICON_LOOP_ONE_BUTTON = new Icon( require('./icons/undo-all-regular-24.png'), 77, 35);
const ICON_MUTED_BUTTON = new Icon( require('./icons/volume-mute-solid-24.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new Icon( require('./icons/volume-full-solid-24.png'), 67, 58);





function Player ()
{

  const video = React.useRef(null);
  const [ status, setStatus ] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        orientation='portrait'
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
  },
  video: {
    alignSelf: 'center',
    width: 400,
    height: 800
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Player;