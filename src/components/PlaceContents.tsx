import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import PlaceKeyword from './PlaceKeyword';
import PlaceList from './PlaceList';
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
    image: string;
    subimage: any;
};

const data: Item[] = [
    {
        id: 1,
        title: '궁궐 다리 월정교',
        titleInfo: '더킹: 영원의 군주 2화에서 극 중 이림금친왕이 시찰의 단청을 칠하는 장면에서 나온 명승지와 연모...더킹: 영원의 군주 2화에서 극 중 이림(금친왕)이 시찰의 단청을 칠하는 장면에서 나온 명승지와',
        time: '영업중 20:00에 종료',
        operationHours: {
            one: '월 10:00 ~ 20:00',
            two: '화 10:00 ~ 20:00',
            three: '수 10:00 ~ 20:00',
            four: '목 10:00 ~ 20:00',
            five: '금 10:00 ~ 20:00',
            six: '토 10:00 ~ 20:00',
            seven: '일 휴무',
        },
        phone: '123-456-678',
        etc: '주차, 식당, 남/녀 화장실 구분',
        type: '더킹 영원의 군주',
        episode: '시리즈 - 에피소드 2',
        address: '전라도 영월읍',
        way: '구례구역에서 차로 30분',
        image: require('../../assets/images/Home/place/con1.png'),
        subimage: require('../../assets/images/Home/place/place1_1.png'),
    },
    {
        id: 2,
        title: '웨스틴 조선 서울',
        titleInfo: '전요환을 쫓기위해 수리남까지 간 국정원들의 안전가옥은 해외가 아닌 서울 호텔',
        time: '체크인: 오후3:00, 체크아웃: 오후12:00',
        operationHours: {
            // one: '월 10:00 ~ 20:00',
            // two: '화 10:00 ~ 20:00',
            // three: '수 10:00 ~ 20:00',
            // four: '목 10:00 ~ 20:00',
            // five: '금 10:00 ~ 20:00',
            // six: '토 10:00 ~ 20:00',
            // seven: '일 휴무',
        },
        phone: '02-771-0500',
        etc: '주차, 식당, 남/녀 화장실 구분, 5성급 호텔',
        type: '수리남',
        episode: '시리즈 - 에피소드 4',
        address: '서울특별시 중구 소공로 106',
        way: '구례구역에서 차로 30분',
        image: require('../../assets/images/Home/place/con2.png'),
        subimage: require('../../assets/images/Home/place/con2_1.png'),
    },
    {
        id: 3,
        title: '청주 용화사',        
        titleInfo: '최혜정과 예비 시어머니, 문동은을 마주했던 장소',
        time: '24시간 운영',
        operationHours: {
            one: '24시간 운영',
            two: '24시간 운영',
            three: '24시간 운영',
            four: '24시간 운영',
            five: '24시간 운영',
            six: '24시간 운영',
            seven: '24시간 운영',
        },
        phone: '043-274-2159',
        etc: '주차가능/ 밤10시 이후 사찰 밖 주차',
        type: '더글로리',
        episode: '시리즈 - 에피소드 3',
        address: '충청북도 청주시 흥덕구 사직동 216-1',
        way: '',
        image: require('../../assets/images/Home/place/con3.png'),
        subimage: require('../../assets/images/Home/place/place3_1.png'),
    },
    {
        id: 4,
        title: '카자구루마',
        titleInfo: '이상한 변호사 우영우 아버지가 운영하는 김밥집, 실제로는 행궁동 덮밥, 일식집으로 유명하다.',
        time: '영업중 22:00에 종료',
        operationHours: {
            one: '월 정기휴무',
            two: '화 11:30 ~ 22:00',
            three: '수 11:30 ~ 22:00',
            four: '목 11:30 ~ 22:00',
            five: '금 11:30 ~ 22:00',
            six: '토 11:30 ~ 22:00',
            seven: '일 11:30 ~ 22:00',
        },
        phone: '0507-1348-7303',
        etc: '일식당',
        type: '이상한 변호사 우영우',
        episode: '시리즈 - 에피소드 1',
        address: '경기 수원시 팔달구 신풍로23번길 61 1층',
        way: '',
        image: require('../../assets/images/Home/place/restu1.png'),
        subimage: require('../../assets/images/Home/place/restu1_1.png'),
    },
    {
        id: 5,
        title: '백반집 백성식당',        
        titleInfo: '나혼자산다 팜유 세미나 목포 맛집: 제철음식 가득한 목포에서 열린 팜유 세미나의 첫 아침으로 한정식으로 나온 백반집이다.',
        time: '영업중 20:00에 종료',
        operationHours: {
            one: '월 07:00 ~ 20:00',
            two: '화 07:00 ~ 20:00',
            three: '수 07:00 ~ 20:00',
            four: '목 07:00 ~ 20:00',
            five: '금 07:00 ~ 20:00',
            six: '토 07:00 ~ 20:00',
            seven: '일 휴무',
        },
        phone: '061-244-4593',
        etc: '백반: 11000원',

        type: '나 혼자 산다',
        episode: '예능 - 에피소드 500',
        address: '전라남도 목포시 번화로 68',
        way: '',
        image: require('../../assets/images/Home/place/res2.png'),
        subimage: require('../../assets/images/Home/place/res2_1.png'),
    },
    {
        id: 6,
        title: '테라 네라 레스토랑',        
        titleInfo: '에밀리 파리에 가다1: 가브리엘이 운영했던 프렌치 레스토랑, 하지만 실제로는 이탈리안 레스토랑이다.',
        time: '영업중 23:30에 종료',
        operationHours: {
            one: '월 12:00 ~ 22:30',
            two: '화 12:00 ~ 22:30',
            three: '수 12:00 ~ 22:30',
            four: '목 12:00 ~ 22:30',
            five: '금 12:00 ~ 22:30',
            six: '토 12:00 ~ 22:30',
            seven: '일 휴무',
        },
        phone: '+33-1-43-54-83-09',
        etc: '이탈리아 식당',
        type: '에밀리 파리에 가다1',
        episode: '시리즈 - 에피소드 1',
        address: '18 Rue des Fossés Saint-Jacques, 75005, France',
        way: '',
        image: require('../../assets/images/Home/place/res3.png'),
        subimage: require('../../assets/images/Home/place/over3_1.png'),
    },
    {
        id: 7,
        title: '구례 오산 사성암',
        titleInfo: '더킹 영원의 군주 2화에서 극 중 이림금친왕이 시찰의 단청을 칠하는 장면에서 나온 명승지와 연모',
        time: '영업중 20:00에 종료',
        operationHours: {
            one: '월요일 휴무',
            two: '화 10:00 ~ 20:00',
            three: '수 10:00 ~ 20:00',
            four: '목 10:00 ~ 20:00',
            five: '금 10:00 ~ 20:00',
            six: '토 12:00 ~ 22:00',
            seven: '일 12:00 ~ 22:00',
        },
        phone: '061-781-4544',
        etc: '주차, 식당, 남/녀 화장실 구분',

        type: '더킹 영원의 군주',
        episode: '시리즈 - 에피소드 2',
        address: '전남 구례문 문척면 사성암길 303',
        way: '',
        image: require('../../assets/images/Home/place/place1.png'),
        subimage: require('../../assets/images/Home/place/place1_1.png'),
    },
    {
        id: 8,
        title: '월정교',
        titleInfo: '더킹: 영원의 군주 2화에서 극 중 이림금친왕이 시찰의 단청을 칠하는 장면에서 나온 명승지와 연모...더킹: 영원의 군주 2화에서 극 중 이림(금친왕)이 시찰의 단청을 칠하는 장면에서 나온 명승지와',
        time: '영업중 20:00에 종료',
        operationHours: {
            one: '월 10:00 ~ 20:00',
            two: '화 10:00 ~ 20:00',
            three: '수 10:00 ~ 20:00',
            four: '목 10:00 ~ 20:00',
            five: '금 10:00 ~ 20:00',
            six: '토 10:00 ~ 20:00',
            seven: '일 휴무',
        },
        phone: '123-456-678',
        etc: '주차, 식당, 남/녀 화장실 구분',

        type: '더킹 영원의 군주',
        episode: '시리즈 - 에피소드 2',
        address: '전라도 영월읍',
        way: '구례구역에서 차로 30분',
        image: require('../../assets/images/Home/place/place2.png'),
        subimage: require('../../assets/images/Home/place/place2_2.png'),
    },
    {
        id: 9,
        title: '폴라데이 캠핑장',
        titleInfo: '최치열과 남행선가족들과 우연히 만나게 되는 낚시터&캠핑장',
        time: '입실시간:오후1시, 퇴실시간:오전1시',
        operationHours: {
            one: '월 10:00 ~ 20:00',
            two: '화 10:00 ~ 20:00',
            three: '수 10:00 ~ 20:00',
            four: '목 10:00 ~ 20:00',
            five: '금 10:00 ~ 20:00',
            six: '토 10:00 ~ 20:00',
            seven: '일 휴무',
        },
        phone: '031-535-5001',
        etc: '캠핑 사이트 비용 : 10만원',
        type: '일타 스캔들',
        episode: '시리즈 - 에피소드 4',
        address: '경기 포천시 군내면 선정비로58',
        way: '포천시 군내면 선정비로58',
        image: require('../../assets/images/Home/place/data9.png'),
        subimage: require('../../assets/images/Home/place/data9_1.png'),
    },
    {
        id: 10,
        title: '자킨토스, 나비지오 쉽렉비치',
        titleInfo: '송중기, 송혜고 데이트 장소로 유시진 대위와 강모연이 키스했던 로맨틱한 장소이다.',
        time: '영업중 24시간 영업',
        operationHours: {
            // one: '월 10:00 ~ 20:00',
            // two: '화 10:00 ~ 20:00',
            // three: '수 10:00 ~ 20:00',
            // four: '목 10:00 ~ 20:00',
            // five: '금 10:00 ~ 20:00',
            // six: '토 10:00 ~ 20:00',
            // seven: '일 휴무',
        },
        phone: 'info@Navagiobeach.gr',
        etc: '주차, 식당, 남/녀 화장실 구분',

        type: '태양의 후예',
        episode: '시리즈 - 에피소드',
        address: 'Zakynthos, Navagio Beach, Greek',
        way: '',
        image: require('../../assets/images/Home/place/over1.png'),
        subimage: require('../../assets/images/Home/place/over1_1.png'),
    },
    {
        id: 11,
        title: '르게른 호수',
        titleInfo: '사랑의 불시착: 르게른 호수 앞에서 프로포즈하는 리정혁',
        time: '영업중 24시간 운영',
        operationHours: {
            // one: '월 10:00 ~ 20:00',
            // two: '화 10:00 ~ 20:00',
            // three: '수 10:00 ~ 20:00',
            // four: '목 10:00 ~ 20:00',
            // five: '금 10:00 ~ 20:00',
            // six: '토 10:00 ~ 20:00',
            // seven: '일 휴무',
        },
        phone: '번호없음',
        etc: '호수 근방 주차 어려움',

        type: '사랑의 불시착',
        episode: '시리즈 - 에피소드 16',
        address: '스위스, 6078 Lungern',
        way: '',
        image: require('../../assets/images/Home/place/over2.png'),
        subimage: require('../../assets/images/Home/place/over2_2.png'),
    },
    {
        id: 12,
        title: '블랑제리 무뎅',
        titleInfo: '에밀리가 먹었던 뺑 오 쇼콜라 빵집',
        time: '영업중 07:00 ~ 20:00',
        operationHours: {
            one: '월 07:00 ~ 20:00',
            two: '화 07:00 ~ 20:00',
            three: '수 07:00 ~ 20:00',
            four: '목 07:00 ~ 20:00',
            five: '금 07:00 ~ 20:00',
            six: '토 휴무',
            seven: '일 휴무',
        },
        phone: '+33-1-43-54-12-22',
        etc: '남/녀화장실 구분',
        type: '에밀리, 파리에 가다1',
        episode: '시리즈 - 에피소드 2',
        address: '16 Rue des Fossés Saint-Jacques, 75005, France',
        way: '',
        image: require('../../assets/images/Home/place/over3.png'),
        subimage: require('../../assets/images/Home/place/over3_1.png'),

    },
  ];




