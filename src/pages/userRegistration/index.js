import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import { StyledInput } from '../../components/StyledInput'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledText } from '../../components/StyledText';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import { PopUpView } from '../../components/PopUpView'
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Vibration
} from 'react-native';
import api from '../../services/api';
import axios from 'axios'

export default function UserRegistration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false)
  const [apiMessage, setApiMessage] = useState([])
  const [requestLoading, setRequestLoading] = useState(false)

  const navigation = useNavigation();

  async function createNewUser(source) {
    await api.post('/api/Auth/register', {
      name,
      email,
      password
    },{
      cancelToken: source.token
    }).then(response => {
      const statusCode = response.status
      if (statusCode == 201) {
        navigation.navigate('home')
      }
      
    }).catch(error => {

      if(axios.isCancel(error)) {
        console.log('Request canceled')
      } else {
        setModalVisible(true)
        console.log(modalVisible)
        setApiMessage(error.response.data.errors)
          let timeOut = setTimeout(() => {
            setRequestLoading(false)
          }, 3000)
        Vibration.vibrate(500)
      }
    }) 
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    if(requestLoading){
      createNewUser(source)

      return () => {
        console.log('unmounting')
        console.log(modalVisible)
        setModalVisible(false)
        source.cancel()
      }
    }
  }, [requestLoading])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <Background>

        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
        >
          <TouchableOpacity
            onPressOut={() => { setModalVisible(false) }}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: '20%'
            }}
          >
            <PopUpView>
              {apiMessage.map((message, index) => {
                return (
                  <StyledText key={index} >
                    {`\u2022    ${message}`}
                  </StyledText>
                )
              })}
            </PopUpView>
          </TouchableOpacity>
        </Modal>

        <StyledContainer color='transparent' width='90%' height='400px' marginTop='40%' >
          <StyledText>
            Nome
          </StyledText>
          <StyledInput placeholder='Informe seu Nome' value={name} style={{ marginBottom: 10 }} onChangeText={setName} />
          <StyledText>
            E-mail
          </StyledText>
          <StyledInput placeholder='seunome@suaempresa.com' value={email} style={{ marginBottom: 10 }} onChangeText={setEmail} />
          <StyledText>
            Senha
          </StyledText>
          <StyledInput placeholder='digite sua senha (min. 6 caracteres)' secureTextEntry={true} value={password} style={{ marginBottom: 30 }} onChangeText={setPassword} />
          <View style={{ alignItems: 'center' }} >
            <StyledSubmitButton onPress={() => setRequestLoading(true)}>
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
