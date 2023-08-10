import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { LoggedInParamList } from '../../AppInner';

function CommunityWriteBtn({category,navigation}:{category?:string,navigation: NavigationProp<LoggedInParamList>}) {

    // const count = filteredData.length;
    const Write = useCallback(() => {
        navigation.navigate('WriteFind');
      }, [navigation]);
    return (
        <View style={styles.entireContainer}>
                <Text style={styles.entireText}>전체 <Text style={styles.num}>{category ? null: null }</Text></Text>
                <Pressable onPress={Write}>
                    <Text style={styles.writebtn}>글쓰기 ✏️</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    entireContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    entireText: {
        fontSize: 18,
        color: 'white',
    },
    num: {
        color: '#ff4376',
    },
    writebtn: {
        fontSize: 12,
        color: 'white',
        backgroundColor: 'black',
        opacity: 0.7,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 6,
        textAlign: 'center',
    },

})

export default CommunityWriteBtn;