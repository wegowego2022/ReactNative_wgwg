import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Share, Alert } from 'react-native';
import RelatedPlaceItem from './RelatedPlaceItem';
import RelatedGoodsItem from './RelatedGoodsItem';
import GobackIconItem3 from './GobackIconItem3';

type Item = {
  id: number;
  title: string;
  titleInfo: string;
  price: string;
  type: string;
  image: any;
  subimage: any;
};

function GoodsInfoItem({ item, navigation}:{ item:Item, navigation:any}) {
  // data
  const items = [item.type, item.image, item.subimage];

  const relatedGoods = [
  { 
    id: 1,
    titleInfo: 'MOMENTUM3', 
    image: require('../../assets/images/Home/goods/goods2.png'),
    price: '329,000원',
  },
  { 
    id: 2,
    titleInfo: 'MOMENTUM3', 
    image: require('../../assets/images/Home/goods/goods1.png'),
    price: '329,000원',
  },
  { 
    id: 3,
    titleInfo: 'MOMENTUM3', 
    image: require('../../assets/images/Home/goods/goods3.png'),
    price: '329,000원',
  },
  { 
    id: 4,
    titleInfo: 'MOMENTUM3', 
    image: require('../../assets/images/Home/goods/goods4.png'),
    price: '329,000원',
  },
]

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.header}>

            <Image style={styles.image} source={item.image}/>
            
            <GobackIconItem3 item={item} navigation={navigation} />
           
          </View>
        
          <View style={styles.containerInfo}>
            <Text style={styles.title}>[{item.titleInfo}] {item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
            
            <Text style={styles.star}>⭐️ 4.9 <Text style={styles.review}>  리뷰 2개 보기</Text></Text>
          </View>
          


        
          <View style={styles.separator} />

          <View style={styles.relatedContents}>
            <Text style={styles.relatedText}>관련 콘텐츠</Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.relatedContainer}>
                {items.map((type:string, id:number) => (
                  <RelatedPlaceItem 
                  key={id}
                  title={type}
                  subimage={item.subimage}
                  />
                  ))}
              </View>
            </ScrollView>
         

            <View style={styles.separator} />

            <View>
              <Text style={styles.nearText}>관련 상품</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.nearContainer}>
                {relatedGoods.map((item:any) => (
                  <RelatedGoodsItem
                    key={item.id}
                    image={item.image}
                    titleInfo={item.titleInfo}
                    price={item.price} 
                  />
                ))}
                </View>
              </ScrollView>


            </View>
          </View>
        </ScrollView>
            
            <View style={styles.purchaseButtonContainer}>
              <Pressable style={styles.purchaseButton} onPress={() => console.log('Purchase button pressed')}>
                <Text style={styles.purchaseButtonText}>구매하러 가기</Text>
              </Pressable>
            </View>
      </View>

  
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
    borderBottomColor: 'black',
    marginVertical: 15,
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
  

});

export default GoodsInfoItem;
