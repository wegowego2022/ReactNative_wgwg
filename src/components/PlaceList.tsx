import React, {useCallback} from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import PlaceItem from './PlaceItem';

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
type PlaceListProps = {
    data: Item[];
};

function PlaceList({data, navigation}: {data: Item[], navigation:any}) {
    if (!data) {
        return null;
    }
    const handlePress = (item: Item) => {
        navigation.navigate('PlaceInfo', { item });
    };
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item) => (
                <Pressable key={item.id} onPress={() =>handlePress(item)} style={styles.container}>
                    <PlaceItem item={item} />
                </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default PlaceList;