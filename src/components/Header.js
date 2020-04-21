import md5 from 'md5';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { UserContext } from '../context/UserContext';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#8AC6D1',
    color: '#FFF',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  backButtonStyle: {
    color: '#FFF'
  }
});

const Header = ({ scene, previous, navigation }) => {
  const { authService, userState } = useContext(UserContext)

  const canGoBack = () => {
    return !(scene.route.name == 'home' || scene.route.name == 'userLogin')
  }

  const [profileImageUrl, setprofileImageUrl] = useState("")
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;
  const getGravatarProfileImage = () => {
    if (userState.email == null) {
      return "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
    }
    return `https://www.gravatar.com/avatar/${md5(userState.email.toLowerCase())}`
  }
  useEffect(() => {
    let profile = getGravatarProfileImage(userState.email)
    setprofileImageUrl(profile)
  }, [title])

  return (
    <Appbar.Header
      style={styles.headerStyle}
    >
      {
        canGoBack() ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={'#FFF'}
        />) : (<></>)
      }
      
      <Appbar.Content
        titleStyle={styles.headerTitleStyle}
        title={title}
      />
      {
        userState.userToken != null ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Perfil',
                'Deseja Fazer logoff',
                [
                  {
                    text: 'Não',
                    style: 'cancel',
                  },
                  { text: 'Sim', onPress: () => authService.signOut() },
                ],
                { cancelable: false },
              );
            }}
          >

            <Avatar.Image
              size={40}
              source={{
                uri: profileImageUrl ? profileImageUrl : "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
              }}
            />
          </TouchableOpacity>
        ) : (<></>)
      }
    </Appbar.Header>
  )
}

export default Header
