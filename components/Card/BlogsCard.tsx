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
  text: string
  editable: boolean
}

interface IBlogContent {
  name: string,
  desc: string
}

interface IBlogProfile {
  date: string;
  name: string;
  img: any;
  editable: boolean;
  handleMoreClick: (type: string) => void;
}

const profile_image = require('../../assets/images/user.png');

const defaults = {
  blog: {
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
}

export const FlatListItemBlog = (i: any) => <Blog {...i.item} key={i.index + '_blog_item'} />

const Blog = ({ title, date, user, nav, img, id, text, editable }: IBlog = defaults.blog) => {
  const handleMoreClick = (type: string) => {
    if (type.toLowerCase() === 'edit') {
      goTo('CreateBlog', {
        title: title,
        text: text,
        id: id,
        img: img
      });
    }
  }

  const goToItem = () => goTo('Blog', {
    blog_item: JSON.stringify({
      title,
      date,
      user,
      nav,
      img,
      id,
      text,
      editable
    })
  })

  const goTo = (loc: string, p?: any) => nav.navigate(loc, p);

  const profile = {
    date: parseDate(date),
    name: user.name,
    img: user.profile_pic,
    editable: editable || false,
    handleMoreClick,
  }
  const desc = text.replace(/\n/g, " ");

  return (
    <View style={styles.container}>
      {user ? (
        <ProfileInfo {...profile} />
      ) : null}
      <TouchableOpacity activeOpacity={1} onPress={goToItem}>
        {img ? (
          <ImageBackground
            style={styles.image}
            source={{uri: img}}
          />
        ) : null}
        <CardContent name={title} desc={desc} />
      </TouchableOpacity>
    </View>
  );
}

export const CardContent = ({ name, desc }: IBlogContent) => (
  <View style={styles.infoContainer}>
    <View>
      <Text style={styles.heading}>{name}</Text>
    </View>
    <View>
      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{desc}</Text>
    </View>
  </View>
);

export const ProfileInfo = ({ date, name, img, handleMoreClick, editable }: IBlogProfile) => (
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
    {editable ? <Icon name="more-vertical-outline" height={20} width={20} fill="#555" onPress={() => Select(handleMoreClick)} /> : null}
  </View>
)

function Select(onChange: any) {
  const opts = ['Edit', 'Delete', 'Cancel'];
  const El = Platform.OS === "ios"
    ? (ActionSheetIOS.showActionSheetWithOptions({
      options: opts,
      cancelButtonIndex: opts.length - 1,
      destructiveButtonIndex: 1
    },
      (buttonIndex) => {
        if (buttonIndex < opts.length) {
          onChange(opts[buttonIndex]);
        }
      },
    ))
    : <Picker onValueChange={(v) => onChange(opts[v])}>
      {opts.map((v, i) => <Picker.Item label={v} value={i} />)}
    </Picker>

  return El;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: "100%",
    borderBottomColor: "whitesmoke",
    borderBottomWidth: 1,
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

export default Blog;