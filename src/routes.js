import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PetRegistration from './pages/petRegistration/index'
import UserRegistration from './pages/userRegistration/index'
import UserLogin from './pages/userLogin/index'
import Home from './pages/home/home'

const Stack = createStackNavigator()

export default function StackNavigator() {
    return(
        <Stack.Navigator>

            <Stack.Screen name="userLogin" component={UserLogin} options={{
                title: 'CyberPet Login',
                headerStyle: {
                    backgroundColor: '#8AC6D1',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFF',
                },
            }}/>

            <Stack.Screen name="petRegistration" component={PetRegistration} options={{
                title: 'Cadastre o seu pet',
                headerStyle: {
                    backgroundColor: '#836853',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFF',
                },
            }}/>

            <Stack.Screen name="userRegistration" component={UserRegistration} options={{
                title: 'Cadastre o usuário',
                headerStyle: {
                    backgroundColor: '#836853',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFF',
                },
            }} />
            
            <Stack.Screen name="home" component={Home} options={{
                title: 'Inicio',
                headerStyle: {
                    backgroundColor: '#836853',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFF',
                },
            }} />

        </Stack.Navigator>
    )
}