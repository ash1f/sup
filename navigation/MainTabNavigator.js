import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import _ from "lodash"
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CommunityTab from './CommunityNavigator'
//import CommunityTab from '../screens/Blogs/Main'
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="home-outline"
    />
  ),
};

HomeStack.path = '/dashboard';

CommunityTab.navigationOptions = {
  tabBarLabel: 'Community',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="activity-outline" />
  ),
};

CommunityTab.path = '/community';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} color="#f9a20f" name="settings-outline" />
  ),
};

SettingsStack.path = '/settings';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CommunityTab,
  SettingsStack,
}, {
    initialRouteName: "HomeStack",
    headerMode: "none",
    tabBarOptions: {
      activeTintColor: '#f9a20f',
      inactiveTintColor: "#000",
      showIcon: true,
      showLabel: false,
    }
  });

tabNavigator.path = '';

export default tabNavigator;
