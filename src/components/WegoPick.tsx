import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import WegoPickList from './WegoPickList';

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

const data: Item[] = [
    {
        id: 1,
        title: '도깨비가 머물렀다 간 곳,',
        subtitle: '도깨비 흔적 따라가기',
        text: '강원도 커플여행지 추천',
        image: require('../../assets/images/Home/wegopick/pick1.png'),
        
        image1: require('../../assets/images/Home/wegopick/pick1_1.png'),
        title1: '전문진 영진해변',
        address1: '강원도 강릉시 주문진읍 해안로 1609',
        info1: {
            title: '전문진 영진해변',
            titleInfo: '도깨비: 김고은이 메밀꽃을 들고 있던 촬영지',
            time: '24시간 운영',
            phone: '번호없음',
            etc: '공영주차장',
            type: '도깨비',
            episode: '시리즈 - 에피소드',
            address: '강원도 강릉시 주문진읍 해안로 1609',
            way: '주문진시외버스 종합터미널 인근',
            image: require('../../assets/images/Home/place/con1.png'),
            subimage: require('../../assets/images/Home/place/place1_1.png'),
        },
        image2: require('../../assets/images/Home/wegopick/pick1_2.png'),
        title2: '운현궁 양관',
        address2: '서울 종로구 운니동 114-7',
        info2: {
            title: '운현궁 양관',
            titleInfo: '도깨비:도깨비 외부 집으로 나오는 운현궁 양관',
            time: '영업중 20:00에 종료',
            phone: '번호없음',
            etc: '덕성여대 평생교육원',
            type: '도깨비',
            episode: '시리즈 - 에피소드',
            address: '서울 종로구 운니동 114-7',
            way: '안국역 4번 출구에서 218m',
            image: require('../../assets/images/Home/place/con1.png'),
            subimage: require('../../assets/images/Home/place/place1_1.png'),
        },
    },
    {
        id: 2,
        title: '게임에 참여하시겠습니까?',
        subtitle: '오징어게임 200%즐기기',
        text: '체험부터 촬영지까지 파헤치기',
        image: require('../../assets/images/Home/wegopick/pick2.png'),
        title1: '뽀꼬팡 창동점',
        address1: '서울 용산구 이태원동',
        image1: require('../../assets/images/Home/wegopick/pick2_1.png'),
        info1: {
            title: '뽀꼬팡 창동점',
            titleInfo: '오징어 게임: 기훈이 딸을 위해 인형 뽑기를 한 장소',
            time: '영업중 20:00에 종료',
            phone: '번호없음',
            etc: '주차, 식당, 남/녀 화장실 구분',
            type: '오징어 게임',
            episode: '시리즈 - 에피소드 1',
            address: '서울 창동구',
            way: '창동역에서 10분',
            image: require('../../assets/images/Home/wegopick/pick2p.png'),
            subimage: require('../../assets/images/Home/wegopick/pick2_1.png'),
        },
        title2: '이태원에서 즐기는 오징어 게임',
        address2: '서울 용산구 이태원동',
        image2: require('../../assets/images/Home/wegopick/pick2_2.png'),
        info2: {
            title: '궁궐 다리 월정교',
            titleInfo: '더킹: 영원의 군주 2화에서 극 중 이림금친왕이 시찰의 단청을 칠하는 장면에서 나온 명승지와 연모...더킹: 영원의 군주 2화에서 극 중 이림(금친왕)이 시찰의 단청을 칠하는 장면에서 나온 명승지와',
            time: '영업중 20:00에 종료',
            phone: '123-456-678',
            etc: '주차, 식당, 남/녀 화장실 구분',
            type: '더킹 영원의 군주',
            episode: '시리즈 - 에피소드 2',
            address: '전라도 영월읍',
            way: '구례구역에서 차로 30분',
            image: require('../../assets/images/Home/wegopick/pick4p.png'),
            subimage: require('../../assets/images/Home/wegopick/pick4_1.png'),
        },
    },
    // {
        // id: 3,
        // title: '미스터 션샤인',
        // subtitle: '역사 즐기기',
        // text: '미스터 선샤인 세트장',
        // image: require('../../assets/images/Home/wegopick/pick3.png'),
        // title1: '이태원에서 즐기는 오징어 게임',
        // address1: '서울 용산구 이태원동',
        // image1: require('../../assets/images/Home/wegopick/pick2_1.png'),
        // info1: {
        //     title: '궁궐 다리 월정교',
        //     titleInfo: '더킹: 영원의 군주 2화에서 극 중 이림금친왕이 시찰의 단청을 칠하는 장면에서 나온 명승지와 연모...더킹: 영원의 군주 2화에서 극 중 이림(금친왕)이 시찰의 단청을 칠하는 장면에서 나온 명승지와',
        //     time: '영업중 20:00에 종료',
        //     phone: '123-456-678',
        //     etc: '주차, 식당, 남/녀 화장실 구분',
        //     type: '더킹 영원의 군주',
        //     episode: '시리즈 - 에피소드 2',
        //     address: '전라도 영월읍',
        //     way: '구례구역에서 차로 30분',
        //     image: require('../../assets/images/Home/place/con1.png'),
        //     subimage: require('../../assets/images/Home/place/place1_1.png'),
        // },
        // title2: '이태원에서 즐기는 오징어 게임',
        // address2: '서울 용산구 이태원동',
        // image2: require('../../assets/images/Home/wegopick/pick2_2.png'),
        // info2: {
        //     title: '궁궐 다리 월정교',
        //     titleInfo: '더킹: 영원의 군주 2화에서 극 중 이림금친왕이 시찰의 단청을 칠하는 장면에서 나온 명승지와 연모...더킹: 영원의 군주 2화에서 극 중 이림(금친왕)이 시찰의 단청을 칠하는 장면에서 나온 명승지와',
        //     time: '영업중 20:00에 종료',
        //     phone: '123-456-678',
        //     etc: '주차, 식당, 남/녀 화장실 구분',
        //     type: '더킹 영원의 군주',
        //     episode: '시리즈 - 에피소드 2',
        //     address: '전라도 영월읍',
        //     way: '구례구역에서 차로 30분',
        //     image: require('../../assets/images/Home/place/con1.png'),
        //     subimage: require('../../assets/images/Home/place/place1_1.png'),
        // },
    // },
    {
        id: 4,
        title: '킹더 랜드 속',
        subtitle: '호텔 찾아 보기',
        text: '호텔 촬영장',
        image: require('../../assets/images/Home/wegopick/pick4.png'),
        
        image1: require('../../assets/images/Home/wegopick/pick4_1.png'),
        title1: '조선 팰리스 서울 강남',
        address1: '서울 강남구 테헤란로',
        info1: {
            title: '조선 팰리스 서울 강남',
            titleInfo: '킹더랜드 호텔1설명: 영원의 군주 2화에서 극 중 이림금친왕이 시찰의 단청을 칠하는 장면에서 나온 명승지와 연모...더킹: 영원의 군주 2화에서 극 중 이림(금친왕)이 시찰의 단청을 칠하는 장면에서 나온 명승지와',
            time: '킹더영업중 20:00에 종료',
            phone: '02-727-7200',
            etc: '주차, 식당, 남/녀 화장실 구분',
            type: '킹더랜드',
            episode: '시리즈 - 에피소드 1',
            address: '서울 강남구 테헤란로 231 센터필드타워 웨스트동',
            way: '선릉역 5번 출구에서 도보 15분',
            image: require('../../assets/images/Home/wegopick/pick4p.png'),
            subimage: require('../../assets/images/Home/wegopick/pick4_1.png'),
        },

        image2: require('../../assets/images/Home/wegopick/pick4_2.png'),
        title2: '파르나스 호텔 제주',
        address2: '제주 서귀포시 중문관광로',
        info2: {
            title: '파르나스 호텔 제주',
            titleInfo: '킹더랜드 외부 호텔 촬영지, 제주 호텔 중 바닷가가 가장 가까운 호텔',
            time: '체크인 15:00 체크아웃 11:00',
            phone: '064-801-5555',
            etc: '단체석, 주차, 예약, 무선 인터넷, 유아시설 (놀이방), 남/녀 화장실 구분, 장애인 편의시설',
            type: '킹더랜드',
            episode: '시리즈 - 에피소드 1',
            address: '제주 서귀포시 중문관광로72번길 100',
            way: '600번 공항 리무진 60분 소요',
            image: require('../../assets/images/Home/wegopick/pick4p.png'),
            subimage: require('../../assets/images/Home/wegopick/pick4_2.png'),
        },
    },
];
function WegoPick() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.pick}>위고위고 에디터가 직접</Text>
                <Text style={styles.pick}>선정한 HOT PICK</Text>

                <WegoPickList data={data} navigation={navigation} />
                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        marginBottom: 140,
    },
    pick: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },



})

export default WegoPick;