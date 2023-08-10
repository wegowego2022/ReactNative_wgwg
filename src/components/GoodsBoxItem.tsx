import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';


type Item = {
    id: number;
    title: string;
    titleInfo: string;
    price: string;
    type: string;
    image: any;
    subimage: any;
};



function GoodsBoxItem({item}:{item:Item}) {
    return (
            <View style={styles.container}>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.type}>{item.type}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        width: '100%',
        borderRadius: 5,
    },
    title: {
        paddingHorizontal: 5, 
        padding:5,
        fontSize: 14,
        color: 'white',

    },
    price: {
        paddingHorizontal: 5,
        fontSize: 15,
        color: 'white',
    },
    type: {
        padding:5,
        fontSize: 13,
        color: '#ffffff',
        opacity: 0.5,
        marginBottom: 20,
    },
})

export default GoodsBoxItem;