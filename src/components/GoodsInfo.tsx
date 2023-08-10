import React, {useCallback} from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import GoodsInfoItem from './GoodsInfoItem';

type Item = {
    id: number;
    title: string;
    titleInfo: string;
    price: string;
    type: string;
    image: any;
    subimage: any;
    
};

function GoodsInfo({item, navigation}:{item:Item, navigation:any}) {
    return(
        <View style={styles.container}>
            <GoodsInfoItem item={item} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default GoodsInfo;