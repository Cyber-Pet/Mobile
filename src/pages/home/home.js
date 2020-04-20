import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Background } from '../../components/Background'
import { AddButton } from '../../components/AddButton'
import Icon from 'react-native-vector-icons/AntDesign'
import { ListItem } from 'react-native-elements'
import { AsyncStorage } from 'react-native';

export default function Home() {
  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem('id_token', (err, token) => { console.log(token) ;return token ? navigation.navigate('home') : navigation.navigate('userLogin') })
  }, [])
  const testNames =
    [
      {'name': 'Ben', 'id': 1},
      {'name': 'Susan', 'id': 2},
      {'name': 'Robert', 'id': 3},
      {'name': 'Mary', 'id': 4},
      {'name': 'Daniel', 'id': 5},
      {'name': 'Laura', 'id': 6},
      {'name': 'John', 'id': 7},
      {'name': 'Debra', 'id': 8},
      {'name': 'Aron', 'id': 9},
      {'name': 'Ann', 'id': 10},
      {'name': 'Steve', 'id': 11},
      {'name': 'Olivia', 'id': 12},
      {'name': 'Bob', 'id': 13},
      {'name': 'Malcom', 'id': 14},
    ]
  

  return (
    <Background>
      <ScrollView style={{width: '100%'}}>
        {
          testNames.map((testNames) => (
            <ListItem
              leftAvatar={{
                title: testNames.name[0]
              }}
              key={testNames.id}
              title={testNames.name}
              chevron
            />
          ))
        }
      </ScrollView>
      <View style={{ right: 20, bottom: 20, position: "absolute" }}>
        <AddButton onPress={() => navigation.navigate('petRegistration')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon name='plus' size={18} />
        </AddButton>
      </View>
    </Background>
  )
}