import React from 'react'
import EditProfileForm from '../../components/Profile/ProfileEditForm'
import Container from '../../components/Views/Container';

const EditProfile = ({ navigation }) => {
  return (
    <Container gutter>
      <EditProfileForm navigation={navigation}/>
    </Container>
  )
}

export default EditProfile;
