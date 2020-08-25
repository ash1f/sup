import React, { Component } from 'react';
//import ProfileInfo from '../components/Profile/ProfileInfo'
import { View, Text, Button, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Txt from '../components/Typography'
import Font from '../constants/Typography'
import { storeAS, retrieveAS } from '../constants/Service'
import { userkey, userEmailKey } from '../constants/AppConfig'
import PremiumModal from '../components/PremiumModal'
import Container from '../components/Views/Container'

const links = [
  {
    name: "Logout",
    icon: "power-outline",
    color: "#FF3030"
  }
]

const init = {
  name: "",
  company: "",
  email: "",
  profile_pic: "",
  customer_id: "",
  created_date: ""
}

const profile_default_img = require('../assets/images/user.png');
const imgsize = Font(120);

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: init,
      premiumModal: false
    }
    this.Logout = this.Logout.bind(this)
  }

  Logout() {
    const { navigate} = this.props.navigation;
    storeAS(userEmailKey, '').then(() => storeAS(userkey, '').then(() => navigate("_Auth")));
  }

  componentDidMount() {
    const self = this;
    retrieveAS(userkey).then((r) => {
      console.log({r});
      self.setState({ profile: r });
    })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container gutter>
        <PremiumModal open={this.state.premiumModal} onClose={() => this.setState({ premiumModal: false })} />
        <View style={styles.profileWrapper}>
            <ImageBackground
              source={this.state.profile.profile_pic ? { uri: this.state.profile.profile_pic } : profile_default_img}
              style={styles.avatarImg}
              imageStyle={{ borderRadius: imgsize / 2 }}
            />
          <View style={styles.profileContent}>
          <Text style={styles.profileName}>{this.state.profile.name}</Text>
            {this.state.profile.company ? (
              <Text style={styles.profileCompany}>{this.state.profile.company}</Text>
            ) : null}
            <TouchableHighlight style={styles.editBtn} underlayColor="rgba(0, 0, 0, 0)" onPress={() => navigate('EditProfile')}>
              <Text style={styles.editBtnTxt}>Edit</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.boxWrapper}>
          <TouchableHighlight style={styles.box} onPress={this.Logout}>
            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <View>
                <Icon name="power-outline"
                  height={32}
                  width={32}
                  fill="red"></Icon>
              </View>
              <View>
                <Text className={styles.label} style={{ color: 'red' }}>Logout</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </Container>
    )
  }
}

SettingsScreen.navigationOptions = {
  title: "Profile"
}

const styles = StyleSheet.create({
  avatarImg: {
    height: imgsize,
    width: imgsize,
    borderRadius: imgsize / 2,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    borderWidth: 1
  },
  profileWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  profileContent: {
    paddingVertical: 20,
    alignItems: "center"
  },
  profileName: {
    color: "#272523",
    fontSize: Font(24),
    fontWeight: "800",
    marginBottom: 4
  },
  profileCompany: {
    color: "#eab033",
    fontSize: Font(20),
    fontWeight: "600",
    marginBottom: 16
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  label: {
    fontSize: Font(16)
  },
  editBtn: {
    minWidth: 60,
    borderRadius: 8,
    backgroundColor: "#f9e5d1"
  },
  editBtnTxt: {
    textAlign: "center",
    fontSize: Font(16),
    color: "#4f474d",
    fontWeight: "600",
    paddingVertical: 8
  },
  locationLabel: {
    marginTop: 8,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    marginBottom: 8
  },
  boxWrapper: {
    paddingVertical: 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1
  },
  box: {
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    margin: 8,
    marginBottom: 8,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});