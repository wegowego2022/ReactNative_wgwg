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
        keyword: '오징어게임',
        image: require('../../assets/images/Home/goods/keyword1.png'),
    },
    {
        id: '2',
        keyword: '기생충',
        image: require('../../assets/images/Home/goods/keyword2.png'),
    },
    {
        id: '3',
        keyword: '맛있는 녀석들',
        image: require('../../assets/images/Home/goods/keyword3.png'),
    }, 
    {
        id: '4',
        keyword: '아이유',
        image: require('../../assets/images/Home/goods/keyword4.png'),
    },
    {
        id: '5',
        keyword: '유미의세포들',
        image: require('../../assets/images/Home/goods/keyword5.png'),
    },
    {
        id: '6',
        keyword: 'BTS',
        image: require('../../assets/images/Home/goods/keyword6.png'),
    },
    {
        id: '7',
        keyword: '우영우',
        image: require('../../assets/images/Home/goods/keyword7.png'),
    }, 
    {
        id: '8',
        keyword: '더보기',
        image: require('../../assets/images/Home/goods/keyword8.png'),
    },
];



function GoodsKeyword() {
    return (
        <View>
            <View style={styles.container}>
                {DATA.map((item) => (
                    <View style={styles.keywordItem} key={item.id}>
                        <Image style={styles.image} source={item.image} />
                        <Text style={styles.keyword}>{item.keyword}</Text>
                    </View>
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
 
    },
    keywordItem: {
        width: '25%',
        alignItems: 'center',

    },
    image: {
        marginVertical:5,
    },
    keyword: {
        color: 'dimgray',
        fontSize: 12,
        marginBottom: 10,
    },
})

export default GoodsKeyword;