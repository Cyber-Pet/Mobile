import React from 'react';
import { Text } from 'react-native'
import { Background } from '../../components/Background'
import { StyledInput } from '../../components/StyledInput'
import { StyledContainer } from '../../components/StyledContainer'

export default function PetRegistration() {
  return (
    <Background>
      <StyledContainer color='#6C5B7B' width='90%' height='200px'>
        <Text style={{
          color: '#F67280', 
          fontWeight: 'bold', 
          fontSize: 15,
          marginBottom: 5,
        }}>
          Nome
        </Text>
        <StyledInput/>
      </StyledContainer>
    </Background>
  );
}
