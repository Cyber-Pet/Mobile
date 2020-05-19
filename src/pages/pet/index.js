import { Card, Avatar, ListItem, Icon } from 'react-native-elements'
import { Header } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext, useEffect } from 'react';
import { 
    KeyboardAvoidingView, 
    View,
    Button
} from 'react-native';
import { StyledInput } from '../../components/StyledInput'
import { Background } from '../../components/Background';
import { StyledText } from '../../components/StyledText';
import api from '../../services/api'
import { UserContext } from '../../context/UserContext';
import { StyledSubmitButton } from '../../components/StyledSubmitButton';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'


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
    const [ schedules, setSchedules ] = useState([])
    const [ time, setTime ] = useState(new Date())
    const [showTimePicker, setTimePicker] = useState(false)
    const [ change, setChange ] = useState(false)

    function changeState() {
        change ? setChange(false) : setChange(true)
    }

    async function getSchedules() {
        await api.get(`/Schedule/pet/${petId}`)
        .then(response => {
            console.log(response.data)
            setSchedules(
                response.data
        )})
        .catch(erro => console.log(erro))
    }

    useEffect(() => {
        getSchedules()
    }, [change])

    const deleteSchedule = async (id, index) => {
        const response = await api.delete(`/Schedule/${id}`)
        schedules.splice(index, 1)
        changeState()
        console.log(response)
    }

    const createSchedule = async (event, selectedDate) => {
        await api.post('/Schedule', {
            petId,
            hour: selectedDate.getHours(),
            minutes: selectedDate.getMinutes()
        })
        setTimePicker(false)
        changeState()
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
            petName: values.petName}).then(response => {
                console.log(response);
        })
    }

    return(
        
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
                            showEditButton
                            icon={{name: 'pets', type: 'material-design'}}
                            source={{
                                uri: `data:image/png;base64,${values.petImage}`
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', marginTop: 20 }}>
                        <StyledInput
                            defaultValue={`${petName}`}
                            height='30%'
                            color={ editable.color }
                            placeholder='Insira o nome do seu pet'
                            value={ editable.defaultText }
                            editable={ editable.editable } 
                            borderBottomWidth={'0px'}
                        />
                        <FontAwesome.Button
                            underlayColor='rgba(166,166,166,0.2)'
                            name='pencil'
                            color='rgba(99,99,99,0.9)'
                            backgroundColor='transparent'
                            size={20}
                            onPress={ () => changeToEditable()} 
                        />
                    </View>
                </View>
                {values.scanned == false ? (
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', marginTop: '10%'}}>
                    <StyledText> Clique no ícone abaixo para vincular seu pote: </StyledText>
                    <AntDesign.Button 
                        name='qrcode' 
                        color='black' 
                        backgroundColor="transparent" 
                        size={150} 
                        onPress={() => navigation.navigate('qrCodeReader', {
                            petId: petId
                        })}
                    />
                </View>
                ) : (
                <View style={{ flex: 2, width: '100%'}}>
                    <Card title={
                        <Button title={'Adicionar horário'} onPress={() => setTimePicker(true)}/>
                    }>
                        {schedules.length == 0 ? (
                            <StyledText> Não possuí horários </StyledText>
                        ):(
                            schedules.map((schedule, index) => {
                               return (
                                    <ListItem 
                                        key={schedule.id} 
                                        title={`${schedule.hour}:${schedule.minutes}`} 
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
                        <StyledSubmitButton style={{height: '60%'}} onPress={() => isEnabled()}>
                            <StyledText>
                                CLIQUE AQUI PARA ALIMENTAR SEU PET
                            </StyledText>
                        </StyledSubmitButton>
                    </View>
                </View>
                )
                }
            </Background>
            {showTimePicker ? (
                <DateTimePicker
                display='clock'
                value={time}
                mode='time'
                onChange={createSchedule}
            />
            ):(
                undefined
            )}

        </KeyboardAvoidingView>
    )
}

