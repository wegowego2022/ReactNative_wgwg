import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import { ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



interface Item {
    id: number;
    category: string;
    title: string;
    text: string;
    time: string;
    picture: ImageSourcePropType;
    profile: ImageSourcePropType;
    nickname: string;
    like: number;
    comment: number;
    isLiked: boolean;
  }

function ArticleView({navigation,item}: {navigation:any,item:Item}) {
    const [like, setLike] = useState(item.isLiked);

    return (
        <View style={styles.block}>
            <Pressable onPress={() => navigation.goBack()}>
                <Icon style={styles.icon} name="arrow-back-outline" />
            </Pressable>

            <Text style={styles.category}>{item.category}</Text>
            
            <View style={styles.profileContainer}>
                <View>
                    <Image style={styles.profile} source={item.profile} />
                </View>
                <View>
                    <Text style={styles.nickname}>{item.nickname}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>


            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.text}>{item.text}</Text>
            {item.picture && (
                <Image style={styles.image} source={item.picture} />
            )}

            <View style={styles.flex}>
                    <Text style={styles.like}>
                        <Pressable onPress={() => setLike(!like)}>
                            <AntDesign
                                name={like ? 'heart' : 'hearto'}
                                style={{
                                    fontSize: 25,
                                    color: like ? '#ff4376' : 'dimgray',
                                    marginRight: 6,
                                }}
                            />
                        </Pressable>
                        {like ? item.like + 1: item.like}
                    </Text>
                    <Text style={styles.comment}>
                        <Pressable>
                            <Ionic 
                                name="ios-chatbubble-outline"
                                style={{ fontSize: 25, color: 'dimgray', paddingRight: 6, }}
                            />
                        </Pressable>
                        {item.comment}
                    </Text>
                </View>
            </View>
)
}
const styles = StyleSheet.create({
    block: {
        backgroundColor: 'black',
        color: 'white',
        flex: 1,
        paddingHorizontal: 15,
    },
    icon: {
        fontSize: 23,
        color: 'white',
        paddingVertical: 14,
    },
    profileContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    category: {
        color: 'white',
        backgroundColor: '#2b2b2b',
        width: 60,
        textAlign: 'center',
        borderRadius: 3,
        padding: 6,
        fontSize: 10,
        
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 15,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'contain',

    },
    time: {
        color: 'white',

    },
   
    profile: {
        width: 37,
        height: 37,
        resizeMode: 'contain',
        marginRight: 14,
    },
    nickname: {
        color: 'white',
        fontWeight: 'bold',
        
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 20,
        paddingVertical: 10,

    },
    like: {
        color: 'dimgray',
        
    },
    comment: {
       
        color: 'dimgray',

    },
});

export default ArticleView;