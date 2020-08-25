import React, { useState, useRef } from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Txt from '../Typography'
import styles, { itemWidth, sliderWidth } from './styles'


const renderCard = (props, onSelect) => {
  const { name, image, vendor_name, coupon_code, expiry_date } = props.item;
  return (
    <TouchableOpacity
      onPress={() => onSelect(props.item)}
      activeOpacity={1}
      style={[styles.shade, {backgroundColor: "white", alignItems: "stretch"}]}
    >
      <View style={styles.caro_container}>
        <View style={styles.shadow}></View>
        <View style={styles.caro_ContentContainer}>
          <Txt type="subtitle">{name}</Txt>
          <View style={{ flexDirection: "row"}}>
            <Text>by </Text><Txt type="caption1" gutter>{`${vendor_name}`}</Txt>
          </View>
          <View>
            <Text style={{ fontWeight: "500", marginBottom: 8}}>Use  code <Txt type="caption2">{coupon_code}</Txt> to avail your coupon</Text>
          </View>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "500"}}>Offer valid till {expiry_date.split(" ")[0]}</Text>
          </View>
        </View>
        <View style={styles.caro_ImageContainer}>
          <ImageBackground
            source={{ uri: image }}
            style={styles.image}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Caro = ({ items = [], onDiscountSelect }) => {
  const caro = useRef(null)
  return (
    <Carousel
      ref={caro}
      data={items}
      renderItem={(i) => renderCard(i, onDiscountSelect)}
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