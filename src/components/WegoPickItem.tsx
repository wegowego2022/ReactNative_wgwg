import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

type Item ={
    id: number;
    title: string;
    subtitle: string;
    text: string;
    image: any;
    title1: string;
    address1: string;
    image1: any;
    title2: string;
    address2: string;
    image2: any;
};


function WegoPickItem({item, navigation}:{item:Item, navigation:any}) {
    return (
    <View style={styles.container}>
        <View style={styles.pickItem}>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pickItem: {
        marginTop: 30,
        marginBottom: 20,
    },
    image: {
        height: 400,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
        opacity: 0.8,
    },
    title: {
        color: 'white',
        fontSize: 22,
        position: 'absolute',
        bottom: 85,
        left: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'white',
        fontSize: 22,
        position: 'absolute',
        bottom: 55,
        left: 30,
        fontWeight: 'bold',
    },
    text: {
        position: 'absolute',
        color: 'white',
        opacity: 0.7,
        fontSize: 13,
        bottom: 30,
        left: 30,
    },


    // belowItem: {
    //     flexDirection: 'row',
    // },
    // item: {
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    // },
    // image1: {
    //     borderRadius: 5,
    // },
    // itemText: {
    //     paddingHorizontal: 8,
    // },
    // title1: {
    //     color: 'white',
    // },
    // address1: {
    //     marginTop: 5,
    //     color: 'dimgray',
    //     fontSize: 13,
    // }
})

export default WegoPickItem;