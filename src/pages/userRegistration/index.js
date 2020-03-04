import React from 'react';
import { View } from 'react-native'
import { Background } from '../../components/Background'
import { StyledInput } from '../../components/StyledInput'
import { StyledContainer } from '../../components/StyledContainer'

export default function PetRegistration() {
  return (
    <Background>
      <StyledContainer color='#6C5B7B' width='90%' height='200px' >
        <StyledInput/>
      </StyledContainer>
    </Background>
  );
}
