
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';

type Item = {
  id: number;
  image: any;
  title: string;
  type: string; 
};

const ThismonthItem = ({ item, navigation }: { item: Item, navigation:any}) =>{
    return (
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
        </View>
    );
}
    



const styles = StyleSheet.create({
  itemContainer: {
    position: 'relative',
    width: 100,
    marginRight: 10,
  },

  image: {
    borderRadius: 5,
    width: '100%',
    height: 140,
  },
  textContainer: {
    padding: 5,
  },
  title: {
    fontSize: 14,
    color: 'dimgray',
  },
  type: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ThismonthItem;



