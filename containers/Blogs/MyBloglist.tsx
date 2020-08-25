import React, { useState, useEffect } from 'react'
import { FlatList, View } from "react-native";

import { retrieveAS } from '../../constants/Service'
import { userBlogList } from '../../constants/AppConfig'
import { getUserBloglist } from '../../services/Blogs'

import { FlatListItemBlog } from '../../components/Card/BlogsCard';
import { itemWidth } from '../../components/Carousel/styles';

interface BlogProps {
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

//title, date, user, nav, img, id, text, editable

const MyBlogs = ({ nav }: { nav: any }) => {
  const [blogs, setblogs] = useState<Array<BlogProps>>([]);

  useEffect(() => {
    getUserBloglist().then((r) => setblogs(r.body.map((obj: any) => ({
      title: obj.title,
      date: obj.created_date,
      id: obj.blog_id,
      text: obj.description,
      user: {
        name: obj.full_name,
        profile_pic: obj.customer_image
      },
      img: obj.blog_image,
      nav,
      editable: true
    }))));
  }, []);

  return (
    <FlatList data={blogs} keyExtractor={(item, i) => item.id + i} renderItem={FlatListItemBlog} />
  )
}

export default MyBlogs;