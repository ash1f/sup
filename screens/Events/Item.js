import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
} from 'react-native';
import Txt from '../../components/Typography';
import WithBackButton from '../../components/Views/WithBackButton'


const event = {
  name: "Dubai Datathon",
  img: {
    uri: "https://winatweb.com/wp-content/uploads/2019/04/what-is-a-blog.png"
  },
  date: "20 August 2019",
  location: "Dubai, UAE",
  desc: "MindManager and XMind are mind mapping software.MindManager is easy to manage the project.It can improve the effectiveness andcollaboration of teamwork. Mind helps youstart brainstorming at any time.It supportsvarious ways to demo, such as mind mapping,fishbone diagram, tree diagram and so on.Itdoesn’t matter which software you use, so longas it fits your habits."
}


export default function EventsScreen({ title = "", img = "", navigation}) {
  return (
    <WithBackButton back={() => navigation.goBack()} header={true}>
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <EventItem  {...event} />
      </ScrollView>
    </View>
    </WithBackButton>
  );
}

const EventItem = ({ name = "", img = "", date = "", location = "", desc = "" }) => (

  <View style={styles.content}>
    <Txt type="headline">{name}</Txt>
    <View style={styles.headline}>
      <View style={styles.sub}>
        <Txt type="caption1">{location}</Txt>
      </View>
      <View style={{ widthL: 16 }} />
      <View style={styles.sub}>
        <Txt type="caption1" >{date}</Txt>
      </View>
    </View>
    <ImageBackground style={styles.bgImage} source={img} />
    <View style={styles.Headline}>
      <View style={styles.divider}></View>
      <Txt gutter type="paragraph">{desc}</Txt>
    </View>
  </View>
)


const styles = StyleSheet.create({
  bgImage: {
    height: 250,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 0 },
    borderRadius: 10
  },
  headline: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  divider: {
    height: 24
  },
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
