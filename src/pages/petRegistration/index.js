import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Header } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext } from 'react';
import { 
  KeyboardAvoidingView, 
  StyleSheet, 
  View,
  Text
} from 'react-native';
import { StyledContainer } from '../../components/StyledContainer';
import { StyledInput } from '../../components/StyledInput';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import { StyledText } from '../../components/StyledText';
import { Avatar } from 'react-native-elements';
import api from '../../services/api';
import { UserContext } from '../../context/UserContext';

export default function PetRegistration() {
  const { userState } = useContext(UserContext)
  const navigation = useNavigation();
  const [values, setValues] = useState({
    petName: null,
    petImage: null,
    userId: userState.id,
  })
  async function _pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
      });
      if (!result.cancelled) {
        setValues({ 
          ...values,
          ["petImage"]: result.base64 });
      }
    } catch (E) {
      console.log(E);
    }
  }

  const createNewPet = async () => {
    await api.post('/Pets', values
    ).then(response => {
      const statusCode = response.status
      if (statusCode == 200) {
        navigation.goBack();
      }
    }).catch(error => {
      if (axios.isCancel(error)) return;
    })
  };
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
  >
      <View style={styles.MainContainer}>
      <StyledContainer color='transparent' width='100%' marginTop='10%' style={{ flex: 2, alignItems: 'center' }}>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
              <Avatar
                onPress={_pickImage}
                activeOpacity={0.5}
                rounded
                size={120}
                showEditButton
                icon={{name: 'pets', type: 'material-design'}}
                source={{ 
                  uri: `data:image/png;base64,${values.petImage}`
                }}
              />
            </View>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: 40}}>
                <StyledText fontSize={'20px'}>
                  {values.petName}
                </StyledText>
            </View>
        </StyledContainer>
        <StyledContainer color='transparent' width='90%' marginTop='10%' style={{ flex: 3, alignItems: 'center', justifyContent: 'center'}}>
          <StyledInput style={{marginBottom: '15%'}} placeholder='Informe o nome do pet' height="10%" value={values.name} onChangeText={text => handleChange('petName', text)}/>
          <StyledSubmitButton onPress={() => createNewPet()} height={'50px'}>
            <StyledText color='#000'>
              Clique aqui para cadastrar o pet
            </StyledText>
          </StyledSubmitButton>
        </StyledContainer>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
    backgroundColor: 'transparent',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 200,
    width: 200,
    resizeMode: 'stretch',
    borderRadius: 80,
  },
});