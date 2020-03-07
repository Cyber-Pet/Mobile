import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PetRegistration from './pages/petRegistration/index'
import UserRegistration from './pages/userRegistration/index'
import UserLogin from './pages/userLogin/index'

const Stack = createStackNavigator()

export default function StackNavigator() {
    return(
        <Stack.Navigator>

            <Stack.Screen name="userLogin" component={UserLogin} options={{
                title: 'CyberPet Login',
                headerStyle: {
                    backgroundColor: '#F67280',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFF',
                },
            }}/>

            <Stack.Screen name="petRegistration" component={PetRegistration} options={{
                title: 'Cadastre o seu pet',
                headerStyle: {
                    backgroundColor: '#F67280',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFF',
                },
            }}/>

            <Stack.Screen name="userRegistration" component={UserRegistration} options={{
                title: 'Cadastre o usuário',
                headerStyle: {
                    backgroundColor: '#F67280',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#FFF',
                },
            }}/>

        </Stack.Navigator>
    )
}