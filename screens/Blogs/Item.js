import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
} from 'react-native';

import WithBackButton from '../../components/Views/WithBackButton'
import SingleBlog from '../../containers/Blogs/SingleBlog';
import Container from '../../components/Views/Container';

export default function BlogsScreen({ navigation }) {
  const blog = JSON.parse(navigation.getParam('blog_item'));
  return (
    <WithBackButton back={() => navigation.goBack()} header={true}>
      <Container>
          <SingleBlog {...blog} />
        </Container>
    </WithBackButton>
  );
}