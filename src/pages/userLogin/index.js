import React, { useState } from 'react'
import {
    View, 
    TouchableOpacity, 
    Vibration, 
    KeyboardAvoidingView, 
    Modal,
} from 'react-native'

import { Background } from '../../components/Background'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledInput } from '../../components/StyledInput'
import { StyledText } from '../../components/StyledText'
import { StyledSubmitButton } from '../../components/StyledSubmitButton'
import { StyledImage } from '../../components/StyledImage'
import { PopUpView } from '../../components/PopUpView'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function UserLogin() {
    const navigation = useNavigation(); 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [modalVisible, setModalVisible] = useState(false)
    const [apiMessage, setApiMessage] = useState([])

    
    async function loginRequest() {
        await api.post('/api/Auth/login',{
            email,
            password
        }).then(response => {
            const statusCode = response.status
            if (statusCode == 200) {
                navigation.navigate('home')
            }
        }).catch(error => {
            setModalVisible(true)
            setApiMessage(error.response.data.errors)
            setTimeout(() => {
                setModalVisible(false)
            }, 3000)
            Vibration.vibrate(500)
            console.log(email, password)
        })
    }

    return(
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <Background>
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <TouchableOpacity
                        onPressOut={() => {setModalVisible(false)}}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            paddingTop: '20%'
                        }} 
                    >
                        <PopUpView>
                                {apiMessage.map((message, index) => {
                                    return(
                                        <StyledText key={index} >
                                            {`\u2022    ${message}`}
                                        </StyledText>
                                    )
                                })}
                        </PopUpView>
                    </TouchableOpacity>
                </Modal>
                
                <StyledImage marginTop='10%' width='55%' height='20%' source={require('../../../assets/Logo.png')} />

                <StyledContainer color='transparent' width='90%' height='40%' marginTop='20%' >
                    <StyledText color='#000' >
                        E-mail
                    </StyledText>
                    <StyledInput placeholder='seunome@suaempresa.com' style={{ marginBottom: 40 }} value={ email } onChangeText={ setEmail }/>

                    <StyledText color='#000' >
                        Senha
                    </StyledText>
                    <StyledInput placeholder='digite sua senha (min. 6 caracteres)' secureTextEntry={true} style={{ marginBottom: 30 }} value={ password } onChangeText={ setPassword } />

                <View style={{ alignItems: 'center' }} >
                    <StyledSubmitButton onPress={loginRequest} >
                        <StyledText color='#000' >
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
                    <StyledText color='#000'>
                        Cadastre-se.
                    </StyledText>
                </TouchableOpacity>
            </Background>
        </KeyboardAvoidingView>
    )
}