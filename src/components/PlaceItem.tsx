import React, {useCallback} from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; 

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

function PlaceItem({ item }: { item: Item }) {

    return (
            <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={item.image} />
                    </View>
                    <View style={styles.secondContainer}>
                        <View>
                            <Image style={styles.subimage} source={item.subimage} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.type}>{item.type}</Text>
                            <Text style={styles.address}><Icon style={styles.icon} name="map-marker"/> {item.address}</Text>
                        </View>
                    </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        marginRight: 15,
    },
    image: {
        borderRadius: 5,
        width: 316,
        height: 240,
    },
    secondContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    subimage: {
        borderRadius: 5,
        width: 50,
        height: 70,
    },
    textContainer: {
        paddingLeft: 15,
        width:268,
    },
    title: {
        color: 'white',
        
    },
    type: {
        color: 'dimgray',
        paddingTop: 7,
        paddingBottom: 10,
        fontSize: 12,
    },
    icon: {
        color: 'dimgray',
        fontSize: 15,
    },
    address: {
        fontSize: 13,
        color: 'dimgray',

    },
});

export default PlaceItem;