import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

type Item = {
    id: string;
    keyword: string;
    image: any;
};

const DATA: Item[] = [
    {
        id: '1',
        keyword: '#더글로리',
        image: require('../../assets/images/Home/keyword1.png'),
    },
    {
        id: '2',
        keyword: '#일타강사',
        image: require('../../assets/images/Home/keyword2.png'),
    },
    {
        id: '3',
        keyword: '#에이미',
        image: require('../../assets/images/Home/keyword3.png'),
    }, 
    {
        id: '4',
        keyword: '#송중기',
        image: require('../../assets/images/Home/keyword4.png'),
    },
];

const keywordItem = ({ item } : { item: Item }) => (
    <View style={styles.keywordItem}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.keyword}>{item.keyword}</Text>
    </View>
)

function HomeKeyword() {
    return(
        <View style={styles.container}>
            <Text style={styles.keywordTitle}>급상승 키워드 ✨</Text>

            <FlatList 
            data={DATA}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={keywordItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    keywordTitle: {
        fontSize: 17,
        color: 'white',
        paddingVertical: 8,
        fontWeight: 'bold',
    },

    keywordItem: {
        paddingVertical: 10,
        paddingRight: 18,
        marginBottom: 40,
    },
    image: {
        marginBottom: 8,
    },
    keyword: {
        color: 'dimgray',
        fontSize: 13,
        textAlign: 'center',

    }
});

export default HomeKeyword;