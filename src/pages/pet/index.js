import { Card, Avatar, ListItem } from 'react-native-elements'
import { Header } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext } from 'react';
import { 
    KeyboardAvoidingView, 
    View,
} from 'react-native';
import { StyledInput } from '../../components/StyledInput'
import { Background } from '../../components/Background';
import { StyledText } from '../../components/StyledText';
import api from '../../services/api'
import { UserContext } from '../../context/UserContext';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import { AntDesign } from '@expo/vector-icons';

export default function Pet({ navigation, route }) {   
    const { userState } = useContext(UserContext)
    const { petId }  = route.params;
    const { petName } = route.params;
    const { petImage } = route.params;
    const [values, setValues] = useState({
        petName: petName,
        petImage: petImage,
        userId: userState.id,
        id: petId,
        scanned: true,
    })
    const [ editable, setEditable ] = useState({
        editable: false,
        defaultText: values.petName,
        color: 'rgba(166,166,166,0.8)'

    })
    
    function changeToEditable() {
        setEditable({
            ...editable,
            ['editable']: true,
            ['color']: '#000',
        });
    }
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
                    ["petImage"]: result.base64});
            }
            updatePetImage();
        } catch (E) {
            console.log(E);
        }
    }

    const updatePetImage = async () => {
        await api.put('/Pets/' + values.id,{
            userId: values.userId,
            petImage: values.petImage,
            petName: values.petName}).then(response => {
                console.log(response);
            })
        
    }

    function toggleSwitch(id,valor) {
        let pos = -1;
        for (let i = 0; i < items.length; i++) {
            if (id === items[i].id){
                pos = i;
                break;
            }
        }
             
        setItems({
            ...items,
            ['valor']: valor
    });

    console.log(items)
        
    };
    const [items, setItems] = useState([])
    const isEnabled = () => {
        setItems([
            ...items,
            {
                id: 1,
                horario: '22:00',
                valor: true
            },
            {
                id: 2,
                horario: '22:00',
                valor: true
            },
            {
                id: 3,
                horario: '22:00',
                valor: true
            },
            {
                id: 4,
                horario: '22:00',
                valor: true
            }
        ]);
    };
    return(
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Header.HEIGHT} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
            <Background>
                <View style={{ 
                    flex: 2, 
                    width: '80%', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginTop: '15%'
                }}>
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
                    <View style={{ flex: 1, flexDirection:'row' }}>
                        <StyledInput 
                            defaultValue={`${petName}`}
                            style={{marginTop:'10%'}} 
                            height='70%'
                            color={ editable.color }
                            placeholder='Insira o nome do seu pet'
                            value={ editable.defaultText }
                            editable={ editable.editable } />
                        <AntDesign.Button
                            underlayColor='rgba(166,166,166,0.2)'
                            name='edit'
                            color='rgba(99,99,99,0.9)'
                            backgroundColor='transparent'
                            size={40}
                            style={{ marginTop:'100%' }}
                            onPress={ () => changeToEditable()} />
                    </View>
                </View>
                {values.scanned == false ? (
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <StyledText> Clique no ícone abaixo para vincular seu pote: </StyledText>
                    <AntDesign.Button 
                        name='qrcode' 
                        color='black' 
                        backgroundColor="transparent" 
                        size={150} 
                        onPress={() => navigation.navigate('qrCodeReader', {
                            petId: petId
                        })}/>
                </View>
                ) : (
                <View style={{ flex: 3, width: '100%' }}>
                    <Card title={'Defina os horários'}> 
                        {
                            items.map(item => (
                                <ListItem key={item.id} title={item.horario} switch={{
                                    trackColor:{false: "#767576", true: "#81b0ff"},
                                    ios_backgroundColor:"#3e3e3e",
                                    onValueChange:(valor) => toggleSwitch(item.id,valor),
                                    value:item.valor
                                }}/>
                            ))
                        }
                    </Card>
                </View>
                )
                }
                
                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                    <StyledSubmitButton style={{height: '60%'}} onPress={() => isEnabled()}>
                        <StyledText>
                            CLIQUE AQUI PARA ALIMENTAR SEU PET
                        </StyledText>
                    </StyledSubmitButton>
                </View>
            </Background>
        </KeyboardAvoidingView>
    )
}

