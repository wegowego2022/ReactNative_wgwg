import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeLikedItem } from '../slices/likegood';
import { RootState } from '../store/reducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
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


function GoodsLike() {
  const dispatch = useDispatch();
  const likedItems = useSelector((state: RootState) => state.likegood.items);
  const navigation = useNavigation();
  const handleremoveLikedItem = (itemId: number) => {
    dispatch(removeLikedItem(itemId));
  };
  const goToNextScreen = (item:Item) => {
    navigation.navigate('GoodsInfo', {item});
  };

  return (
    <View style={styles.container}>
      {likedItems.map((item: Item, index: number) => (
        <Pressable key={index} style={styles.item} onPress={()=>goToNextScreen(item)}>
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={item.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
            <AntDesign style={styles.icon} name="closecircle" onPress={() => handleremoveLikedItem(item.id)} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    paddingBottom: 170,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '49%',
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 160,
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  price: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
    paddingVertical: 3,
  },
  type: {
    fontSize: 13,
    color: 'gray',
  },
  icon : {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 17,
    color: 'white',
  },
});

export default GoodsLike;
