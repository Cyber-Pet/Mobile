import React, { useState } from 'react'
import {
    View, 
    TouchableOpacity, 
    Vibration, 
    KeyboardAvoidingView, 
    Modal,
    Platform
} from 'react-native'

import { Background } from '../../components/Background'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledInput } from '../../components/StyledInput'
import { StyledText } from '../../components/StyledText'
import { StyledSubmitButton } from '../../components/StyledSubmitButton'
import { PopUpView } from '../../components/PopUpView'
import { useNavigation } from '@react-navigation/native'
import LottieView from "lottie-react-native"
import api from '../../services/api'
import { Header } from '@react-navigation/stack'

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
        })
    }

    return(
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset = {Header.HEIGHT} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
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
                
                <LottieView
                    style={{
                        width: 100,
                        height: 100,    
                        backgroundColor: 'transparent',
                        paddingTop: '5%'
                    }}
                    source={require('../../../assets/animations/6732-animal.json')}
                    autoPlay
                    loop
                    autoSize
                />
                <StyledContainer color='transparent' width='90%' height='40%' marginTop='20%'>
                    <StyledInput placeholder='Digite seu e-mail' style={{ marginBottom: '10%' }} value={ email } onChangeText={ setEmail }/>
                    <StyledInput placeholder='Digite sua senha' secureTextEntry={true} style={{ marginBottom: '15%' }} value={ password } onChangeText={ setPassword } />
                    <View style={{ alignItems: 'center'}}  >
                        <StyledSubmitButton onPress={loginRequest} >
                            <StyledText color='#000' fontSize='20px' >
                                Login
                            </StyledText>
                        </StyledSubmitButton>
                        <TouchableOpacity 
                            style={{ flexDirection: 'row', marginTop: '10%' }} 
                            onPress={() => navigation.navigate('userRegistration')
                        }>
                            <StyledText fontWeight='normal' >
                                Não tem uma conta?
                            </StyledText>
                            <StyledText color='#000' style={{ paddingLeft: 5 }}>
                                Cadastre-se.
                            </StyledText>
                        </TouchableOpacity>
                    </View>
                </StyledContainer>
            </Background>
        </KeyboardAvoidingView>
    )
}