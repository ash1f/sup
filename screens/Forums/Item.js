import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import WithBackButton from '../../components/Views/WithBackButton';
import Container from '../../components/Views/Container'

import SingleForum from '../../containers/Forum/SingleForums'

const defs = {
  id: "",
  title: "",
  desc: "",
  date: "",
  responseCount: 0,
  user: {
    name: "",
    profile_pic: ""
  }
}

export default function EventsScreen({ navigation }) {
  const forums = JSON.parse(navigation.getParam('forum_item')) || defs;
  return (
    <View style={styles.container}>
      <Container>
        <SingleForum {...forums} />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    flexDirection: 'column'
  }
});
