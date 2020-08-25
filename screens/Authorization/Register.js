import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Alert,
  TouchableHighlight,
} from "react-native";

import WithKeyboard from '../../components/Views/WithKeyboard'
import Txt from '../../components/Typography'
import PasswordStrength from '../../components/Forms/PasswordStrength'


import { isEmpty, pwdValidate } from '../../constants/Validation'
import { RegisterUser } from '../../services/Auth'
import { retrieveAS } from '../../constants/Service';
import { userEmailKey } from '../../constants/AppConfig';

const Register = ({ navigation }) => {
  const [user, setUser] = useState({ full_name: "", password: "" })
  const [errors, setErrors] = useState([]);
  const [isSubmitOnce, setIsSubmitOnce] = useState(false);


  const updateUser = (key, v) => {
    setUser({
      ...user,
      [key]: v,
    })
  }

  const validate = () => {
    const errs = [];
    if (isEmpty(user.full_name)) {
      errs.push('Name cannot be empty')
    }
    if (isEmpty(user.password)) {
      errs.push('Password cannot be empty')
    } else if (!pwdValidate(user.password)) {
      errs.push('Password is weak. must least contain 8 characters with a number')
    }
    setErrors(errs);
    return errs.length < 1 ? true : false;
  }

  const submit = async () => {
    const isValid = validate();
    const email = await retrieveAS(userEmailKey);

    const usr = {
      email,
      ...user
    }

    if (isValid) {
      await RegisterUser(usr).then((success) => {
        success ? (
          navigation.navigate("EmailOTP", {
            email: email
          })
        ) : Alert.alert("Failed to Register, check for network connectivity else Try again later");
      })
      setErrors([]);
    }
    setIsSubmitOnce(true);
  }

  return (
    <WithKeyboard keyboard={{ behavior: "padding", style: styles.login}}>
      <View style={styles.formContainer}>
        <View style={styles.loginInputContainer}>
          <View>
            <Txt gutter type="label">Full Name</Txt>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              returnKeyType="next"
              onChangeText={(e) => updateUser('full_name', e)}
            />
            <View style={styles.spacer}/>
            <Txt gutter type="label">Password</Txt>
            <TextInput
              style={styles.input}
              returnKeyType="go"
              secureTextEntry
              value={user.password}
              underlineColorAndroid="transparent"
              onChangeText={(e) => updateUser('password', e)}
            />
            {user.password ? PasswordStrength(user.password) : null}
          </View>
          <View style={styles.spacer}>
          {
            isSubmitOnce && errors && errors.map((v, i) => (
              <Txt key={`email-validity-err-${i}`} type="error">* {v}</Txt>
            ))
          }
          </View>
          <View style={styles.spacer}/>
          <TouchableHighlight
            onPress={submit}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>
              Register
            </Text>
          </TouchableHighlight>
        </View>
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
  formContainer: {
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
    textAlign: "right",
    fontSize: 18,
    color: "#34495E",
    paddingVertical: 10
  },
  spacer: {
    paddingVertical: 8
  }
});

export default Register;