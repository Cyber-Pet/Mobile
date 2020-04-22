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
import { StyledSubmitButton } from '../../components/StyledSubmitButton'


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
    })
    const [switchIsEnabled, setSwitchIsEnabled] = useState({
        switch1: false,
        switch2: false
    })

    const toggleSwitch = {
        toggleSwitch1(){
            const isEnabled = switchIsEnabled.switch1
            setSwitchIsEnabled({
                ...switchIsEnabled,
                switch1: !isEnabled
            })
        },
        toggleSwitch2(){
            const isEnabled = switchIsEnabled.switch2
            setSwitchIsEnabled({
                ...switchIsEnabled,
                switch2: !isEnabled
            })
        },
        toggleSwitch3(){
            const isEnabled = switchIsEnabled.switch3
            setSwitchIsEnabled({
                ...switchIsEnabled,
                switch3: !isEnabled
            })
        },
        toggleSwitch4(){
            const isEnabled = switchIsEnabled.switch4
            setSwitchIsEnabled({
                ...switchIsEnabled,
                switch4: !isEnabled
            })
        },
    }

    const scheduleTest = [
        { id: 1, hour: '04:00' },
        { id: 2, hour: '10:00' },
        { id: 3, hour: '16:00' },
        { id: 4, hour: '22:00' }
    ]

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
            <View style={{ flex: 1 }}>

            </View>
            <View style={{ flex: 3, width: '100%' }}>
                <Card title={'Defina os horários'}> 
                    <ListItem title={scheduleTest[0].hour} switch={{
                        trackColor:{false: "#767576", true: "#81b0ff"},
                        ios_backgroundColor:"#3e3e3e",
                        value: switchIsEnabled.switch1,
                        onValueChange: toggleSwitch.toggleSwitch1,
                    }}/>
                    <ListItem title={scheduleTest[1].hour} switch={{
                        trackColor:{false: "#767576", true: "#81b0ff"},
                        ios_backgroundColor:"#3e3e3e",
                        value: switchIsEnabled.switch2,
                        onValueChange: toggleSwitch.toggleSwitch2,
                    }}/>
                    <ListItem title={scheduleTest[2].hour} switch={{
                        trackColor:{false: "#767576", true: "#81b0ff"},
                        ios_backgroundColor:"#3e3e3e",
                        value: switchIsEnabled.switch3,
                        onValueChange: toggleSwitch.toggleSwitch3,
                    }}/>
                    <ListItem title={scheduleTest[3].hour} switch={{
                        trackColor:{false: "#767576", true: "#81b0ff"},
                        ios_backgroundColor:"#3e3e3e",
                        value: switchIsEnabled.switch4,
                        onValueChange: toggleSwitch.toggleSwitch4,
                    }}/>
                </Card>
            </View>
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

