import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingViewProps,
  TouchableWithoutFeedbackProps,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface WithKeyboardProps {
  keyboard?: KeyboardAvoidingViewProps
  container?: TouchableWithoutFeedbackProps,
  children?: any
}

const WithKeyboard = (props: WithKeyboardProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} {...props.container}>
      <KeyboardAvoidingView {...props.keyboard}>
        <View>
          {props.children}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default WithKeyboard
