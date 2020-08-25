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

interface IForum {
  id: string,
  title: string,
  desc: string,
  date: string,
  responseCount: number,
  user: {
    name: string,
    profile_pic: string
  },
}

const para = [
  "Laughs in dattebayo",
  "he fact Sakura still loves him and they get married is one of the worst parts of the ending. I get he's redeemed by the end but Sakura has literally no growth as a character and any she might have had is thrown out the window when she just goes back to being Sasuke's booty call in waiting. Her and Sasuke never connected in any meaningful way that we ever saw or had any conversation that wasn't Sakura stumbling over herself or Sasuke being a dismissive asshole. Can you tell I wanted Naruto and Sakura to be together? Hinata should've died during the war protecting Naruto instead of Neji. Sasuke probably should've died too. My ideal ending was Sasuke defeating Naruto at the end and releasing the Infinite Tsukiyomi by himself, draining his chakra and resulting in his death. But obviously it's a Shonen manga so we can't have permadeath for anyone who matters and that ending isn't feel-good enough.",
  "Why is there a blank skinny panel in the bottom middle?"
]

const profile_image = require('../../assets/images/user.png');

const SingleForum = (item: IForum) => {
  console.log({ forum: item });
  return (
    <View>
      <View style={styles.content}>
        <ProfileRow name={item.user.name} img={item.user.profile_pic} date={item.date} />
        <View style={styles.divider}></View>
        <Text style={styles.heading}>{item.title}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>{item.responseCount} replies</Text>
        <View style={styles.divider}></View>
        {para.map((p) => (
          <View style={styles.articleContent}>
            <ProfileRow name={item.user.name} img={item.user.profile_pic} date={item.date} />
            <View style={styles.divider}></View>
            <Text style={styles.desc}>{p}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    height: 250
  },
  heading: {
    fontSize: Font(20),
    fontWeight: "600",
    lineHeight: 28
  },
  desc: {
    color: "#555",
    fontWeight: '400',
    fontSize: Font(17),
    lineHeight: 22
  },
  divider: {
    height: 16
  },
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
    backgroundColor: "white",
    marginBottom: 8
  },
  articleContent: {
    borderTopWidth: 1,
    borderColor: "#ecf0f1",
    paddingTop: 8,
    paddingBottom: 16
  },
});


export default SingleForum;