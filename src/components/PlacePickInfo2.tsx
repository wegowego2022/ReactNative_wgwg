import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Share, Alert } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-clipboard/clipboard';
import RelatedPlaceItem from './RelatedPlaceItem';

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

function PlacePickInfo2({ item, navigation}:{ item:Item, navigation:any}) {
  const [showDetail, setShowDetail] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const toggleDetail = () => {
    setShowDetail(!showDetail);
  }
  const toggleFullText = () => {
    setShowFullText(!showFullText);
  }; 
  let titleInfoText = item.info2.titleInfo || '';
if (!showFullText && titleInfoText.length > 50) {
  titleInfoText = titleInfoText.slice(0, 50) + '...';
}



  //번호 복사 기능
  const [copiedNum, setCopiedNum] = useState('');
  const copyPhoneNumber = async() => {
    try {
      await Clipboard.setString(item.info2.phone);
      const num = await Clipboard.getString();
      setCopiedNum(num);
      Alert.alert(`${num} 복사 되었습니다.`);
    } catch(error) {
      console.log('Error copiedNumber:', error);
    }
  };
 
  // share function
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          '정보 공유하기',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  // data
  // const { title, titleInfo, type, address, image, subimage } = item;
  const items = [item.title, item.info2.type, item.info2.subimage];

  const nearPlaces = [
  { 
    id: 1,
    title: '쿠마커피', 
    image: require('../../assets/images/Home/place/con1.png'),
    distance: '239m',
  },
  { 
    id: 2,
    title: '오버트서울', 
    image: require('../../assets/images/Home/place/con1.png'),
    distance: '556m',
  },
  { 
    id: 3,
    title: '네스트', 
    image: require('../../assets/images/Home/place/con1.png'),
    distance: '239m',
  },
  { 
    id: 4,
    title: '쿠마커피', 
    image: require('../../assets/images/Home/place/con1.png'),
    distance: '239m',
  },
]

  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>

          <Image style={styles.image} source={item.image2}/>
          
          <View style={styles.iconContainer}>
              <Pressable onPress={()=> navigation.goBack()}>
                <Ionic name="arrow-back" style={styles.icon}/>
              </Pressable>
        
            <View style={styles.icons}>
              {/* <Pressable onPress={() => toggleLike(item)}>
                <AntDesign style={styles.icon} name={heartIcon} color={heartIconColor} />
              </Pressable> */}
              <Pressable onPress={onShare}>
                <AntDesign style={styles.icon} name="upload" />
              </Pressable>
            </View>
          </View>
        </View>
        
        <View style={styles.containerInfo}>
          <Text style={styles.title}>{item.info2.type} : {item.info2.title}</Text>
          <Text style={styles.star}>⭐️ 4.9 <Text style={styles.review}>  리뷰 2개 보기</Text></Text>
            <View style={styles.containerInfoText}>
            <Text style={styles.titleInfo}>{titleInfoText}</Text>
               {titleInfoText.length > 50 && (
                   <Pressable onPress={toggleFullText}>
                    <Ionic
                        name={showFullText ? 'chevron-up-sharp' : 'chevron-down-sharp'}
                        style={styles.InfoIconButton}
                    />
                </Pressable>
                )}

            </View>
          <View style={styles.separator} />


          <View style={styles.InfoDetail}>
            <Ionic name="time-sharp" style={styles.InfoIcon} />
            <Text style={styles.InfoText}>{item.info2.time}</Text>
            {/* <Pressable onPress={toggleDetail}>
              <Ionic
                name={showDetail ? 'chevron-up-sharp' : 'chevron-down-sharp'}
                style={styles.InfoIcon}
              />
            </Pressable> */}
          </View>
          {showDetail && (
            <View>
              <Text style={styles.InfoText}>
              {'\t'}{'\t'}화{'\n'}
              {'\t'}{'\t'}수{'\n'}
              {'\t'}{'\t'}목 10:00 ~ 20:00{'\n'}
              {'\t'}{'\t'}월요일 휴무{'\n'}
              </Text>
            </View>
          )}

          <View style={styles.InfoDetail}>
            <FontAwesome5 name="phone-alt" style={styles.InfoIcon} />
            <Text style={styles.InfoText}>{item.info2.phone} </Text>
            <Pressable onPress={copyPhoneNumber}> 
              <Ionic name="copy-sharp" style={styles.InfoIcon} />
            </Pressable>
          </View>
          <View style={styles.InfoDetail}>
            <FontAwesome5 name="list-alt" style={styles.InfoIcon} />
            <Text style={styles.InfoText}>{item.info2.etc}</Text>
          </View>

        <View style={styles.addressContainer}>
          <FontAwesome5 name="map-marker-alt" style={styles.ColorIcon} />
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressText}>{item.info2.address}</Text>
            <Text style={styles.addressSubText}>{item.info2.way}</Text>
          </View>
          <AntDesign name="right" style={styles.InfoIcon} />
        </View>

        
        <View style={styles.separator} />

          <View style={styles.relatedContents}>
            <Text style={styles.relatedText}>관련 콘텐츠</Text>
            <View style={styles.relatedContainer} >
              <View>
                  <Image style={styles.relatedImage} source={item.info2.subimage}/>
              </View>
              <View style={styles.relatedTextCon}>
                  <Text style={styles.relatedTitle}>{item.info2.type}</Text>
                  <Text style={styles.relatedEpisode}>{item.info2.episode}</Text>
              </View>
              <View>
                  <AntDesign name="right" style={styles.InfoIconSmall} />
              </View>
            </View>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.relatedContainer}>
                {items.map((title:string, id:number) => (
                  <RelatedPlaceItem 
                  key={id}
                  title={item.info2.type}
                  episode={item.info2.episode}
                  subimage={item.info2.image}
                  />
                  ))}
              </View>
            </ScrollView> */}
          </View>
        <View style={styles.separator} />
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
    backgroundColor: 'gray',
    width: '100%',
    height: 375,
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    fontSize: 22,
    padding: 15,
  },
  containerInfo: {
    paddingHorizontal: 15,
    paddingVertical:15,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
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

  addressContainer: {
    backgroundColor: '#242323',
    height: 80,
    borderRadius: 10,
    marginVertical: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ColorIcon: {
    fontSize: 32,
    color: '#ff4376',
    alignItems: 'center',
  },
  addressTextContainer: {
    width: '80%',
    padding: 5,
  },
  addressText: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
  },
  addressSubText: {
    color: 'white',
    opacity: 0.6,
    fontSize: 13,
    
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
    width: '100%',
    backgroundColor: '#242323',
    borderRadius: 5,
    height: 70,
  },
  relatedImage: {
    width: 50,
    height: 70,
    resizeMode: 'cover',
  },
  relatedTextCon: {
    alignSelf: 'center',
    width: '60%',
  },
  relatedTitle: {
    color: '#ffffff',
    opacity: 0.5,
    fontSize: 13,
  },
  relatedEpisode: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.3,
  },
  InfoIconSmall: {
    fontSize: 13,
    color: 'gray',
    paddingTop: 27,
    paddingRight: 15,
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

export default PlacePickInfo2;
