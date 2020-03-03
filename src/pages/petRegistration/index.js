import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function PetRegistration() {
  return (
    <View style={styles.container}>
      <TextInput style={{width: 80, height: 20}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C5B7B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
