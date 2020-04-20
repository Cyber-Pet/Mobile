import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledContainer } from '../../components/StyledContainer';
import { StyledInput } from '../../components/StyledInput';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import { StyledText } from '../../components/StyledText';
import api from '../../services/api';

export default function PetRegistration() {
  const navigation = useNavigation();
  const cancelationToken = axios.CancelToken.source()
  const [values, setValues] = useState({
    petName: null,
    petImage: null,
    userId: "ee900000-656a-b3de-366a-08d7e3247f8e",
    petId: null,
    bowlId: null,
  })
  async function _pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        values.petImage = result.base64;
        sendPetImage();
        getPetImage();
      }
      console.log(result.uri);
    } catch (E) {
      console.log(E);
    }
  };

  async function sendPetImage() {
    api.post('/Pets', {
      petName: '',
      petImage: values.petImage,
      userId: values.userId
    }).then(response => {
      let petId = response.data.data.id;
      values.petId = petId;
    }).catch(error => {
      console.log(error)
    })

  }
  async function getPetImage() {
    api.get('/Pets/' + values.petId).then(response => {
      const petImageBase64 = response.data.data.petImage;
      handleChange('petImage', petImageBase64);
      console.log('get' + response.data.data.id);
    }).catch(error => {
      console.log(error)
    })
  }
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <View style={styles.MainContainer}>
        <StyledContainer color='transparent' width='90%' marginTop='10%' style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={_pickImage}>
            <Image
              source={{
                uri:
                  `data:image/png;base64,${values.petImage}`
              }}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </StyledContainer>
        <StyledContainer color='transparent' width='90%' marginTop='10%' style={{ flex: 3, alignItems: 'center' }}>
          <StyledInput placeholder='Informe o nome do pet' height="10%" value={values.name} onChangeText={text => handleChange('petName', text)} />
          <StyledSubmitButton onPress={() => navigation.navigate('qrCodeReader')}>
            <StyledText color='#000'>
              Clique aqui para cadastrar o pet e cadastrar seu pote
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