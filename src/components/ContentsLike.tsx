import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeLikedItem } from '../slices/like';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
};

interface RootState {
  like: {
    items: Item[];
  };
}

const ContentsLike = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const likeItems = useSelector((state: RootState) => state.like.items);
  const goToNextScreen = (item: Item) => {
    navigation.navigate('HomeThismonthScreen', { item });
};
  const handleremoveLikedItem = (itemId:number) => {
    dispatch(removeLikedItem(itemId));
  };

  return (
    <View style={styles.container}>
    {likeItems.map((item:Item) => (
      <Pressable key={item.id} style={styles.item} onPress={() =>goToNextScreen(item)}>
 
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
            <AntDesign style={styles.icon} name="closecircle" onPress={() => handleremoveLikedItem(item.id)} />
          </View>

      </Pressable>
      ))}
    </View>

    
  );
};
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
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  itemContainer: {
    flex: 1,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: 250,
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
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
})
export default ContentsLike;
