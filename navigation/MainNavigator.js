import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Blog from '../screens/Blogs/Item'
import Event from '../screens/Events/Item'
import Forum from '../screens/Forums/Item';
import Create from '../screens/New/CreateScreen';
import SubmitProposal from '../screens/Proposal/NewProposal'
import SubmitProposalSuccess from '../screens/Proposal/NewProposalSuccess'
import EditProfile from '../screens/Profile/EditProfile'
import CreateBlog from '../screens/Blogs/New'
import MyBlog from '../screens/Blogs/MyBlogs'

export default createStackNavigator({
  Dashboard: {
    screen: MainTabNavigator,
    path: '/',
  },
  Blog: {
    screen: Blog,
    path: '/blog',
  },
  MyBlog: {
    screen: MyBlog,
    path: '/bloguser'
  },
  CreateBlog: {
    screen: CreateBlog,
    path: '/blog/new'
  },
  Event: {
    screen: Event,
    path: '/event',
  },
  Forum: {
    screen: Forum,
    path: '/forum',
  },
  CreateNew: {
    screen: Create,
    path: '/create',
  },
  EditProfile: {
    screen: EditProfile,
    path: 'profile/edit'
  },
  SubmitProposal: {
    screen: SubmitProposal,
    path: '/proposal/new',
  },
  SubmitProposalSuccess: {
    screen: SubmitProposalSuccess,
    path: '/proposal/new/success',
  }
}, {
    initialRouteName: "Dashboard",
    headerMode: "none"
  })