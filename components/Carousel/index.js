import React, { useState, useRef } from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Txt from '../Typography'
import Carousel from 'react-native-snap-carousel';
// import { Card } from '../components/Card/EventsCard'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const IS_IOS = Platform.OS === 'ios';
const slideWidth = wp(90);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 10;


const arrs = [
  {
    title: "Props, methods and getters",
    content: "In order to let you to create mighty carousels and to keep up with your requests, we add new features on a regular basis."
  },
  {
    title: "Usage",
    content: ":warning: Therefore you should always check if the issue you experience also happens in a production environment. This is, sadly, the only way to test the real performance and behavior of the carousel."
  },
  {
    title: "Important note regarding Android",
    content: "On Android, you will experience issues with carousel's behavior when JS Dev Mode is enabled, and you might have trouble with unreliable callbacks and loop mode when it isn't.."
  }
]

const renderCard = (props) => {
  const { title, content } = props.item;
  const even = true;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.box}
    >
      <View>

      </View>
    </TouchableOpacity>
  )
}

const Caro = () => {
  const caro = useRef(null)
  return (
    <Carousel
      ref={caro}
      data={arrs}
      renderItem={renderCard}
      inactiveSlideScale={1}
      inactiveSlideOpacity={0.7}
      inactiveSlideShift={0}
      slideStyle={{ padding: 8 }}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  )
}

const styles = StyleSheet.create({
  box: {
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    backgroundColor: "#f1c40f",
    width: "100%",
    height: 200,
    padding: 16,
    marginVertical: 8,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default Caro;