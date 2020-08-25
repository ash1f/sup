import React from 'react'
import { TextInputProps, TextInput, View, Text, StyleSheet} from 'react-native'

interface BaseInputProps {
  label: string,
  onChangeText: () => any,
  value: any,
  placeholder: string,
  children: any,
  input: TextInputProps
}

const BaseInput = (props: BaseInputProps) => {
  const {label, onChangeText, value, placeholder, children, input} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...{...input, onChangeText, placeholder, value}}/>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  label: {},
  input: {
    paddingHorizontal: 16,
    minHeight: 60,
    fontSize: 20,
    fontWeight: "600",
    color: "#4f474d",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0, 0.03)"
  },
});


export default BaseInput;
