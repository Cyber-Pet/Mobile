import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Background } from '../../components/Background'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledInput } from '../../components/StyledInput'
import { StyledText } from '../../components/StyledText'
import { StyledSubmitButton } from '../../components/StyledSubmitButton'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function UserLogin() {
    const navigation = useNavigation();
    const [ email, setEmail ] = useState();
    const [password, setPassword] = useState();
    const [unauthorizedText, setUnauthorizedText] = useState({ isVisible: false })

    async function loginRequest() {
        await api.post('/api/Auth/login',{
            email,
            password
        }).then(response => {
            const statusCode = response.status
            if (statusCode == 200) {
                navigation.navigate('home')
            }
        }).catch(response => {
            console.log(response)
        })
    }

    function verifyUnauthorizedText() {
        console.log(unauthorizedText.isVisible);
    }

    return(
        <Background>
            <StyledText style={{ paddingTop: '5%' }} color='#FF0000'>
                Usuário ou senha incorretos
            </StyledText>
            <StyledContainer color='#6C5B7B' width='90%' height='200px' marginTop='40%' >
                <StyledText>
                    E-mail
                </StyledText>
                <StyledInput style={{ marginBottom: 10 }} value={ email } onChangeText={ setEmail }/>

                <StyledText>
                    Senha
                </StyledText>
                <StyledInput secureTextEntry={true} style={{ marginBottom: 30 }} value={ password } onChangeText={ setPassword } />

            <View style={{ alignItems: 'center' }} >
                <StyledSubmitButton onPress={loginRequest} >
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