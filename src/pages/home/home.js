import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import { AddButton } from '../../components/AddButton'
import Icon from 'react-native-vector-icons/AntDesign'


export default function Home() {
  const navigation = useNavigation(); 

  return (
    <Background>
      <View style={{ right: 20, bottom: 20, position: "absolute" }}>
        <AddButton onPress={() => navigation.navigate('petRegistration')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon name='plus' size={18} />
        </AddButton>
      </View>
    </Background>
  )
}