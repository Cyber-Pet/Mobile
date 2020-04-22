import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
      ["Id"]: data
    });
    bowlLink();
    navigation.goBack();
  };

  const bowlLink = async () => {
    /*await api.put('/Bowl/' + Id, values.petId).then(response => {
      const statusCode = response.status
      if (statusCode == 200) {
        navigation.goBack();
      }
    }).catch(error => {
      if (axios.isCancel(error)) return;
    })*/

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

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}