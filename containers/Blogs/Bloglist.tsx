import React, { useState, useEffect } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import Blogs from '../../components/Card/BlogsCard';
import { FlatList, Alert } from 'react-native'
import { getAllBlogs } from '../../services/Blogs'

interface BloglistProps {
  nav: NavigationScreenProps
}

interface IBlog {
  title: string,
  date: string,
  img: any,
  user: {
    name: string,
    profile_pic: string
  },
  id: string,
  text: string,
}

const Bloglist = (props: BloglistProps) => {
  const [blogs, setBlogs] = useState<Array<IBlog>>([]);

  useEffect(() => {
    let result = blogs;
    getAllBlogs().then((r) => {
      if (r.success) {
        result = r.body.map((item: any, i: string) => ({
          id: item.blog_id,
          title: item.title,
          date: item.created_date,
          text: item.description,
          user: {
            name: item.full_name,
            profile_pic: item.customer_image
          },
          img: item.blog_image,
        }));
      } else {
        Alert.alert(`Couldn't get blogs`)
      }
      setBlogs(result);
    })
  }, [])

  return (
    <FlatList data={blogs} keyExtractor={(item, i) => item.id + i} renderItem={({ item }) => <Blogs nav={props.nav} editable={false} {...item} />} />
  )
}

export default Bloglist;