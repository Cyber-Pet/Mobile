import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Background } from '../../components/Background'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledInput } from '../../components/StyledInput'
import { StyledText } from '../../components/StyledText'
import { StyledSubmitButton } from '../../components/StyledSubmitButton'
import { useNavigation } from '@react-navigation/native'

export default function UserLogin() {
    const navigation = useNavigation();

    return(
        <Background>          
            <StyledContainer color='#6C5B7B' width='90%' height='200px' marginTop='40%' >
                <StyledText>
                    E-mail
                </StyledText>
                <StyledInput style={{ marginBottom: 10 }} />

                <StyledText>
                    Senha
                </StyledText>
                <StyledInput secureTextEntry={true} style={{ marginBottom: 30 }} />

            <View style={{ alignItems: 'center' }} >
                <StyledSubmitButton onPress={() => console.log('CYBERPET É FODA')} >
                    <StyledText>
                        Login
                    </StyledText>
                </StyledSubmitButton>
            </View>
            </StyledContainer>

            <TouchableOpacity 
                style={{ flexDirection: 'row', marginTop: 40 }} 
                onPress={() => navigation.navigate('userRegistration')
            }>
                <StyledText fontWeight='normal' style={{ paddingRight: 5 }} >
                    Não tem uma conta?
                </StyledText>
                <StyledText color='#F67280'>
                    Cadastre-se.
                </StyledText>
            </TouchableOpacity>
        </Background>
    )
}