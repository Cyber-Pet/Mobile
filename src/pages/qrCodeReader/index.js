import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../services/api';
import { ActivityIndicator } from 'react-native-paper';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

export default function QrCodeReader({ navigation, route }) {
  const { petId, petName, petImage } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setLoading(true)
    setScanned(true);
    api.put('/Bowl/' + data, {petId})
    .then(response => {
      console.log(response.status);
      setLoading(false)
      if (response.status == 200) {
        navigation.navigate('pet', {
          petId,
          petName,
          petImage,
          bowlId: data
       })
      } else {
        Alert.alert(
          "Opss! Algo de errado não esta certo!",
          `ocorreu uma falha ao escanear o pote: ${data} ` ,
          [
            { text: "OK", onPress: () => navigation.goBack() }
          ],
          { cancelable: false }
        );
      }
    })
    
    
  };


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
        <CustomActivityIndicator loading={loading}/>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Clique para scannear novamente'} onPress={() => setScanned(false)} />}
    </View>
  );
}