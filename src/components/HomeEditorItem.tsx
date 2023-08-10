import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

type Item = {
    id: number;
    title: string;
    age: string;
    year: string;
    episodeNum: string;
    titleInfo: string;
    cast: string; 
    type: string;
    image: any;
  };



function HomeEditorItem({item, navigation}: {item:Item, navigation:any}) {
    return (
            <View style={styles.editor}>
              <Image style={styles.image} source={{ uri: item.image }} resizeMode='cover' />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
    );
  }

const styles = StyleSheet.create({



    editor: {
        width: 180,
        paddingHorizontal: 5,
        marginBottom: 30,
    },
    image: {
        
        width: '100%',
        height: 233,
        borderRadius: 5,
        resizeMode: 'cover',
    },
    title: {
        color: '#fff',
        fontSize: 13,
        paddingVertical: 4,
        opacity: 0.5,
    },
    type: {
        fontSize: 12,
        color: 'dimgray',
    },
    editorButton: {
        color: 'white',
        fontWeight: 'bold',
        borderColor: 'dimgray',
        borderWidth: 1,
        padding: 20,
        textAlign: 'center',
        borderRadius: 3,
        marginBottom: 10,
    },
});

export default HomeEditorItem;