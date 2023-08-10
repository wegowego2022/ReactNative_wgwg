import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type NearPlaceItemProps = {
  image: any;
  titleInfo: string;
  price: string;
};

const RelatedGoodsItem = ({ image, titleInfo, price }: NearPlaceItemProps) => (
  <View style={styles.nearPlaceItemContainer}>
    <Image source={image} style={styles.nearImage} />
    <Text style={styles.titleInfo}>{titleInfo}</Text>
    <Text style={styles.price}>{price}</Text>
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
  titleInfo: {
    fontSize: 15,
    color: '#ffffff',
    paddingVertical: 5,
  },
  price: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.5
  },
});

export default RelatedGoodsItem;
