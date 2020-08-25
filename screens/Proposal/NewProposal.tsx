import React, { useState, useEffect } from 'react';
import {
  Picker,
  Platform,
  ScrollView,
  Button,
  StyleSheet,
  ActionSheetIOS,
  TouchableHighlight,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker'


import Txt from '../../components/Typography';
import WithBackButton from '../../components/Views/WithBackButton'
import WithKeyboard from '../../components/Views/WithKeyboard'

import { GetAllCategoriesList } from '../../services/Proposals'

import { isEmptyTrimed } from '../../constants/Validation'

interface ProposalFields {
  title: string,
  description: string,
  categories: string,
  attachements: any,
  proposer: string
}

const initProposalFields = {
  title: "",
  description: "",
  categories: "",
  attachements: null,
  proposer: ""
}

export default function CreateNew(props: any) {
  const [fields, setFields] = useState<ProposalFields>(initProposalFields)
  const [errors, setErrors] = useState<Array<string>>([]);
  const [openCat, setOpenCat] = useState<boolean>(false)
  const [categories, setCategories] = useState<Array<string>>([])

  const setVal = (key: string, v: string) => {
    setFields({
      ...fields,
      [key]: v,
    })
  }

  const validate = () => {
    const errs = [];
    if (isEmptyTrimed(fields.title)) {
      errs.push('Please enter a title for the proposal')
    }
    if (isEmptyTrimed(fields.description)) {
      errs.push('You need to explain your proposal. Add a description')
    }
    if (isEmptyTrimed(fields.proposer)) {
      errs.push('Proposer name cannot be empty')
    }

    setErrors(errs);
    return errs.length < 1 ? true : false;
  }

  const fetchCategories = async () => {
    const allcategories = await GetAllCategoriesList();
    let formatted = allcategories.map((c: any) => c.name);
    setCategories(formatted)
  }

  const pickDocument = async () => {
    const res = await DocumentPicker.getDocumentAsync({})
  }

  const submit = async () => {
    const isValid = validate();
    if (isValid) {
      props.navigation.navigate("SubmitProposalSuccess");
    }
  }

  const handleSelectChange = (v: string) => {
    setOpenCat(false);
    setVal('categories', v);
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <WithBackButton back={() => props.navigation.goBack()} header={true} heading="Submit proposal">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.formContainer}>
            <WithKeyboard keyboard={{ behavior: "position" }}>
              <View style={styles.loginInputContainer}>
                <Txt gutter type="label">Category</Txt>
                <TextInput
                  style={styles.input}
                  value={fields.categories}
                  onChangeText={(e: any) => setVal('title', e.target.value)}
                  placeholder="Select a category"
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                  editable={false}
                  onTouchEndCapture={() => setOpenCat(true)}
                />

                {openCat ? Select((v) => handleSelectChange(v), categories) : null}
                {/* <Picker onValueChange={(v) => setVal('categories', v)} mode="dropdown">
                {categories.map((v, i) => <Picker.Item label={v} value={v} />)}
              </Picker> */}
                <Txt gutter type="label">Title</Txt>
                <TextInput
                  style={styles.input}
                  value={fields.title}
                  onChangeText={(t: any) => setVal('title', t)}
                  placeholder="Title for your idea"
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                />
                <Txt gutter type="label">Description</Txt>
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  multiline={true}
                  value={fields.description}
                  onChangeText={(t: any) => setVal('description', t)}
                  returnKeyType="go"
                  placeholder="Explain your idea"
                  underlineColorAndroid="transparent"
                />
                <Txt gutter type="label">Name of proposer</Txt>
                <TextInput
                  style={styles.input}
                  onChangeText={(t: any) => setVal('proposer', t)}
                  value={fields.proposer}
                  placeholder="Enter proposer name"
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                />
                <Txt gutter type="label">Relevant documents</Txt>
                <Button title="Upload   " onPress={pickDocument}></Button>
                {errors && errors.map((v: string, i: number) => (
                  <Txt key={`email-validity-err-${i}`} type="error">* {v}</Txt>
                ))}
              </View>
              {/* <View style={styles.formSpacer}/> */}
            </WithKeyboard>
          </View>
        </ScrollView>
      </View>
      <View>
        <TouchableHighlight
          onPress={submit}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Send Proposal</Text>
        </TouchableHighlight>
      </View>
    </WithBackButton>
  );
}

function Select(onChange: (n: string) => void, categories: Array<string>) {
  const El = Platform.OS === "ios"
    ? (ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...categories, 'Reset'],
        cancelButtonIndex: categories.length
      },
      (buttonIndex) => {
        if (buttonIndex < categories.length) {
          onChange(categories[buttonIndex])
        } else {
          onChange('')
        }
      },
    ))
    : <Picker onValueChange={(v) => onChange(categories[v])}>
      {categories.map((v, i) => <Picker.Item label={v} value={i} />)}
    </Picker>

  return El;
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
  formSpacer: {
    height: 70,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginVertical: 24,
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
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 16,
    color: "#fff",
    textAlign: "center"
  },
});
