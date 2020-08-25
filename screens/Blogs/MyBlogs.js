import React, { useState, useEffect } from 'react'
import { FlatList, View } from "react-native";

import { retrieveAS } from '../../constants/Service'
import { userBlogList } from '../../constants/AppConfig'

import { FlatListItemBlog } from '../../components/Card/BlogsCard'
import WithBackButton from '../../components/Views/WithBackButton'

const MyBlogs = ({ navigation }) => {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    retrieveAS(userBlogList).then((r) => {
      console.log({r});
      setblogs(r.map((obj) => ({
        ...obj,
        nav: navigation, 
        editable: true
      })));
    });
  }, [])

  return (
    <WithBackButton back={() => navigation.goBack()} header={true} heading="Your blogs">
      <FlatList data={blogs} renderItem={FlatListItemBlog} />
    </WithBackButton>
  )
}

export default MyBlogs;