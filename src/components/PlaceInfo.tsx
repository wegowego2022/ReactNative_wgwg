import React, {useCallback} from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import PlaceInfoItem from './PlaceInfoItem';
type Item = {
    id: number;
    title: string;
    titleInfo: string;
    time: string;
    operationHours: {
        [key: string]: string;
    };
    phone: string;
    etc: string;
    type: string;
    episode: string;
    address: string;
    way: string;
    image: any;
    subimage: any;
};

function PlaceInfo({item, navigation}:{item:Item, navigation:any}) {
    return(
        <View style={styles.container}>
            <PlaceInfoItem item={item} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default PlaceInfo;