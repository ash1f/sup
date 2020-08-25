import React, { useState, useEffect } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import ForumBlock from '../../components/Card/ForumBlock';
import { FlatList, Alert } from 'react-native'

interface BloglistProps {
  nav: NavigationScreenProps
}

interface IForum {
  id: string,
  title: string,
  desc: string,
  date: string,
  responseCount: number,
  user: {
    name: string,
    profile_pic: string
  },
}

const forums = [
  {
    id: "001",
    title: 'Hitting "forgot password" more than "login"',
    desc: "Explore kilishan's board Forum Designs on Pinterest.... Dribbble Web Dashboard, Dashboard Design, Web Ui Design",
    date: "1 day ago",
    responseCount: 0,
    user: {
      name: "Wazil Liya",
      profile_pic: "https://randomuser.me/api/portraits/men/6.jpg"
    }
  },
  {
    id: "001",
    title: 'What do teams at Square, Airbnb, and Spotify have in common?',
    desc: "Comfortably inside the top 50 websites by total traffic in the world, Reddit has a number of great design forums to cater for all tastes.",
    date: "20 August",
    responseCount: 2,
    user: {
      name: "Ashif Anees",
      profile_pic: "https://randomuser.me/api/portraits/men/26.jpg"
    }
  }
];



const ForumsList = (props: BloglistProps) => {
  const [blogs, setBlogs] = useState<Array<IForum>>(forums);

  // useEffect(() => {
  //   let result = blogs;
  //   getAllBlogs().then((r) => {
  //     if (r.success) {
  //       result = r.body.map((item: any, i: string) => ({
  //         id: item.blog_id,
  //         title: item.title,
  //         date: item.created_date,
  //         text: item.description,
  //         user: {
  //           name: item.full_name,
  //           profile_pic: item.customer_image
  //         },
  //         img: item.blog_image,
  //       }));
  //     } else {
  //       Alert.alert(`Couldn't get blogs`)
  //     }
  //     setBlogs(result);
  //   });
  // }, [])

  return (
    <FlatList data={blogs} keyExtractor={(item, i) => item.id + i} renderItem={({ item }) => <ForumBlock nav={props.nav} {...item} />} />
  )
}

export default ForumsList;