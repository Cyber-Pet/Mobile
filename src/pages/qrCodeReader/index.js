import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../services/api';

export default function QrCodeReader({ navigation, route }) {
  const { petId } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [values, setValues] = useState({
    petId: petId,
    Id:null
  })

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setValues({
      ...values,
      ['Id']: data
    });
    Alert.alert(
      "Deu tudo certo =D",
      `O pote ${data} foi scanneado com sucesso` ,
      [
        { text: "OK", onPress: () => bowlLink() }
      ],
      { cancelable: false }
    );
    
  };

  const bowlLink = async () => {
    const json = {
      petId: values.petId
      }
      console.log(values.Id)
      console.log(json)
    await api.put('/Bowl/' + values.Id, json).then(response => {
      console.log(response.status);
      const statusCode = response.status
      if (statusCode == 200) {
        navigation.goBack();
      }
    })

  }

  if (hasPermission === null) {
    return <Text>Solicitando acesso a camera!</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera :(</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Clique para scannear novamente'} onPress={() => setScanned(false)} />}
    </View>
  );
}