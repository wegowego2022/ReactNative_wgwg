import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Share, Alert } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import GobackIconItem from './GobackIconItem';
import ThismonthItem from './ThismonthItem';
import ContentsVideoItem from './ContentsVideoItem';
import VideoPlayItem from './VideoPlayItem';

type Item = {
  id: number;
  title: string;
  age: string;
  year: string;
  episodeNum: string;
  titleInfo: string;
  cast: string; 
  type: string;
  image: any;
//
time: string;
operationHours: {
  [key: string]: string;
};
phone: string;
etc: string;

episode: string;
address: string;
way: string;
subimage: any;
};

  const HomeThismonthScreenItem=({navigation, item}:{navigation:any, item:Item}) =>{
  const [showDetail, setShowDetail] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const toggleDetail = () => {
    setShowDetail(!showDetail);
  }
  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };
  let titleInfoText = item.titleInfo;
  if (!showFullText && item.titleInfo.length > 50) {
    titleInfoText = item.titleInfo.slice(0, 50) + '...';
  }
  // data
  const similarContents = [
    { 
      id: 1,
      title: '강철비', 
      image: 'https://images.nstatic.org/info/tv/97970/k2PiYV5KByiNPdQh27DdEthxdHt.jpg',
      type: '영화',
    },
    { 
      id: 2,
      title: '서울대작전', 
      image: 'https://images.nstatic.org/info/tv/97970/k2PiYV5KByiNPdQh27DdEthxdHt.jpg',
      type: '영화',
    },
    { 
      id: 3,
      title: '오징어게임', 
      image: 'https://images.nstatic.org/info/tv/97970/k2PiYV5KByiNPdQh27DdEthxdHt.jpg',
      type: '시리즈',
    },
    { 
      id: 4,
      title: '더글로리', 
      image: 'https://images.nstatic.org/info/tv/97970/k2PiYV5KByiNPdQh27DdEthxdHt.jpg',
      type: '시리즈',
    },
  ]

return(
      <ScrollView style={styles.container}>
        <View style={styles.header}>

          <Image style={styles.image} source={{uri:item.image}}/>
          
          <GobackIconItem item={item} navigation={navigation} />

        </View>
        
        <View style={styles.containerInfo}>
          <View style={styles.titleCon}>
            <Text style={styles.title}>{item.title} </Text>
            <Text style={styles.age}>{item.age}</Text>
          </View>
          <Text style={styles.year}>{item.year}  에피소드 {item.episodeNum}개</Text>
          <Text style={styles.star}>⭐️ 4.9 <Text style={styles.review}>  리뷰 2개 보기</Text></Text>
            <View style={styles.containerInfoText}>
            <Text style={styles.titleInfo}>{titleInfoText}</Text>
               {item.titleInfo.length > 50 && (
                <Pressable onPress={toggleFullText}>
                  <Ionic 
                    name={showFullText ? 'chevron-up-sharp' : 'chevron-down-sharp'}
                    style={styles.InfoIconButton}
                  />
                </Pressable>
               )}
            </View>
            <Text style={styles.cast}>{item.cast}</Text>

          <View style={styles.separator} />


        

          <ContentsVideoItem />

          <VideoPlayItem />
          <VideoPlayItem />
     

        
        <View style={styles.separator} />

          <View style={styles.relatedContents}>
            <Text style={styles.relatedText}>비슷한 콘텐츠</Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarContents.map((item) => (
              <View key={item.id} style={styles.relatedContainer}>
                <ThismonthItem
                  navigation={navigation} item={item} 
                />
              </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
  );
              }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    color: 'white',
  },

  header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  image: {
    // backgroundColor: 'gray',
    width: '100%',
    height: 375,
    resizeMode: 'cover',
  },
  containerInfo: {
    paddingHorizontal: 15,
    paddingVertical:15,
  },
  titleCon: {
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  age: {
    fontWeight: 'bold',
    fontSize:11,
    color: 'white',
    backgroundColor: '#ff4376',
    borderRadius: 4,
    marginLeft: 5,
    marginTop: 5,
    padding: 3,
    width: 20,
    height: 20,
  },
  year: {
    color: 'white',
    opacity: 0.7,
    fontSize: 12,
    paddingTop: 3,
    paddingBottom:6,
  },
  star : {
    paddingVertical: 5,
    color: 'white',
  },
  review: {
    color: 'dimgray',
    fontSize:11,
  },
  containerInfoText: {
    flexDirection: 'row',
  },

  titleInfo: {
    width: '93%',
    color: 'white',
    paddingVertical:15,
    opacity: 0.5,
  },
  InfoIconButton: {
    marginTop: 18,
    fontSize: 15,
    color: 'gray',
    alignSelf: 'center',
  },
  cast: {
    fontSize: 11,
    color: 'dimgray',
    marginBottom: 15,
  },
  InfoDetail: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  InfoIcon: {
    fontSize: 15,
    color: 'gray',
    alignSelf: 'center',
  },
  InfoText: {
    color: 'white',
    opacity: 0.5,
    marginLeft: 15,
  },
  toggleButton: {
    color: '#ff4376',
    fontSize: 12,
    marginTop: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 15,
  },

  
  relatedContents: {
    marginBottom: 30,
  },
    relatedText: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 15,
  },
  relatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  nearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  nearText: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 15,
  },

});

export default HomeThismonthScreenItem;
