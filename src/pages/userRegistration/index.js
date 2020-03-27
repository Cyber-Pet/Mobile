import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import { StyledInput } from '../../components/StyledInput'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledText } from '../../components/StyledText';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import PopUp from '../../components/PopUpView'
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <Background>
        <PopUp visible={modalVisible} message={apiMessage} closePopUp={closePopUp} autoCloseIn={3000} />
        <StyledContainer color='transparent' width='90%' height='400px' marginTop='40%' >
          <StyledText>
            Nome
          </StyledText>
          <StyledInput placeholder='Informe seu Nome' value={values.name} style={{ marginBottom: 10 }} onChangeText={text => handleChange('name', text)} />
          <StyledText>
            E-mail
          </StyledText>
          <StyledInput placeholder='seunome@suaempresa.com' value={values.email} style={{ marginBottom: 10 }} onChangeText={text => handleChange('email', text)} />
          <StyledText>
            Senha
          </StyledText>
          <StyledInput placeholder='digite sua senha (min. 6 caracteres)' secureTextEntry={true} value={values.password} style={{ marginBottom: 30 }} onChangeText={text => handleChange('password', text)} />
          <View style={{ alignItems: 'center' }} >
            <StyledSubmitButton onPress={() => createNewUser()}>
              <StyledText color='#FFF'>
                Cadastrar
              </StyledText>
            </StyledSubmitButton>
          </View>
        </StyledContainer>
      </Background>
    </KeyboardAvoidingView>
  );
}
