import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Pressable } from 'react-native';
import GoodsBoxItem from './GoodsBoxItem';

type Item = {
    id: number;
    title: string;
    titleInfo: string;
    price: string;
    type: string;
    image: any;
    subimage: any;
};
type GoodsBoxProps = {
    data: Item[];
};



function GoodsBox({data, navigation}:{data:Item[], navigation:any}) {
    
    const handlePress = (item: Item) => {
        navigation.navigate('GoodsInfo', { item });
    };
    return (
        <View>
            <View style={styles.container}>
                {data.map((item) => (
                    <Pressable key={item.id} onPress={() => handlePress(item)} style={styles.press}>
                        <GoodsBoxItem item={item} />
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    press: {
        width: '48%',
        marginRight: 3,
    },

})

export default GoodsBox;