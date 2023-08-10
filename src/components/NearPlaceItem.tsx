import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type NearPlaceItemProps = {
  image: any;
  title: string;
  distance: string;
};

const NearPlaceItem = ({ image, title, distance }: NearPlaceItemProps) => (
  <View style={styles.nearPlaceItemContainer}>
    <Image source={image} style={styles.nearImage} />
    <Text style={styles.nearTitle}>{title}</Text>
    <Text style={styles.nearDistance}>이 장소에서{distance}</Text>
  </View>
);

const styles = StyleSheet.create({
  nearPlaceItemContainer: {
    marginRight: 10,
  },
  nearImage: {
    width: 140,
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

export default NearPlaceItem;
