import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Container from '../../components/Views/Container'
import Events from '../../components/Card/EventsCard';
import FloatingAction from '../../components/Buttons/FloatingActions.js';

const cardImage = "https://img1-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/30194/large_thumb_stage.jpg"; //"require('../../assets/images/card-example.jpg')";
const cardImage2 = "https://pub-static.haozhaopian.net/assets/projects/pages/0d24bbb0-4de9-11e8-a15a-efef5e248622_47377da7-e849-4493-9b3b-d76db1a30e73_thumb.jpg"; //"require('../../assets/images/empty-state.jpg');"

const events = [
  {
    img: {
      url: cardImage2
    },
    name: 'Special Event',
    time: '5pm, 1 August 2016',
    description: 'Reference this table when designing your app’s interface, and make sure',
    location: "Dubai, UAE"
  },
  {
    img: {
      url: cardImage
    },
    name: 'My favourite Event',
    time: '10pm, 31 August 2016',
    description: 'Reference this table when designing your app’s interface, and make sure',
    location: "Mayfair London"
  }
];

export default function EventsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <FloatingAction handler={() => navigation.navigate("CreateNew")} />
      <Container>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Events events={events} handler={() => navigation.navigate("Event")} />
      </ScrollView>
    </Container >
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#ecf0f1',
    width: "100%"
  },
  contentContainer: {
    paddingTop: 16,
  },
  wrapper: {
    flex: 1
  },
  getStartedContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
