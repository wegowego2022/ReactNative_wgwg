import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type SimilarContentsItemProps = {
  image: any;
  title: string;
  type: string;
};

const SimilarContentsItem = (item:SimilarContentsItemProps) => (
  <View style={styles.nearPlaceItemContainer}>
    <Image source={{uri:item.image}} style={styles.nearImage} />
    <Text style={styles.nearTitle}>{item.title}</Text>
    <Text style={styles.nearDistance}>{item.type}</Text>
  </View>
);

const styles = StyleSheet.create({
  nearPlaceItemContainer: {
    marginRight: 10,
  },
  nearImage: {
    width: 100,
    height: 140,
    borderRadius: 5,
    marginBottom: 5,
  },
  nearTitle: {
    fontSize: 15,
    color: '#ffffff',
    paddingVertical: 5,
  },
  nearDistance: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.5
  },
});

export default SimilarContentsItem;
