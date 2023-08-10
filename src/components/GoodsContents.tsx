import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Pressable, Alert } from 'react-native';
import GoodsKeyword from './GoodsKeyword';
import GoodsBox from './GoodsBox';
import { useNavigation } from '@react-navigation/native';

type Item = {
    id: number;
    title: string;
    titleInfo: string;
    price: string;
    type: string;
    image: any;
    subimage: any;
};

const data: Item[] = [
    {
        id: 1,
        title: 'SENNHEISER PXC 550-II',
        titleInfo: '우영우 헤드셋',
        price: '79,000원',
        type: '이상한 변호사 우영우',
        image: require('../../assets/images/Home/goods/goods1.png'),
        subimage: require('../../assets/images/Home/con4.png'),
    },
    {
        id: 2,
        title: '우산 123',
        titleInfo: '타이틀 정보',
        price: '79,000원',
        type: '이상한 변호사 우영우',
        image: require('../../assets/images/Home/goods/goods2.png'),
        subimage: require('../../assets/images/Home/con4.png'),
    
    },
    {
        id: 3,
        title: '시그니처 알카 그데션',
        titleInfo: '사내맞선 안효섭 옷',
        price: '79,000원',
        type: '이상한 변호사 우영우',
        image: require('../../assets/images/Home/goods/goods3.png'),
        subimage: require('../../assets/images/Home/con4.png'),
    
    },
    {
        id: 4,
        title: '조이그라이슨 트라이베카',
        titleInfo: '그해 우리는 김다미 가방',
        price: '79,000원',
        type: '그해 우리는 김다미 가방',
        image: require('../../assets/images/Home/goods/goods4.png'),
        subimage: require('../../assets/images/Home/con4.png'),
    
    },
    {
        id: 5,
        title: '유미의 세포 케이스',
        titleInfo: '유미의 세포 굿즈',
        price: '79,000원',
        type: '유미의 세포 굿즈',
        image: require('../../assets/images/Home/goods/goods5.png'),
        subimage: require('../../assets/images/Home/con4.png'),
    
    },
    {
        id: 6,
        title: '릴리트 01',
        titleInfo: '사내맞선 안효섭 안경',
        price: '79,000원',
        type: '사내맞선 안효섭 안경',
        image: require('../../assets/images/Home/goods/goods6.png'),
        subimage: require('../../assets/images/Home/con4.png'),
    
    },
];

function Ready() {
    Alert.alert('준비중입니다.');
}
function GoodsContents() {
    const navigation=useNavigation();
    return (
        <View>
            <View style={styles.container}>
                <Pressable onPress={Ready}>
                    <Image 
                        source={require('../../assets/images/Home/goods/banner1.png')}
                        style={styles.event}
                        />
                </Pressable>

                <GoodsKeyword />

                <GoodsBox data={data} navigation={navigation}/>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 140,
    },
    event: {
        width: '100%',
    }
})

export default GoodsContents;