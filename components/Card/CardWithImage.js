import React from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../Typography'


export const Card = ({ desc = "", title = "", img = "" }) => (
  <View style={styles.card}>
    <View style={styles.contentWrapper}>
      <Text type="subtitle" gutter>
        {title}
      </Text>
      <Text type="label" gutter>
        {desc}
      </Text>
    </View>
    <View style={styles.imageWrapper}>
      <ImageBackground
        style={styles.image}
        source={img}
      />
    </View>
  </View>
);


const styles = StyleSheet.create({
  descriptionLabel: {
    marginTop: 16,
  },
});

export default Card;