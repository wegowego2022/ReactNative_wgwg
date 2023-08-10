import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

type Item = {
    id: number;
    title: string;
    subtitle: string;
    text: string;
    image: any;
};

const DATA: Item[] = [
    {
        id: 1,
        title: '어디선가 많이 봤을껄?',
        subtitle: '굿즈의 재발견',
        text: 'Feat. 친환경 소재',
        image: require('../../assets/images/Home/special/spe1.png'),
    },
    {
        id: 2,
        title: '인기 드라마 속 주얼리',
        subtitle: 'TIFFANY & CO. k-CONTENTS',
        text: 'TIFFANY & CO. k-CONTENTS',
        image: require('../../assets/images/Home/special/spe2.png'),
    },
    {
        id: 3,
        title: 'KT Y 아티스트와 콜라보',
        subtitle: '우영우 굿즈 기획전',
        text: '이상한 변호사 우영우',
        image: require('../../assets/images/Home/special/spe3.png'),
    },
];

const planItem = ({ item } : { item: Item }) => (
    <View style={styles.planContainer}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.text}>{item.text}</Text>
    </View>
)
function HomePlan() {
    return (
        <View>
            <Text style={styles.planTitle}>위고위고 기획전⚡️</Text>
      
            {DATA.map((item) => (
                <View key={item.id.toString()}>{planItem({item})}</View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    planTitle: {
        color: 'white',
        fontSize: 17,
        marginTop: 20,
        paddingVertical: 12,
        fontWeight: 'bold',
    },
    planContainer: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
        opacity: 0.8,
    },
    title: {
        color: 'white',
        fontSize: 22,
        position: 'absolute',
        bottom: 85,
        left: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'white',
        fontSize: 22,
        position: 'absolute',
        bottom: 55,
        left: 30,
        fontWeight: 'bold',
    },
    text: {
        position: 'absolute',
        color: 'white',
        opacity: 0.7,
        fontSize: 13,
        bottom: 30,
        left: 30,

    },
});

export default HomePlan;