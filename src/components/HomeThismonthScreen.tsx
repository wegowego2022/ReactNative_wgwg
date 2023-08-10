import React, {useCallback} from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Pressable } from 'react-native';
import HomeThismonthScreenItem from './HomeThismonthScreenItem';

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

function HomeThismonthScreen({item, navigation}:{item:Item, navigation:any}) {
    return(
        <View style={styles.container}>
            <HomeThismonthScreenItem navigation={navigation} item={item} />
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

})
export default HomeThismonthScreen;