import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { AddButton } from '../../components/AddButton'
import { Background } from '../../components/Background'
import { UserContext } from '../../context/UserContext'
import api from '../../services/api'
import CustomActivityIndicator from '../../components/CustomActivityIndicator'

export default function Home() {
  const { userState } = useContext(UserContext)
  const navigation = useNavigation();
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getPets = navigation.addListener('focus', () => {
      api.get('/pets/user/' + userState.id)
      .then(response => {
        setPets(response.data.data)
        setLoading(false)
      })
      .catch(erro => console.log(erro))
    })

    return getPets
  }, [])

  const navigateToPetPage = (petId, petName, petImage, bowlId) => {
    navigation.navigate('pet', {
      petId: petId,
      petName: petName,
      petImage: petImage,
      bowlId
   })
  }

  return (
    <Background>
      <CustomActivityIndicator loading={loading}></CustomActivityIndicator>
      <ScrollView style={{ width: '100%' }}>
        {
          pets.map((pets) => (
            <ListItem
              leftAvatar={{
                title: pets.petName[0],
                source: { uri: `data:image/png;base64,${pets.petImage}` }
              }}
              key={pets.id}
              title={pets.petName}
              chevron
              onPress={() => navigateToPetPage(pets.id,pets.petName,pets.petImage, pets.bowlId)}
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