function PlaceContents() {
    const navigation=useNavigation();
    return (
        <View>
            <View style={styles.container}>
                {/* <Image 
                    source={require('../../assets/images/Home/Contents/banner1.png')}
                    style={styles.event}
                /> */}
            <Text style={styles.thismonthText1}>이달의 인기 장소👀</Text>
            <PlaceList data={data.slice(0, 3)} navigation={navigation} />

            <Text style={styles.thismonthText}>시청자를 괴롭혔던 인기맛집👀</Text>
            <PlaceList data={data.slice(3,6)} navigation={navigation}/>

            <PlaceKeyword />
            
            <Text style={styles.thismonthText}>회원님이 좋아할만한 장소💘</Text>
            <PlaceList data={data.slice(6,9)} navigation={navigation}/>

            <Text style={styles.thismonthText}>해외 속 인기장소✈️</Text>
            <PlaceList data={data.slice(9,12)} navigation={navigation}/>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    thismonthText: {
        color: 'white',
        fontSize: 17,
        marginTop: 40,
        paddingVertical: 12,
        fontWeight: 'bold',
    },
    thismonthText1: {
        color: 'white',
        fontSize: 17,
        marginTop: 0,
        paddingVertical: 12,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 140,
    
    },
    event: {
        width: '100%',
    },

});
export default PlaceContents;
