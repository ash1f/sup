import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import Txt from '../../components/Typography';


export default function SubmitProposalSuccess(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Txt type="caption2" style={{ fontSize: 20}}>Thank you !</Txt>
        <Txt type="caption2" style={{ fontSize: 20}} gutter>Your proposal has reached us !</Txt>
        <Txt type="subtitle">We will go through your proposal and get back to you within 2 to 3 days</Txt>
      </View>
      <View style={styles.inner}>
          <TouchableHighlight
            onPress={() => props.navigation.navigate("Dashboard")}
            style={styles.loginButton}
          >
          <Text style={styles.loginButtonText}>Take me home</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "stretch",
    flex: 1,
    backgroundColor: "#fff"
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "stretch"
  },
  loginInputContainer: {
    justifyContent: "center"
  },
  loginButton: {
    padding: 16,
    backgroundColor: "#FDA50F"
    //marginTop: 25
    //marginBottom: 300
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 16,
    color: "#fff",
    textAlign: "center"
  },
});
