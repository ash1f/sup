import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Forums from '../../components/Card/ForumBlock'
import { Icon } from 'react-native-eva-icons';

const Btn = ({ handler }) => {
  return (
    <TouchableOpacity onPressOut={handler} style={styles.btn}>
      <Icon name="plus-outline"
        height={24}
        width={24}
        fill="#ffffff"
      />
    </TouchableOpacity>
  );
}

const cardImage = "https://img1-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/30194/large_thumb_stage.jpg"; //"require('../../assets/images/card-example.jpg')";
const cardImage2 = "https://pub-static.haozhaopian.net/assets/projects/pages/0d24bbb0-4de9-11e8-a15a-efef5e248622_47377da7-e849-4493-9b3b-d76db1a30e73_thumb.jpg"; //"require('../../assets/images/empty-state.jpg');"

const forums = [
  {
    title: 'Hitting "forgot password" more than "login"',
    responsecount: 0,
    date: "1 day ago"
  },
  {
    title: 'What do teams at Square, Airbnb, and Spotify have in common?',
    responsecount: 2,
    date: "20 August"
  }
];

export default Btn;

const styles = StyleSheet.create({
  btn: {
    overflow: "visible",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5
    },
    position: "absolute",
    bottom: 32,
    right: 16,
    shadowColor: "#000000",
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#89706e',
    zIndex: 100
  },
});
