import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Alert
} from "react-native";

import WithKeyboard from '../../components/Views/WithKeyboard'
import Txt from '../../components/Typography';

import { isExisty, isEmail } from '../../constants/Validation'
import { storeAS } from '../../constants/Service'
import { userEmailKey } from '../../constants/AppConfig'
import { ValidateEmail } from '../../services/Auth'

const EmailValidity = (props: any) => {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<Array<string>>([]);
  const [isSubmitOnce, setIsSubmitOnce] = useState<boolean>(false);

  const validate = () => {
    const errs = [];
    if (!isExisty(email)) {
      errs.push('Email cannot be empty')
    } else if (!isEmail(email)) {
      errs.push('Email should be valid')
    }

    setErrors(errs);
    return errs.length < 1 ? true : false;
  }

  const submit = async () => {
    const isValid = validate();
    if (isValid) {
      await ValidateEmail(email).then(result => {
        result ? (
          storeAS(userEmailKey, email).then((r) => {
            props.navigation.navigate(result, {
              email: email
            })
          })) : Alert.alert("Failed to Validate, check for network connectivity if not try again");
      })
    }
    setIsSubmitOnce(true);
  }

  return (
    <WithKeyboard keyboard={{behavior:"padding", style: styles.login}} container={{ }}>
        <View style={styles.loginInputContainer}>
          <Txt type="subtitle" gutter>If you're already member you will be redirected to enter the password</Txt>
          <TextInput
            placeholder="Email"
            style={styles.input}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />
          {
            isSubmitOnce && errors && errors.map((v: string, i: number) => (
              <View style={styles.spacer}>
                <Txt key={`email-validity-err-${i}`} type="error">* {v}</Txt>
              </View>
            ))
          }
          <View style={styles.spacer}></View>
          <TouchableHighlight
            onPress={submit}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>
              Get Started
            </Text>
          </TouchableHighlight>
        </View>
      </WithKeyboard>
  );
}


const styles = StyleSheet.create({
  login: {
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "stretch",
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",

  },
  logo: {
    width: 125,
    height: 125
  },
  subcontext: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loginInputContainer: {
    paddingHorizontal: 30,
    justifyContent: "center"
  },
  input: {
    paddingHorizontal: 16,
    height: 60,
    fontSize: 20,
    fontWeight: "600",
    color: "#4f474d",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0, 0.03)"
  },
  spacer: {
    paddingVertical: 8
  },
  loginButton: {
    padding: 16,
    borderRadius: 10,
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
  link: {
    fontSize: 16,
    fontWeight: "600"
  }
});

export default EmailValidity;