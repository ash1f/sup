import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  View,
} from 'react-native';
import Txt from '../../components/Typography';
import WithBackButton from '../../components/Views/WithBackButton'


export default function CreateNew({ navigation }) {
  return (
    <WithBackButton back={() => navigation.goBack()} header={true} heading="Create">
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.loginInputContainer}>
          <Txt gutter type="label">Title</Txt>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
          <Txt gutter type="label">Description</Txt>
          <TextInput
            style={styles.input}
            multiline
            returnKeyType="go"
            underlineColorAndroid="transparent"
          />
        </View>
      </ScrollView>
      <View>
        <TouchableHighlight
          onPress={() => alert("Register here")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>
            Register
              </Text>
        </TouchableHighlight>
      </View>
    </View>
    </WithBackButton>
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "stretch"
  },
  loginInputContainer: {
    justifyContent: "center"
  },
  input: {
    paddingHorizontal: 16,
    height: 60,
    fontSize: 20,
    fontWeight: "600",
    color: "#4f474d",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0, 0.03)",
    marginBottom: 20
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
