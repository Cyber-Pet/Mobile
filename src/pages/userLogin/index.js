import React from 'react'
import { Image } from 'react-native'
import { Background } from '../../components/Background'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledInput } from '../../components/StyledInput'
import { StyledText } from '../../components/StyledText'
import { StyledSubmitButton } from '../../components/StyledSubmitButton'

export default function UserLogin() {
    return(
        <Background>
            <Image style={{marginTop: '15%'}} source={require('../../../assets/icon.png')} />

            <StyledContainer color='#6C5B7B' width='90%' height='200px'>

                <StyledText>
                    E-mail
                </StyledText>
                <StyledInput style={{marginBottom: 10}} />

                <StyledText>
                    Senha
                </StyledText>
                <StyledInput/>


            </StyledContainer>

            <StyledSubmitButton onPress={() => console.log('CYBERPET É FODA')} >
                <StyledText>
                    Login
                </StyledText>
            </StyledSubmitButton>
        </Background>
    )
}