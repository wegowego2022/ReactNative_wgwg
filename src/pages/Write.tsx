import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WriteFind from '../components/WriteFind';


function Write() {
  
  return (
    <View style={styles.container}>
        <WriteFind />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
});

export default Write;
