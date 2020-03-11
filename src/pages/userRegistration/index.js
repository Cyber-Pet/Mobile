import React, { useState } from 'react';
import { Background } from '../../components/Background'
import { StyledInput } from '../../components/StyledInput'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledText } from '../../components/StyledText';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import { View, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

export default function UserRegistration() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  async function addNewUser() {
    await api.post('/api/users', {
      name,
      email,
      password
    }).then(response => {console.log('Cadastrado com sucesso')})
  }

  return (
    <Background>
      <StyledContainer color='#6C5B7B' width='90%' height='400px' marginTop='40%' >
        <StyledText>
          Nome
        </StyledText>
        <StyledInput value={name} style={{ marginBottom: 10 }} onChangeText={setName}/>
        <StyledText>
          E-mail
        </StyledText>
        <StyledInput value={email} style={{ marginBottom: 10}} onChangeText={setEmail}/>
        <StyledText>
          Senha
        </StyledText>
        <StyledInput secureTextEntry={true} value={password} style={{ marginBottom: 30}} onChangeText={setPassword}/>
        <View style={{ alignItems: 'center' }} >
          <StyledSubmitButton onPress={addNewUser, this.setState({ visible: true })}>
            <StyledText>
              Cadastrar
            </StyledText>
          </StyledSubmitButton>
        </View>
      </StyledContainer>
    </Background>
  );
}
