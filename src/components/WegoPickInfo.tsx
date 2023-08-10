import React, {useCallback} from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import WegoPickInfoItem from './WegoPickInfoItem';

type Item ={
    id: number;
    title: string;
    subtitle: string;
    text: string;
    image: any;
    title1: string;
    address1: string;
    image1: any;
    info1: {
        [key:string]:string;
    };

    title2: string;
    address2: string;
    image2: any;
    info2: {
        [key:string]:string;
    };
};

function WegoPickInfo({item, navigation}:{item:Item, navigation:any}) {
    return(
        <View style={styles.container}>
            <WegoPickInfoItem item={item} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default WegoPickInfo;