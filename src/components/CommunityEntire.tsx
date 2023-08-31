import React, {useState, useCallback, useEffect} from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import CommunityEntireItem from './CommunityEntireItem';

type Item = {
    id: number;
    title: string;
    category: string;
    text: string;
    time: string;
    profile: any;
    nickname: string;
    picture: any;
    isLiked: boolean;
    like: number;
    comment: number;
};

type NewItem = {
    id: number;
    category: string;
    title: string;
    text: string;
    time: string;
    profile: any;
    nickname: string;
    picture: any;
    isLiked: boolean;
    like: number;
    comment: number;
};

const DATA: Item[] = [
   {
    id: 1,
    category: '찾아주세요',
    title: '이상한 변호사 우영우',
    text: '우영우에서 나왔는데 찾고 싶어요! 아시는 분 있나요? 사진까지 첨부합니다. 우영우에 나온 그곳 알고싶어요 꼭이요!!!우영우에서 나왔는데 찾고 싶어요! 아시는 분 있나요? 사진까지 첨부합니다. 우영우에 나온 그곳 알고싶어요 꼭이요!!!',
    time: '3분전',
    profile: require('../../assets/images/more/profile-gray.png'),
    nickname: '뿌뿌식탐',
    picture: require('../../assets/images/community/pic1.png'),
    isLiked: false,
    like: 13,
    comment: 4,
   },
   {
    id: 2,
    category: '꿀팁공유',
    title: '이상한 변호사 우영우',
    text: '요즘 유행하는 드라마들의 특징을 분석해봤어요! 해외에서도 K-드라마가 유행..',
    time: '5분전',
    profile: require('../../assets/images/more/profile-gray.png'),
    nickname: 'Dreama_Queen',
    picture: require('../../assets/images/community/pic2.png'),
    isLiked: true,
    like: 202,
    comment: 16,
   },
   {
    id: 3,
    category: '일상',
    title: '수리남',
    text: '저는 요즘 수리남에 빠져 살아요~~ 하정우랑 황정민 배우분들 왜 이렇게 연기를 잘하죠?..',
    time: '10분전',
    profile: require('../../assets/images/more/profile-gray.png'),
    nickname: '뿌뿌식탐',
    picture: null,
    isLiked: true,
    like: 13,
    comment: 2,
   },
   {
    id: 4,
    category:'위고질문',
    title: '이상한 변호사 우영우',
    text: '우영우에서 나왔는데 찾고 싶어요! 아시는 분 있나요? 사진까지 첨부합니다!..',
    time: '3분전',
    profile: require('../../assets/images/more/profile-gray.png'),
    nickname: 'K_D_luv',
    picture: require('../../assets/images/community/pic1.png'),
    isLiked: true,
    like: 13,
    comment: 0,
   },
   {
    id: 5,
    category:'인기',
    title: '이상한 변호사 우영우',
    text: '우영우에서 나왔는데 찾고 싶어요! 아시는 분 있나요? 사진까지 첨부합니다!..',
    time: '3분전',
    profile: require('../../assets/images/more/profile-gray.png'),
    nickname: 'K_D_luv',
    picture: require('../../assets/images/community/pic1.png'),
    isLiked: false,
    like: 13,
    comment: 0,
   },
   {
   id: 6,
   category:'인기',
   title: '이상한 변호사 우영우',
   text: '우영우에서 나왔는데 찾고 싶어요! 아시는 분 있나요? 사진까지 첨부합니다!..',
   time: '3분전',
   profile: require('../../assets/images/more/profile-gray.png'),
   nickname: 'K_D_luv',
   picture: require('../../assets/images/community/pic1.png'),
   isLiked: false,
   like: 13,
   comment: 0,
  },
  {
    id: 7,
    category: '찾아주세요',
    title: '수리남',
    text: '저는 요즘 수리남에 빠져 살아요~~ 하정우랑 황정민 배우분들 왜 이렇게 연기를 잘하죠?..',
    time: '10분전',
    profile: require('../../assets/images/more/profile-gray.png'),
    nickname: '뿌뿌식탐',
    picture: null,
    isLiked: true,
    like: 13,
    comment: 2,
   },
];

type CommunityEntireProps = {
    category?: string;
    navigation: any;
    route: any;
};

function CommunityEntire({ category, navigation, route }: CommunityEntireProps) {
    
    // let filteredData :Item[] = DATA;

    // if (category) {
    //   filteredData = DATA.filter((item) => item.category === category);
    // }    
    // const count = filteredData.length;
// 새로 추가 된 항목
const [filteredData, setFilteredData] = useState<Item[]>(DATA);

useEffect(() => {
  if (category) {
    const newData = DATA.filter((item) => item.category === category);
    setFilteredData(newData);
  }
}, [category]);

const newItem: NewItem | undefined = route.params?.newItem;

if (newItem) {
  setFilteredData((prevData) => [newItem, ...prevData]);
}


    const CommunityPress = (item: Item) => {
        navigation.navigate('CommunityView', { item: item });
    };

    return (
        <ScrollView>
            <View style={styles.CommunityContainer}>

            {filteredData.map((item: Item) => (
                <Pressable key={item.id} onPress={() => CommunityPress(item)}>
                    <CommunityEntireItem item={item} />
                </Pressable>
            ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    CommunityContainer: {
        marginBottom: 5,
    },
    entireContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    entireText: {
        fontSize: 18,
        color: 'white',
    },
    num: {
        color: '#ff4376',
    },
    writebtn: {
        fontSize: 12,
        color: 'white',
        backgroundColor: 'black',
        opacity: 0.7,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 6,
        textAlign: 'center',
    },
});
export default CommunityEntire;

