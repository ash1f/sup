import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

interface RotaterProps {
  onFinishedAnimating?: () => void,
  style?: any,
  children?: any,
}

export default function Rotater(props: RotaterProps){
  const [val, setVal] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(Animated.timing(
      val,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    )).start(props.onFinishedAnimating);
  }, []);

  let spin = val.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ rotate: spin }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};
