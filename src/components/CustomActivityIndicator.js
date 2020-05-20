import React from 'react'
import { 
  KeyboardAvoidingView, 
  StyleSheet, 
  View,
  Text,
  ActivityIndicator
} from 'react-native';
const CustomActivityIndicator = ({ loading }) => {
  const styles = StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  return (
    <>
    {
  loading && 
  (
    <View style={styles.loading}>
          <ActivityIndicator size='large' color="#0000ff" />
    </View>
  )
  }
      
    </>
  )
}




export default CustomActivityIndicator
// 