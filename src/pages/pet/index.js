import { Card, Avatar, ListItem, Icon } from 'react-native-elements'
import { Header } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext, useEffect } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default function Pet({ navigation, route }) {   
    const [loading, setLoading] = useState(false)
    const { userState } = useContext(UserContext)
    const { petId , petName , petImage, bowlId }  = route.params;
    const [values, setValues] = useState({
        petName: petName,
        petImage: petImage,
        userId: userState.id,
        id: petId,
    })

    const [ editable, setEditable ] = useState({
        editable: false,
        defaultText: values.petName,
        color: 'rgba(166,166,166,0.8)'
    })
    const [ schedules, setSchedules ] = useState([])
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [ date, setDate ] = useState(new Date())    

    const getSchedules = () => {
        api.get(`/Schedule/pet/${petId}`,source.token)
        .then(response => {
            setSchedules(response.data)
            setLoading(false)
        })
        .catch(erro => console.log(erro))
    }

    const deleteSchedule = async (id, index) => {
        setLoading(true)
        setSchedules(schedules.filter(schedule => schedule.id !== id))
        api.delete(`/Schedule/${id}`,source.token)
        .then(() => {
            setLoading(false)
        })
    }

    const createSchedule = (event, selectedDate) => {
        if (event.type == "set") {
            api.post('/Schedule', {
                petId,
                hour: selectedDate.getHours(),
                minutes: selectedDate.getMinutes()
            },
            source.token)
            .then(() => setShowTimePicker(false))
        } else {
            setShowTimePicker(false)
        }
        
    }
    
    const feedPet = () => {
        console.log(values.id);
        api.post(`/pets/${values.id}/feed`)
            .then(() => alert("Pet Alimentado!"))
    }

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
            petName: values.petName},
            source.token).then(response => {
                console.log(response);
        })
    }
    const openTimePicker = () => {
        setShowTimePicker(true)
    }

    useEffect(() => {
        setLoading(true)
        getSchedules()

        return () => {
            source.cancel()
        }
    }, [showTimePicker])


    return(
        <>
        {showTimePicker && (
            <DateTimePicker
            display='clock'
            value={date}
            mode='time'
            onChange={createSchedule}
            minuteInterval='15'
        />)}
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Header.HEIGHT} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
            <Background>
                <View style={{ 
                    flex: 1, 
                    width: '80%', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginTop: '6%'
                }}>
                    <View style={{flex: 1}}>
                        <Avatar
                            onPress={_pickImage}
                            activeOpacity={0.5}
                            rounded
                            size={120}
                            showAccessory
                            icon={{name: 'pets', type: 'material-design'}}
                            source={{
                                uri: `data:image/png;base64,${values.petImage}`
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection:'row', alignItems: 'flex-end', marginTop: 20 }}>
                        <StyledInput
                            defaultValue={`${petName}`}
                            height='30%'
                            color={ editable.color }
                            placeholder='Insira o nome do seu pet'
                            value={ editable.defaultText }
                            editable={ editable.editable } 
                            borderBottomWidth={'0px'}
                        />
                        <Icon
                            underlayColor='rgba(166,166,166,0.2)'
                            name='create'
                            color='rgba(99,99,99,0.9)'
                            backgroundColor='transparent'
                            size={23}
                            onPress={ () => changeToEditable()} 
                        />
                    </View>
                </View>
                {bowlId == null || bowlId == undefined ? (
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', marginTop: '10%'}}>
                    <CustomActivityIndicator loading={loading}></CustomActivityIndicator>
                    <StyledText> Clique no ícone abaixo para vincular seu pote: </StyledText>
                    <AntDesign.Button 
                        name='qrcode' 
                        color='black' 
                        backgroundColor="transparent" 
                        size={150} 
                        onPress={() => navigation.navigate('qrCodeReader', {
                            petId,
                            petName,
                            petImage
                        })}
                    />
                </View>
                ) : (
                <View style={{ flex: 2, width: '100%'}}>
                    <Card title={
                        <View 
                            style={{
                                alignItems: 'flex-end',
                                paddingBottom: 20,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                borderBottomColor: '#D3D3D3',
                                borderBottomWidth: 1
                            }}
                        >
                        <StyledSubmitButton 
                            style={{
                                backgroundColor: '#3395FF',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingRight: 10,
                                width: 180,
                                height: 30
                            }} 
                            title={'Adicionar horário'} 
                            onPress={openTimePicker}
                        >
                            <StyledText 
                                style={{
                                    color: '#fff',
                                    paddingRight: 10,
                                }}  
                            > 
                                Adicionar Horário 
                            </StyledText>
                            <Icon size={17} color='#fff' name='add'></Icon>
                        </StyledSubmitButton>
                        <CustomActivityIndicator loading={loading}></CustomActivityIndicator>
                        </View>
                    }>
                        {schedules.length == 0 ? (
                            <View 
                                style={{
                                    alignItems: 'center',
                                    paddingTop: 20
                                }}
                            >
                                <StyledText> Sem horários cadastrados </StyledText>
                            </View>
                        ):(
                            schedules.map((schedule, index) => {
                               return (
                                    <ListItem
                                        style={{
                                            borderBottomColor: '#D3D3D3',
                                            borderBottomWidth: 1
                                        }} 
                                        key={schedule.id} 
                                        title={`${schedule.hour < 10 ? `0${schedule.hour}` : schedule.hour}:${schedule.minutes < 10 ? `0${schedule.minutes}` : schedule.minutes}`} 
                                        rightIcon={
                                            <Icon 
                                                name='delete'
                                                onPress={() => deleteSchedule(schedule.id, index)}
                                            />
                                        } 
                                    />
                                )
                            })
                        )}
                    </Card>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                        <StyledSubmitButton style={{height: '60%'}} onPress={feedPet}>
                            <StyledText>
                                CLIQUE AQUI PARA ALIMENTAR SEU PET
                            </StyledText>
                        </StyledSubmitButton>
                    </View>
                </View>
                )
                }
            </Background>
        </KeyboardAvoidingView>
        </>
    )
}

