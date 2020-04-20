import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import { StyledInput } from '../../components/StyledInput'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledText } from '../../components/StyledText';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import PopUp from '../../components/PopUpView'
import LottieView from "lottie-react-native"
import {
  View,
  KeyboardAvoidingView,
  Vibration
} from 'react-native';
import api from '../../services/api';
import axios from 'axios'

export default function UserRegistration() {
  const cancelationToken = axios.CancelToken.source()
  const [values, setValues] = useState({
    name: null,
    email: null,
    password: null
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [apiMessage, setApiMessage] = useState([])

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setValues({ ...values, 
      [name]: value });
  };

  const openPopUp = () => {
    setModalVisible(true)
  }
  const closePopUp = () => {
    setModalVisible(false)
  }
  const createNewUser = async () =>  {
    await api.post('/api/Auth/register', values , {
      cancelToken: cancelationToken.token
    }).then(response => {
      const statusCode = response.status
      if (statusCode == 201) {
        navigation.navigate('home')
      }
    }).catch(error => {
      if (axios.isCancel(error)) return;

      setApiMessage(error.response.data.errors)
      openPopUp()
      Vibration.vibrate(500)
    })
  }
  useEffect(() => {
    return () => {
      closePopUp()
      cancelationToken.cancel()
    }
  }, [])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
      <Background>
        <PopUp visible={modalVisible} message={apiMessage} closePopUp={closePopUp} autoCloseIn={3000} />
        <LottieView
          style={{
              width: 100,
              height: 100,
              backgroundColor: 'transparent',
              paddingTop: '5%'
          }}
          source={require('../../../assets/animations/6732-animal.json')}
          autoPlay
          loop
        />
        <StyledContainer color='transparent' width='90%' height='40%' marginTop='10%' >
          <StyledInput placeholder='Informe seu Nome' value={values.name} style={{ marginBottom: "10%" }} onChangeText={text => handleChange('name', text)} />

          <StyledInput placeholder='Seunome@suaempresa.com' value={values.email} style={{ marginBottom: "10%" }} onChangeText={text => handleChange('email', text)} />

          <StyledInput placeholder='Digite sua senha (min. 6 caracteres)' secureTextEntry={true} value={values.password} style={{ marginBottom: "10%" }} onChangeText={text => handleChange('password', text)} />
          <View style={{ alignItems: 'center' }} >
            <StyledSubmitButton onPress={() => createNewUser()}>
              <StyledText color='#000' fontSize='20px'>
                Cadastrar
              </StyledText>
            </StyledSubmitButton>
          </View>

        </StyledContainer>
      </Background>
    </KeyboardAvoidingView>
  );
}
