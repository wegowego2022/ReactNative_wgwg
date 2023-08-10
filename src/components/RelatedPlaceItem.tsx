import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


function RelatedPlaceItem({ title, subimage, episode }: {title: string, subimage: any, episode: string}) {
    return (

    <View style={styles.relatedContainer} >
        <View>
            <Image style={styles.relatedImage} source={subimage}/>
        </View>
        <View style={styles.relatedTextCon}>
            <Text style={styles.relatedTitle}>{title}</Text>
            <Text style={styles.relatedEpisode}>{episode}</Text>
        </View>
        <View>
            <AntDesign name="right" style={styles.InfoIconSmall} />
        </View>
    </View>
    

    )
}


const styles = StyleSheet.create({

      relatedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#242323',
        borderRadius: 5,
        width: 280,
        // width: '100%',
        height: 70,
        marginRight: 10,
      },
      relatedImage: {
        width: 50,
        height: 70,
        resizeMode: 'cover',
      },
      relatedTextCon: {
        alignSelf: 'center',
        width: '60%',
      },
      relatedTitle: {
        color: '#ffffff',
        opacity: 0.5,
        fontSize: 13,
      },
      relatedEpisode: {
        fontSize: 12,
        color: '#ffffff',
        opacity: 0.3,
      },
      InfoIconSmall: {
        fontSize: 13,
        color: 'gray',
        paddingTop: 27,
        paddingRight: 15,
      },
})

export default RelatedPlaceItem;
