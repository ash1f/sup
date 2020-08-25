import React, { useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar, View, ScrollView, Dimensions } from "react-native";

const { height } = Dimensions.get('window');
const color = "white"

interface ContainerProps {
  gutter: boolean,
  children: any
}

const defaultProps = {
  gutter: false,
  children: ""
}

export default function Container(props: ContainerProps = defaultProps) {
  const [screenHeight, setScreenHeight] = useState<number>(height);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={styles.scrollview}
        scrollEnabled={screenHeight > height}
        onContentSizeChange={(w, h) => setScreenHeight(h)}
      >
        <View style={[styles.content, { padding: props.gutter ? 15 : 0}]}>
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroller: {
    flex: 1
  },
  scrollview: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});