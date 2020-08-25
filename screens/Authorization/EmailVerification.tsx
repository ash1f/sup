import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Button,
  Alert
} from "react-native";

import WithKeyboard from '../../components/Views/WithKeyboard'
import Txt from '../../components/Typography'

import {VeriyEmailOTP} from '../../services/Auth'
import { isExisty } from '../../constants/Validation'
import { userEmailKey } from '../../constants/AppConfig'
import { storeAS } from '../../constants/Service'

const EmailVerification = (props: any) => {
  const cancel = React.useRef(false);
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<any>(props.navigation.getParam('email', ''))
  const [errors, setErrors] = useState<Array<string>>([])
  
  const validate = () => {
    const errs = [];
    if (!isExisty(email)) {
      errs.push('Enter a verification code')
    }
    setErrors(errs);
    return errs.length < 1 ? true : false;
  }

  const submit = async () => {
    const isValid = validate();
    if (isValid) {
      await VeriyEmailOTP(email, otp).then(result => {
        result ? 
          storeAS(userEmailKey, email).then((r) => {
            props.navigation.navigate("Login")
          })
          : Alert.alert("Verification Failed. Re-enter correct pin and try again");
      })
    }
  }

  const resend = () => {
    Alert.alert("resent")
  }
  // const getEmail = () =>  {
  //   retrieveAS(userEmailKey).then((e) => {
  //     if(!cancel.current) {
  //       setEmail(e) 
  //     }
  //   });
  // }

  return (
    <WithKeyboard keyboard={{behavior: "padding", style: styles.login}}>
      <View style={styles.loginInputContainer}>
        <View>
          <Txt type="caption1" gutter>Just one more step to complete your registration</Txt>
          <Txt type="subtitle" gutter>Verify your details by submitting the code sent to you via <Text style={{ color: "#FDA50F"}}>{email}</Text></Txt>
        </View>
        <View>
          <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              returnKeyType="next"
              keyboardType="number-pad"
              value={otp}
              onChangeText={(setOtp)}
            />
        </View>
        <View>
        <View style={styles.spacer}>
          {errors && errors.map((v: string, i: number) => (
            <Txt key={`email-validity-err-${i}`} type="error">* {v}</Txt>    
          ))}
        </View>
        <TouchableHighlight
            onPress={submit}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>
              Verify
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ marginTop: 8}}>  
          <Button title="Resend code" color="#f9a20f" onPress={resend} />
        </View>
      </View>
    </WithKeyboard>
  );
}

const styles = StyleSheet.create({
  spacer: {
    paddingVertical: 8
  },
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

export default EmailVerification;