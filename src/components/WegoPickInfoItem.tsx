import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Share, Alert } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WegoPickItem from './WegoPickItem';
import WegoPlaceDoubleItem from './WegoPlaceDoubleItem';

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

function WegoPickInfoItem({ item, navigation}:{ item:Item, navigation:any}) {

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



const handlePress1 = (item: Item) => {
  navigation.navigate('PlaceInfo', { item });
};

  return (
    <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
                <Pressable onPress={()=> navigation.goBack()}>
                  <Ionic name="arrow-back" style={styles.icon}/>
                </Pressable>
          
              <View style={styles.icons}>
                <Pressable onPress={onShare}>
                  <AntDesign name="upload" style={styles.icon}  />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.separator} />

        <View style={styles.itemContainer}>
            <WegoPickItem item={item} navigation={navigation}/>
          <ScrollView horizontal>

          <Pressable onPress={() => handlePress1(item)}>
            <WegoPlaceDoubleItem 
            item={item} 
            
            navigation={navigation}
            
            />
          </Pressable>
          </ScrollView>
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
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 100,
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
    color: '#ff4376',

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
    fontSize: 16,

  },
  price: {
    fontSize: 18,
    color: '#ffffff',
    paddingVertical: 4,
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



  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#141414',
    marginVertical: 20,
  },



  relatedContents: {
    marginBottom: 25,
    marginHorizontal: 15,
  },
    relatedText: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 13,
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

  purchaseButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    backgroundColor: '#ff4376',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
  },
  purchaseButton: {
    backgroundColor: '#ff4376',
    // borderRadius: 8,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginHorizontal: 15,
  },

});

export default WegoPickInfoItem;
