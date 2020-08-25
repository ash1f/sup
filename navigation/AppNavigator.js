import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

//import MainTabNavigator from './MainTabNavigator';
import MainNavigator from './MainNavigator';
import AuthorizationNavigator from './AuthorizationNavigator';

const Authenticate = (loggedIn = false) => {

  return createAppContainer(
    createSwitchNavigator({
      _App: MainNavigator, //MainTabNavigator,
      _Auth: AuthorizationNavigator
    },
      {
        initialRouteName: loggedIn ? "_App" : "_Auth"
      }
    )
  )
};

export default Authenticate;