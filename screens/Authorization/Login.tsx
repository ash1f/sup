import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Alert
} from "react-native";

import {AppContext} from '../../Provider'

import WithKeyboard from '../../components/Views/WithKeyboard'
import Txt from '../../components/Typography';

import {isEmpty} from '../../constants/Validation'
import {retrieveAS, storeAS} from '../../constants/Service'
import {userkey,userEmailKey} from '../../constants/AppConfig'
import {CheckLogin} from '../../services/Auth'

const Login = (props: any) => {
  const {saveToken} = useContext(AppContext);
  const [password, setPwd] = useState<string>("");
  const [errors, setErrors] = useState<Array<string>>([]);
  const [invalidPwd, setInvalidPwd] = useState<boolean>(false);

  const validate = () => {
    const errs = [];
    if (isEmpty(password)) {
      errs.push('Pasword cannot be empty')
    }

    setErrors(errs);
    return errs.length < 1 ? true : false;
  }

  const submit = async () => {
    const isValid = validate();
    const email = await retrieveAS(userEmailKey);
    const user = {
      password,
      email
    }

    if(isValid){
      await CheckLogin(user).then(result => {
        result ? (
          storeAS(userkey, result).then((r) => {
            saveToken(result.auth_token)
            props.navigation.navigate("Dashboard")
          })) : setInvalidPwd(true)
      }).catch(() => Alert.alert("Failed to Login, check for network connectivity if not Try again later"));
    }
  }

  return (
    <WithKeyboard  keyboard={{behavior: "padding", style:styles.login}}>
      <View>
        <View style={styles.loginInputContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            returnKeyType="go"
            value={password}
            onChangeText={setPwd}
            underlineColorAndroid="transparent"
          />
          <View style={styles.spacer}>
           {errors && errors.map((v: string, i: number) => (
              <Txt key={`email-validity-err-${i}`} type="error">* {v}</Txt>
            ))}
          {invalidPwd ? <Txt key={`email-validity-err-0`} type="error">* Failed to login. Retry with correct password</Txt> : null}
          </View>
          <View style={styles.spacer} />
          <TouchableHighlight
            onPress={submit}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </TouchableHighlight>
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
    backgroundColor: "rgba(0,0,0, 0.03)",
  },
  loginButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#FDA50F"
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

export default Login;