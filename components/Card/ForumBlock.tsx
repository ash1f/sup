import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ActionSheetIOS,
  Picker,
  Text
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import parseDate from '../../constants/Date'

interface IForum {
  id: string,
  title: string,
  desc: string,
  nav: any,
  date: string,
  responseCount: number,
  user: {
    name: string,
    profile_pic: string
  },
}

interface IForumContent {
  name: string,
  desc: string
}

interface IForumProfile {
  date: string;
  name: string;
  img: any;
}

const profile_image = require('../../assets/images/user.png');

export const FlatListItemForum = (i: any) => <Forum {...i.item} key={i.index + '_blog_item'} />

const Forum = ({ title, date, user, responseCount, desc, nav, id }: IForum) => {

  const goToItem = () => goTo('Forum', {
    forum_item: JSON.stringify({
      title,
      date,
      user,
      nav,
      id,
      desc,
      responseCount
    })
  })

  const goTo = (loc: string, p?: any) => nav.navigate(loc, p);

  const profile = {
    date: date,
    name: user.name,
    img: user.profile_pic,
  }

  const description = desc.replace(/\n/g, " ");

  return (
    <View style={styles.container}>
      {user ? (
        <ProfileInfo {...profile} />
      ) : null}
      <TouchableOpacity activeOpacity={1} onPress={goToItem}>
        <CardContent name={title} desc={description} />
      </TouchableOpacity>
    </View>
  );
}

export const CardContent = ({ name, desc}: IForumContent) => (
  <View style={styles.infoContainer}>
    <View>
      <Text style={styles.heading}>{name}</Text>
    </View>
    <View>
      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{desc}</Text>
    </View>
  </View>
);

export const ProfileInfo = ({ date, name, img}: IForumProfile) => (
  <View style={styles.profile_wrapper}>
    <View style={styles.profile}>
      <Image source={img ? { uri: img } : require('../../assets/images/user.png')} style={styles.profile_img} />
      <View style={styles.profile_content}>
        <View>
          <Text style={styles.profile_name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
        </View>
        <View>
          <Text style={styles.profile_subtext}>{date}</Text>
        </View>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 15
  },
  heading: {
    fontWeight: '600',
    color: '#222',
    fontSize: 24,
    marginBottom: 8
  },
  description: {
    color: "#555",
    fontWeight: '400',
    fontSize: 18
  },
  infoContainer: {
    width: "100%",
    padding: 15
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    borderRadius: 10,
    height: 220,
  },
  descriptionLabel: {
    marginTop: 16,
  },
  profile_wrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profile_img: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  profile_content: {
    marginLeft: 15
  },
  profile_name: {
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
  },
  profile_subtext: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  }
});

export default Forum;