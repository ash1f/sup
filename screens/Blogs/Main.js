import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Container from '../../components/Views/Container'
import FloatingAction from '../../components/Buttons/FloatingActions.js';
import ListLink from '../../components/Links/ListLink'
import DropdownMenu from '../../components/DropdownMenu'

import Blogs from '../../containers/Blogs/Bloglist'
import MyBlogs from '../../containers/Blogs/MyBloglist'
import Font from '../../constants/Typography'

const data = [["All Blogs", "My Blogs"]];

export default function BlogsScreen({ navigation }) {
  //active list of blogs
  // 1 = My Blogs
  // 0 = All  blogs
  const [active, setActive] = React.useState(0);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Blogs</Text>
      <FloatingAction handler={() => navigation.navigate("CreateBlog")} />
      <DropdownMenu
        style={{ flex: 1 }}
        bgColor={'white'}
        tintColor={'#000'}
        activityTintColor={'#f9a20f'}
        // arrowImg={}      
        // checkImage={}   
        // optionTextStyle={{color: '#333333'}}
        maxHeight={100}
        handler={(selection, row) => data[selection][row] === "All Blogs" ?  setActive(0) : setActive(1)}
        data={data}
      >
        <Container>
          {/* <ListLink title="Your blogs" subtitle="You have created 2" goto={() => navigation.navigate("MyBlog")}/> */}
          {active == 1 ? <MyBlogs nav={navigation} /> : <Blogs nav={navigation} />}
        </Container>
      </DropdownMenu>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  title: {
    color: "#272523",
    padding: 16,
    fontSize: Font(24),
    fontWeight: "800"
  },
  container: {
    flex: 1,
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
