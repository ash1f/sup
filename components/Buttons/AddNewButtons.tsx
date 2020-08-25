import React from 'react'
import { View, TouchableHighlight, Text, StyleSheet,  } from 'react-native';
import { Icon } from 'react-native-eva-icons';

interface AddNewButtonProps {
  label: string,
  icon: string,
  onClick?: () => any
}

let color = "#286790";

export default function AddNewButton(props: AddNewButtonProps) {
  const { label, icon, onClick } = props;
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.btn} onPress={onClick} underlayColor="rgba(0,0,0,0)">
        <>
          <Icon name={icon} fill={color} width={30} height={30} />
          <Text style={styles.text}>{label}</Text>
        </>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 4
  },
  btn: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
  },
  icon: {
    color: color,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: -4,
    paddingHorizontal: 16,
    color: color,
    textAlign: "center"
  }
});
