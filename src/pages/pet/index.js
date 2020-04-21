import { useNavigation } from '@react-navigation/native';
import { Card, Avatar, ListItem } from 'react-native-elements'
import axios from 'axios';
import { Header } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext } from 'react';
import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    TouchableOpacity, 
    View,
    Button,
    Switch
} from 'react-native';
import { StyledContainer } from '../../components/StyledContainer';
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
        petName: null,
        petImage: null,
        userId: userState.id,
        id: null,
        scanned: false,
    })
        
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
        <Background>
            <View style={{ 
                flex: 2, 
                width: '80%', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginTop: '15%'
            }}>
                <Avatar
                    activeOpacity={0.5}
                    rounded
                    size={120}
                    showEditButton
                    icon={{name: 'pets', type: 'material-design'}}
                    source={{
                        uri: `data:image/png;base64,${petImage}`
                    }}
                />
                <StyledInput placeholder={`${petName}`} style={{marginTop:'10%'}} height='30%' value={values.petName}></StyledInput>
            </View>
            {values.scanned == false ? (
            <View style={{ flex: 1, alignItems: 'center' }}>
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
    )
}

