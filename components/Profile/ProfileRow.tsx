import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import Font from '../../constants/Typography';

interface IBlogProfile {
  date: string;
  name: string;
  img: any;
}

const ProfileRow = ({ date, name, img }: IBlogProfile) => (
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
  profile_wrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profile_img: {
    borderRadius: Font(18),
    width: Font(36),
    height: Font(36),
  },
  profile_content: {
    marginLeft: 15
  },
  profile_name: {
    fontWeight: '500',
    color: '#222',
    fontSize: Font(16),
  },
  profile_subtext: {
    fontWeight: '200',
    color: '#777',
    fontSize: Font(12),
  }
});

export default ProfileRow;