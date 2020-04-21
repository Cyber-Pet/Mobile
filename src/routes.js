import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import Header from './components/Header'
import { UserContext } from './context/UserContext'
import Home from './pages/home/home'
import PetRegistration from './pages/petRegistration/index'
import QrCodeReader from './pages/qrCodeReader/index'
import UserLogin from './pages/userLogin/index'
import UserRegistration from './pages/userRegistration/index'
import Pet from './pages/pet/index.js'

const Stack = createStackNavigator()

export default function StackNavigator() {
    const { userState } = useContext(UserContext)
    return (
        <Stack.Navigator
            screenOptions={{
                header: ({ scene, previous, navigation }) => (
                    <Header scene={scene} previous={previous} navigation={navigation} />
                ),
            }}
        >
            {userState.userToken == null ? (
                <>
                    <Stack.Screen name="userLogin" component={UserLogin} options={{
                        title: 'CyberPet Login'
                    }} />
                    <Stack.Screen name="userRegistration" component={UserRegistration} options={{
                        title: 'Cadastre o seu usuário'
                    }} />
                </>
            ) : (
                    <>
                        <Stack.Screen name="home" component={Home} options={{
                            title: 'Inicio'
                        }} />
                        <Stack.Screen name="petRegistration" component={PetRegistration} options={{
                            title: 'Cadastre o seu pet'
                        }} />

                        <Stack.Screen name="qrCodeReader" component={QrCodeReader} options={{
                            title: 'Leitura do pote',
                        }} />

                        <Stack.Screen name="pet" component={Pet} options={{
                            title: 'Pet'
                        }} />

                    </>
                )
            }


        </Stack.Navigator>
    )
}