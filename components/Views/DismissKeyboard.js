import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View, KeyboardAvoidingView } from 'react-native';

const DismissKeyboardHOC = (Comp) => {
  return (props) => (
    <TouchableWithoutFeedback onPressIn={Keyboard.dismiss} onAccessibilityAction={Keyboard.dismiss} accessible={false}>
      <Comp {...props} />
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View)

export default DismissKeyboardView;