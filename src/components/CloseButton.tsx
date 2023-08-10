import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CloseButton() {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.goBack();
    };

    return (
        <Pressable style={styles.closeButton} onPress={onPress}>
            <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 0,
        backgroundColor: 'black',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems:'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 19,
    },
})

export default CloseButton;