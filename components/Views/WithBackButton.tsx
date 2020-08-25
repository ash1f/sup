import React, { Children } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Icon } from 'react-native-eva-icons';
import Txt from '../Typography'

interface WithBackButtonProps{
  back?: () => void,
  children: any,
  direction?: "down" | "left" | "right" | "up",
  header?: boolean,
  heading?: string
}

const WithBackButton = (props: WithBackButtonProps) => {
  return (
    <View style={styles.container}>
      {props.header ? <View style={styles.header}>{props.heading ? <Txt type="subtitle">{props.heading}</Txt> : null}</View> : null}
      <TouchableOpacity onPressIn={props.back} style={styles.btn}>
        <Icon
          name={`arrow-${props.direction ? props.direction : "left"}-outline`}
          height={24}
          width={24}
          fill="#FDA50F"
        />
      </TouchableOpacity>
      <View style={{ flex: 1}}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 16,
    height: 72,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  btn: {
    overflow: "visible",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5
    },
    position: "absolute",
    top: 20,
    left: 16,
    shadowColor: "#000000",
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 100
  },
});

export default WithBackButton;
