import React, { useState, useRef } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Txt from '../Typography'
import styles, {itemWidth, sliderWidth} from './styles'


const renderCard = (props, onSelect) => {
  const { name, image, price } = props.item;
  return (
    <TouchableOpacity
      onPress={() => onSelect(props.item)}
      activeOpacity={1}
      style={[styles.slideInnerContainer, {height: itemWidth}]}
    >
      <View style={styles.shadow} />
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <View style={styles.radiusMask} />
      </View>
      <View style={styles.textContainer}>
        <Txt type="subtitle">{name}</Txt>
        <Txt type="caption1">{`AED ${price}`}</Txt>
      </View>
    </TouchableOpacity>
  )
}

const Caro = ({ items = [] , onPackageSelect}) => {
  const caro = useRef(null)
  return (
    <Carousel
      ref={caro}
      data={items}
      renderItem={(i) => renderCard(i, onPackageSelect)}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      inactiveSlideScale={0.95}
      inactiveSlideOpacity={1}
      enableMomentum={true}
      activeSlideAlignment={'start'}
      containerCustomStyle={styles.slider}
      contentContainerCustomStyle={styles.sliderContentContainer}
      activeAnimationType={'spring'}
      activeAnimationOptions={{
          friction: 4,
          tension: 40
      }}
    />
  )
}

export default Caro;