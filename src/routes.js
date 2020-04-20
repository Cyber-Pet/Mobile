import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'
import Home from './pages/home/home'
import PetRegistration from './pages/petRegistration/index'
import QrCodeReader from './pages/qrCodeReader/index'
import UserLogin from './pages/userLogin/index'
import UserRegistration from './pages/userRegistration/index'

const Stack = createStackNavigator()

export default function StackNavigator() {
    const { userState } = useContext(UserContext)
    return (
        <Stack.Navigator>
            {userState.userToken == null ? (
                <>
                    <Stack.Screen name="userLogin" component={UserLogin} options={{
                        title: 'CyberPet Login',
                        headerStyle: {
                            backgroundColor: '#8AC6D1',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: '#FFF',
                        },
                    }} />
                    <Stack.Screen name="userRegistration" component={UserRegistration} options={{
                        title: 'Cadastre o seu usuário',
                        headerStyle: {
                            backgroundColor: '#8AC6D1',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: '#FFF',
                        },
                    }} />
                </>
            ) : (
                    <>
                        <Stack.Screen name="home" component={Home} options={{
                            title: 'Inicio',
                            headerStyle: {
                                backgroundColor: '#8AC6D1',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                color: '#FFF',
                            },
                        }} />
                        <Stack.Screen name="petRegistration" component={PetRegistration} options={{
                            title: 'Cadastre o seu pet',
                            headerStyle: {
                                backgroundColor: '#8AC6D1',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                color: '#FFF',
                            },
                        }} />

                        <Stack.Screen name="qrCodeReader" component={QrCodeReader} options={{
                            title: 'Leitura do pote',
                            headerStyle: {
                                backgroundColor: '#8AC6D1',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                color: '#FFF',
                            },
                        }} />
                    </>
                )
            }


        </Stack.Navigator>
    )
}