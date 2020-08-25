import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { Icon } from 'react-native-eva-icons';

interface ListLink {
  title: string,
  subtitle?: string,
  goto: () => void,
}

const ListLink = (props: ListLink) => {
  return (
    <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={props.goto}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          {props.subtitle ? <Text style={styles.subtitle}>{props.subtitle}</Text> : null}
        </View>
        <Icon name="arrow-right-outline" height={25} width={25} />
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height: 60,
    paddingVertical: 4,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: "#222",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: "#555"
  }
});

export default ListLink;