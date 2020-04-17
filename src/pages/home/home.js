import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import { AddButton } from '../../components/AddButton'


export default function Home() {
  const navigation = useNavigation(); 

  return (
    <Background>
      <AddButton onPress={() => navigation.navigate('petRegistration')} />
    </Background>
  )
}