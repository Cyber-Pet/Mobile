import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PetRegistration from './pages/petRegistration/index'

const Stack = createStackNavigator()

export default function StackNavigator() {
    return(
        <Stack.Navigator>
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
        </Stack.Navigator>
    )
}