import React from 'react';
import { Background } from '../../components/Background'
import { StyledInput } from '../../components/StyledInput'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledText } from '../../components/StyledText';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';

export default function UserRegistration() {
  return (
    <Background>
      <StyledContainer color='#6C5B7B' width='90%' height='200px' marginTop='40%' >
        <StyledText>
          Nome
        </StyledText>
        <StyledInput style={{ marginBottom: 10 }}/>
        <StyledText>
          E-mail
        </StyledText>
        <StyledInput style={{ marginBottom: 10}}/>
        <StyledText>
          Senha
        </StyledText>
        <StyledInput style={{ marginBottom: 30}}/>
        <StyledSubmitButton>
          <StyledText>
            Cadastrar
          </StyledText>
        </StyledSubmitButton>

      </StyledContainer>
    </Background>
  );
}
