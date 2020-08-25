import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

import ArticleCarousel from '../components/Carousel/ArticleCarousel';
import { Icon } from 'react-native-eva-icons';
import PremiumPopup from '../components/PremiumModal'
import PackageSlideshow from '../containers/Packages/PackageSlideshow'
import DiscountsContainer from '../containers/Discounts/DiscountsContainer'
import Container from '../components/Views/Container'
import Font from '../constants/Typography'

const UpcomingEvent = {
  img: {
    uri: "https://i.pinimg.com/originals/37/9f/e0/379fe0e4a9c098e099237cc7ce6ecdc0.jpg"
  },
  name: 'TedX Cambridge',
  time: 'June 9, 2016',
  description: 'Reference this table when designing your app’s interface, and make sure',
  location: "Universiy of Cambridge, London"
}
export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      premiumPopup: false
    }
    
    this.closePremiumModal = this.closePremiumModal.bind(this)
  }

  closePremiumModal() {
    this.setState({ premiumPopup: true })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <PremiumPopup open={this.state.premiumPopup} onClose={() => this.setState({ premiumPopup: false })} />
        <View style={styles.divider}></View>
        <View style={styles.container}>
          <Text style={styles.title}>All packages</Text>
          <PackageSlideshow />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Promos</Text>
          <DiscountsContainer />
        </View>
        <View style={styles.divider}></View>
        <View style={styles.container}>
          <Text style={styles.heading}>You can submit your ideas</Text>
          <Text style={styles.para}>We are more than product. our end goal is to create a community that will actively progress for the better future. Whatever the idea we are always ready to listen</Text>
          <TouchableHighlight style={styles.btn} underlayColor="rgba(0, 0, 0, 0)" onPress={() => navigate('SubmitProposal')}>
            <Text style={styles.btnTxt}>Submit your idea</Text>
          </TouchableHighlight>
        </View>
      </Container>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Dashboard',
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    backgroundColor: '#fff',
    paddingVertical: 8
  },
  premiumed: {
    color: "rgba(0,0,0,0.3)"
  },
  fluid: {
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "column",
    paddingHorizontal: 16,
    marginBottom: 16
  },
  divider: {
    height: 16,
  },
  fluid: {
    width: "100%"
  },
  title: {
    color: "#272523",
    fontSize: Font(24),
    fontWeight: "800"
  },
  heading: {
    color: "#272523",
    fontSize: Font(20),
    fontWeight: "600",
    marginBottom: 12
  },
  para: {
    color: "#4f474d",
    fontSize: Font(16),
    fontWeight: "500",
    marginBottom: 12
  },
  btn: {
    minWidth: 60,
    width: "100%",
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f9e5d1"
  },
  btnTxt: {
    textAlign: "center",
    fontSize: Font(18),
    color: "#4f474d",
    fontWeight: "600",
    paddingVertical: 8
  },
  getstartedcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  getstartedcontainer2: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    marginBottom: 16
  },
  getStartedBox: {
    marginHorizontal: 0,
    flex: 1,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
  },
  getStartedText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    padding: 16
  },
  getStartedBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
  },
  gsBtnItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  gsBtnTxt: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "bold"
  },
  gsBtnIconContainer: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  gsBtnIcon: {
    position: "absolute",
    top: 20,
    right: 0,
    left: 20,
    bottom: 0
  },
  gsBtnTxt: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "bold"
  }
});
