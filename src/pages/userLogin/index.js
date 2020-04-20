import { useNavigation } from '@react-navigation/native'
import { Header } from '@react-navigation/stack'
import LottieView from "lottie-react-native"
import React, { useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, TouchableOpacity, Vibration, View } from 'react-native'
import { Background } from '../../components/Background'
import PopUp from '../../components/PopUpView'
import { StyledContainer } from '../../components/StyledContainer'
import { StyledInput } from '../../components/StyledInput'
import { StyledSubmitButton } from '../../components/StyledSubmitButton'
import { StyledText } from '../../components/StyledText'
import { AuthContext } from '../../context/authContext'


export default function UserLogin() {
    const { authService, authState } = useContext(AuthContext)
    const navigation = useNavigation();
    const [values, setValues] = useState({
        email: null,
        password: null
    })
    const [modalVisible, setModalVisible] = useState(false)
    const [apiMessage, setApiMessage] = useState([])


    async function loginRequest() {
        try {
            authService.signIn(values);
        } catch (error) {

        }

    }
    useEffect(() => {
        if (authState.errorMessages != null) {
            setApiMessage(authState.errorMessages)
            openPopUp()
            Vibration.vibrate(500)
        }
    }, [authState.errorMessages])

    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
    };

    const openPopUp = () => {
        setModalVisible(true)
    }
    const closePopUp = () => {
        setModalVisible(false)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Header.HEIGHT} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
            <Background>
                <PopUp visible={modalVisible} message={apiMessage} closePopUp={closePopUp} autoCloseIn={5000} />
                <View style={{ alignItems: 'center' }}>
                    <LottieView
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: 'transparent',
                            paddingTop: '5%',
                            marginBottom: '15%',

                        }}
                        source={require('../../../assets/animations/6732-animal.json')}
                        autoPlay
                        loop
                        resizeMode='contain'
                    />
                </View>
                <StyledContainer color='transparent' width='90%' height='40%' marginTop='5%'>
                    <StyledInput placeholder='Digite seu e-mail' style={{ marginBottom: '10%' }} value={values.email} onChangeText={text => handleChange('email', text)} />
                    <StyledInput placeholder='Digite sua senha' secureTextEntry={true} style={{ marginBottom: '15%' }} value={values.password} onChangeText={text => handleChange('password', text)} />
                    <View style={{ alignItems: 'center' }}  >
                        <StyledSubmitButton onPress={loginRequest} >
                            <StyledText color='#000' fontSize='20px' >
                                Login
                            </StyledText>
                        </StyledSubmitButton>
                    </View>
                    <View style={{ alignItems: 'center' }}>
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