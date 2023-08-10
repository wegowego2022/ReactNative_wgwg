import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

function WegoPlaceItem({item, navigation}: {item:Item, navigation:any}) {
    
    const handlePress = (item: Item) => {
        navigation.navigate('PlacePickInfo', { item });
      };
      const handlePress2 = (item: Item) => {
        navigation.navigate('PlacePickInfo2', { item });
      };

    const next = (item:Item) => {
        navigation.navigate('WegoPickInfo', { item })
    };

    return (

        <ScrollView style={styles.belowItem} horizontal={true}>
            <Pressable onPress={() => handlePress(item)} style={styles.press}>
            <View style={styles.item}>
                <View>
                    <Image style={styles.image1} source={item.image1} />
                </View>
                <View style={styles.itemText}>
                    <Text style={styles.title1}>{item.title1}</Text>
                    <Text style={styles.address1}>{item.address1}</Text>
                </View>
            </View>
            </Pressable>
            <Pressable onPress={() => handlePress2(item)} style={styles.press}>
            <View style={styles.item}>
                <View>
                    <Image style={styles.image1} source={item.image2} />
                </View>
                <View style={styles.itemText}>
                    <Text style={styles.title1}>{item.title2}</Text>
                    <Text style={styles.address1}>{item.address2}</Text>
                </View>
            </View>
            </Pressable>
            <Pressable onPress={() => next(item)}>
                <View style={styles.more}>
                    <Text style={styles.moreText}>더보기 </Text>
                    <AntDesign name="right" style={styles.InfoIcon} />
                </View>
            </Pressable>
        </ScrollView>

    );
}


const styles = StyleSheet.create({
    belowItem: {
        flexDirection: 'row',
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image1: {
        borderRadius: 5,
        width: 50,
        height: 50,
    },
    itemText: {
        paddingHorizontal: 8,
        width: 230,
    },
    title1: {
        color: 'white',
    },
    address1: {
        marginTop: 5,
        color: 'dimgray',
        fontSize: 13,
    },
    more: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    moreText: {
        color: 'dimgray',
        fontSize: 16,
        paddingBottom:5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    InfoIcon: {
        fontSize: 15,
        color: 'gray',
        // alignItems: 'center',
    },
    press: {
        marginRight: 3,
      },
})

export default WegoPlaceItem;