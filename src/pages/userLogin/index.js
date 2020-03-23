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
import { PopUpView } from '../../components/PopUpView'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function UserLogin() {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [modalVisible, setModalVisible] = useState(false)

    
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
            console.log(error.response.data.errors)
            setModalVisible(true)
            setTimeout(() => {
                setModalVisible(false)
            }, 10000)
            Vibration.vibrate(500)
        })
    }

    return(
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <Background>
                <Modal 
                    animationType="fade"
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
                            <StyledText>
                                oi
                            </StyledText>
                        </PopUpView>
                    </TouchableOpacity>
                </Modal>

                <StyledContainer color='#6C5B7B' width='90%' height='40%' marginTop='40%' >
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
        </KeyboardAvoidingView>
    )
}