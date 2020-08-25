import React from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
//import Text from '../Typography'
import Font from '../../constants/Typography'

export const Card = ({ name = "", time = "", location = "", handler, img = "", ...props }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={1}
        {...props}
        style={styles.container}
        onPress={handler}>
        <View style={styles.imageWrapper}>
          <ImageBackground
            style={styles.image}
            source={img}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title}>
              {name}
            </Text>
          </View>
          <View style={styles.activityContainer}>
            <Text style={styles.subtitle}>{time}</Text>
            <Text style={styles.subtitle}>{location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>

  );
}

const CardList = ({ events, handler }) => events.map((item, i) => <Card handler={handler} key={i} {...item} />)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: Font(20),
    fontWeight: "600"
  },
  subtitle: {
    fontSize: Font(15),
    color: "#555",
  },
  container: {
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 0 },
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 10
  },
  infoContainer: {
    width: "100%",
    padding: 16,
  },
  activityContainer: {
    paddingVertical: 8,
  },
  imageWrapper: {
    overflow: 'hidden',
  },
  image: {
    overflow: 'hidden',
    height: 220,
  },
  descriptionLabel: {
    marginTop: 16,
  },
});

export default CardList;