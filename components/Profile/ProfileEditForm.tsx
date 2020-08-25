import React, { useState, useEffect } from 'react'
import { TextInput, Text, View, StyleSheet, Alert, TouchableHighlight, ImageBackground } from 'react-native';

import Txt from '../Typography'
import WithImagePicker from '../../components/Views/WithImagePicker'
import DismissKeyboard from '../../components/Views/DismissKeyboard'
//import ProgressiveImage from "../ProgressiveImage";

import { storeAS, retrieveAS } from '../../constants/Service'
import { userkey } from '../../constants/AppConfig'
import { isEmpty } from '../../constants/Validation'
import { SaveProfile, SaveProfilePicture } from '../../services/Profile'

const imgsize = 100

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff"
  },
  avatar: {
    flexDirection: "column", 
    alignItems: "center"
  },
  avatarImg: {
    height: imgsize, 
    width: imgsize, 
    borderRadius: imgsize / 2, 
    borderColor: "#eee", 
    borderWidth: 1
  },
  inputContainer: {
    marginVertical: 8,
    flexDirection: "column",
    alignItems: "stretch"
  },
  error: {
    color: 'red',
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    color: "#fff",
    textAlign: "center"
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
  button: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#FDA50F"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 16,
    color: "#fff",
    textAlign: "center"
  },
})

const init = {
  name: "",
  company: "",
  email: "",
  profile_pic: "",
  customer_id: "",
  created_date: ""
}

const profile_default_img = require('../../assets/images/user.png');

interface ProfileEditForm {
  navigation: any
}

const ProfileEditForm = (props : ProfileEditForm) => {
  const [profile, setProfile] = useState<any>(init);
  const [errors, setErrors] = useState<Array<string>>([]);

  const updateUser = (key: string, v: string) => {
    setProfile({
      ...profile,
      [key]: v,
    })
  }

  const handleRequest = (changed: boolean) => {
    if (changed) {
      Alert.alert("Changes were made successfully");
      storeAS(userkey, {
        name: profile.name,
        profile_pic: profile.profile_pic,
        company: profile.company,
        ...profile
      }).then(() => {
        props.navigation.goBack()
      });
    } else {
      Alert.alert("Failed to make changes. Try again later or contact support");
    }
  }

  const validate = () => {
    const errs = [];
    if (isEmpty(profile.name)) {
      errs.push('Name cannot be empty')
    }
    setErrors(errs);
    return errs.length < 1 ? true : false;
  }

  const change = async () => {
    const isValid = validate();
    const params = {
      customer_id: profile.customer_id,
      name: profile.name,
      company: profile.company
    }

    if (isValid) {
      await SaveProfile(params)
        .then(result => handleRequest(result))
        .catch(() => Alert.alert("Failed to Login, check for network connectivity if not Try again later"));
    }
  }

  const updateProfilePicture = async (pic: any) => {
    await SaveProfilePicture(pic, profile.customer_id);
    updateUser('profile_pic', pic.uri);
  }
  

  useEffect(() => {
    retrieveAS(userkey).then((r) => setProfile(r))
  }, []);
  
  return (
    <DismissKeyboard>
      <View style={styles.avatar}>
        <ImageBackground 
          source={profile.profile_pic ? { uri: profile.profile_pic } : profile_default_img} 
          style={styles.avatarImg} 
          imageStyle={{ borderRadius: imgsize / 2 }}
        />
        <WithImagePicker handleImagePicker={(v: any) => updateProfilePicture(v)}>
          <Text style={{ marginVertical: 12, color: "#5FDFE0", fontSize: 18}}>Edit</Text>
        </WithImagePicker>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <Txt gutter type="label">Name</Txt>
          <TextInput
            placeholder="Enter new name"
            style={styles.input}
            value={profile.name}
            onChangeText={(v) => updateUser('name', (v))}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputContainer}>
          <Txt gutter type="label">Company</Txt>
          <TextInput
            placeholder="Enter company"
            style={styles.input}
            value={profile.company}
            onChangeText={(v) => updateUser('company', (v))}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputContainer}>
          {errors && errors.map((v: string, i: number) => (
            <Text key={`email-validity-err-${i}`} style={styles.error}>* {v}</Text>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TouchableHighlight
            onPress={change}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Change</Text>
          </TouchableHighlight>
        </View>
      </View>
    </DismissKeyboard>
  )
}

export default ProfileEditForm;