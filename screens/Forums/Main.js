import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import Container from '../../components/Views/Container'
import ForumsList from '../../containers/Forum/ForumsList'
import FloatingAction from '../../components/Buttons/FloatingActions.js';

export default function BlogsScreen({ navigation }) {
  return (
    <Container>
      <FloatingAction handler={() => navigation.navigate("CreateNew")} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <ForumsList nav={navigation} />
      </ScrollView>
    </Container>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
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
