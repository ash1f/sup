import React from 'react';
import { Text } from 'react-native'
import Font from '../constants/Typography'

export const textStyle = {
  error: {
    color: "red"
  },
  headline: {
    fontWeight: "600",
    fontSize: Font(24),
    color: '#272523'
  },
  subtitle: {
    fontWeight: "600",
    fontSize: Font(20),
    color: "#272523"
  },
  paragraph: {
    fontWeight: "400",
    fontSize: Font(16),
    color: "#272523"
  },
  caption1: {
    fontWeight: "500",
    fontSize: Font(15),
    color: "#eab033"
  },
  caption2: {
    fontWeight: "500",
    fontSize: Font(15),
    color: "#89706e"
  },
  label: {
    fontWeight: "600",
    fontSize: Font(15),
    color: "#286790"
  },
  button: {
    fontWeight: "600",
    fontSize: Font(15),
  },
}

const gutters = {
  headline: 16,
  subtitle: 16,
  paragraph: 8,
  caption1: 8,
  caption2: 8,
  error: 8,
  label: 8,
  button: 8,
}

const Txt = ({ type = "paragraph", style = {}, children, gutter = false, ...props }) => (
  <Text style={[textStyle[type], { marginBottom: gutter ? gutters[type] : null }, style]} {...props}>{children}</Text>
);

export default Txt;