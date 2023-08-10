import React, {useCallback, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View, Image, Modal, TextInput } from 'react-native';
import SearchInput from '../components/SearchInput';
import ThreeMenuItem from '../components/ThreeMenuItem';

function Search() {


  return (
    <ScrollView style={styles.container}>
      <SearchInput />
      <ThreeMenuItem />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
    color: 'white',
  },
});

export default Search;

