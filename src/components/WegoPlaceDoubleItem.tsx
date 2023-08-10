import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Pressable } from 'react-native';

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

function WegoPlaceDoubleItem({item, navigation}: {item:Item, navigation:any}) {
    const handlePress = (item: Item) => {
        navigation.navigate('PlacePickInfo', { item });
      };
      const handlePress2 = (item: Item) => {
        navigation.navigate('PlacePickInfo2', { item });
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
        width: 100,
        height: 100,
    },
    itemText: {
        width: 180,
        paddingHorizontal: 5,
        paddingTop: 10,
        marginLeft:10,
        marginRight: 10,
    },
    title1: {
        color: 'white',
        fontSize: 15,
    },
    address1: {
        marginTop: 15,
        color: 'dimgray',
        fontSize: 13,
    },
    press: {
        marginRight: 3,
      },
})

export default WegoPlaceDoubleItem;