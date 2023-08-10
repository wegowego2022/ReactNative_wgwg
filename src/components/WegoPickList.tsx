import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Pressable } from 'react-native';
import WegoPickItem from './WegoPickItem';
import WegoPlaceItem from './WegoPlaceItem';

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
type GoodsBoxProps = {
  data: Item[];
};

function WegoPickList({ data, navigation }: { data: Item[]; navigation: any }) {
  const handlePress = (item: Item) => {
    navigation.navigate('WegoPickInfo', { item });
  };

  return (
    <View>
      <View style={styles.container}>
        {data.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Pressable onPress={() => handlePress(item)} style={styles.press}>
              <WegoPickItem item={item} navigation={navigation} />
            </Pressable>

            <ScrollView style={styles.scrollContainer} horizontal>
                <WegoPlaceItem item={item} navigation={navigation}/>
            </ScrollView>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  press: {
    marginRight: 3,
  },
});

export default WegoPickList;
