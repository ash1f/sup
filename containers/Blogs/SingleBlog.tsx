import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
} from 'react-native';

import Txt from '../../components/Typography';
import Font from '../../constants/Typography';
import ProfileRow from '../../components/Profile/ProfileRow';

interface IBlog {
  title: string,
  date: string,
  user: {
    name: string,
    profile_pic: string
  },
  nav: any,
  img: any,
  id: string,
  text: string,
  editable: boolean
}

const profile_image = require('../../assets/images/user.png');

const blogDef = {
  title: "",
  date: "",
  user: {
    name: "",
    profile_pic: profile_image
  },
  nav: null,
  img: "",
  id: "",
  text: "",
  editable: false
}

const SingleBlog = (item: IBlog = blogDef) => {
  return (
    <View>
      <View style={styles.content}>
        <View style={styles.divider}></View>
        <Text style={styles.heading}>{item.title}</Text>
        <View style={styles.divider}></View>
        <ProfileRow name={item.user.name} img={item.user.profile_pic} date={item.date} />
        <View style={styles.divider}></View>
      </View>
      {item.img ? (
        <View>
          <ImageBackground style={styles.bgImage} source={{ uri: item.img }} />
          <View style={styles.divider}/>
        </View>
      ) : null}
      <View style={styles.content}>
        <Text style={styles.desc}>{item.text}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  bgImage: {
    height: 250
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: Font(28),
    fontWeight: "600"
  },
  desc: {
    fontSize: Font(18),
  },
  divider: {
    height: 16
  },
  content: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});


export default SingleBlog;