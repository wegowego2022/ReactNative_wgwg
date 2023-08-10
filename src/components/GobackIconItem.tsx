import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Share, Alert } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedItem, removeLikedItem } from '../slices/like';
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

interface GobackIconItemProps {
  item: Item;
  navigation: any;
}

const GobackIconItem: React.FC<GobackIconItemProps> = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const likeItems = useSelector((state: any) => state.like.items);
  const isLiked = likeItems.some((likedItem: Item) => likedItem.id === item.id);

  const toggleLike = () => {
    if (isLiked) {
      dispatch(removeLikedItem(item.id));
    } else {
      dispatch(addLikedItem(item));
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

    return (
        <View style={styles.iconContainer}>
              <Pressable onPress={()=> navigation.goBack()}>
                <Ionic name="arrow-back" style={styles.icon}/>
              </Pressable>
        
            <View style={styles.icons}>
              <Pressable onPress={toggleLike} >
                <AntDesign style={styles.icon} name={isLiked? "heart" : "hearto"} color={isLiked ? '#ff4376' : 'gray'} />
              </Pressable>

              <Pressable onPress={onShare} >
                <AntDesign style={styles.icon} name="upload" />
              </Pressable>
            </View>
          </View>
    )
}


const styles = StyleSheet.create({

 header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

});

export default GobackIconItem;
