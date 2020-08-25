import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import ForumsScreen from '../screens/Forums/Main'
import BlogsScreen from '../screens/Blogs/Main'
import EventsScreen from '../screens/Events/Main'

ForumsScreen.navigationOptions = {
  tabBarLabel: 'Forums',
};
BlogsScreen.navigationOptions = {
  tabBarLabel: 'Blogs',
};
EventsScreen.navigationOptions = {
  tabBarLabel: 'Events',
};

const CommunityTab = createMaterialTopTabNavigator({
  BlogsScreen,
  ForumsScreen,
  EventsScreen
}, {
    initialRouteName: "BlogsScreen",
    upperCaseLabel: false,
    labelStyle: {
      fontWeight: 600,
    },
    tabBarOptions: {
      activeTintColor: '#F9A20F',
      inactiveTintColor: "#000",
      indicatorStyle: {
        backgroundColor: '#F9A20F'
      },
      style: {
        paddingTop: 24,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.13,
        shadowRadius: 5,
        elevation: 3,
      },
    }
  })

export default CommunityTab;