import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
// import YouTube from 'react-native-youtube';
import Video from 'react-native-video';

const DATA = [
    {
        id:1,
        video: require('../../assets/videos/480.mp4'),
        title: '에피소드 1: 전요한과 첫 대면한 강인구',
        time: '21:30',
        info: '새로운 사업을 위해 공장을 알아보러 간 강인구, 하지만 졸지에 세력 싸움에 휘말리고 있다. 이때, 현지의 목사가 인구를 돕겠다고 나선다.',
        image1: require('../../assets/images/Home/place/con2.png'),
        title1: '제주 허니문 하우스',
        address1: '제주 서귀포시 토평동',
        image2: require('../../assets/images/Home/goods/goods3.png'),
        title2: '아미 남성용 셔츠',
        price: '10% 219,000원',
    },
];

function VideoPlayItem() {
    const item = DATA[0];

    return (
        <View style={styles.container}>
            <Video
                source={item.video}
                style={styles.video}
                controls={true} // Show video controls (play/pause buttons, etc.)
            />
            {/* <YouTube
            videoId="JUZx_088l_Q" // YouTube video ID or URL
            style={styles.video}
            /> */}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.info}>{item.info}</Text>

            <ScrollView style={styles.belowItem} horizontal={true}>
                <View style={styles.item}>
                    <View>
                        <Image style={styles.image1} source={item.image1} />
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.title1}>{item.title1}</Text>
                        <Text style={styles.address1}>{item.address1}</Text>
                    </View>
                </View>
                    <View style={styles.item}>
                        <View>
                            <Image style={styles.image1} source={item.image2} />
                        </View>
                        <View style={styles.itemText}>
                            <Text style={styles.title1}>{item.title2}</Text>
                            <Text style={styles.address1}>{item.price}</Text>
                        </View>
                    </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 25,
    },
    video: {
      flex: 1,
      height: 195,
      // backgroundColor: 'yellow',
      alignSelf: 'stretch',
  },
    title: {
        fontSize: 14,
        color: '#ffffff',
    },
    time: {
        color: '#ffffff',
        fontSize: 12,
        opacity: 0.5,
        paddingVertical: 5,
    },
    info: {
        marginTop: 17,
        fontSize: 13,
        color: '#ffffff',
        opacity: 0.6,
    },

    belowItem: {
        flexDirection: 'row',
        paddingVertical: 40,
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
        paddingRight: 50,
    },
    title1: {
        color: 'white',
        fontSize: 14,
    },
    address1: {
        marginTop: 5,
        color: 'dimgray',
        fontSize: 13,

    },
});


export default VideoPlayItem;
