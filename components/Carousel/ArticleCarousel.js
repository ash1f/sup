import React, { useState, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Txt from '../Typography'
import Carousel from 'react-native-snap-carousel';
import { CardContent } from '../Card/BlogsCard';

const { width: viewportWidth } = Dimensions.get('window');

export const sliderWidth = viewportWidth - 32;

function wp(percentage) {
  const value = (percentage * sliderWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);

export const itemWidth = slideWidth + itemHorizontalMargin * 2;


const blogs = [
  {
    name: 'Coffee shop and all things nice',
    author: 'Vasili Netero',
    date: "3 days ago"
  },
  {
    name: 'UX advocates picky about the difference between UI and UX',
    author: 'Arturo Vidal',
    date: "20 mins ago"
  }
];

const renderCard = (props) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.box}
  >
    <CardContent {...props.item} />
  </TouchableOpacity>
);

const Caro = () => {
  const caro = useRef(null)
  return (
    <Carousel
      ref={caro}
      data={blogs}
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
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default Caro;