import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import { ImageSourcePropType } from 'react-native';

interface Item {
  id: number;
  title: string;
  category: string;
  text: string;
  time: string;
  picture: ImageSourcePropType;
  profile: ImageSourcePropType;
  nickname: string;
  like: number;
  comment: number;
  isLiked: boolean;
}
// 글자 수 초과시
function truncate(text:any) {
    const replaced = text.replace(/\n/g, ' ');
    if (replaced.length <= 40) {
        return replaced;
    }
    return replaced.slice(0, 40).concat('...');
}

function CommunityEntireItem( {item} : {item: Item}) {
    const [like, setLike] = useState(item.isLiked);

    return (
        <View style={styles.conContainer} key={item.id}>
            <View>
                <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.midContainer}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>

                    <Text style={styles.text}>{truncate(item.text)}</Text>
                    <Text style={styles.time}>{new Date(item.time).toLocaleString()}</Text>
                </View>
                {item.picture && (
                    <View>
                        <Image style={styles.picture} source={item.picture} />
                    </View>
                )}
            </View>
            <View style={styles.lastContainer}>
                <View style={styles.flex}>
                    <Image style={styles.profile} source={item.profile} /><Text style={styles.nickname}>{item.nickname}</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.like}>
                        <Pressable onPress={() => setLike(!like)}>
                            <AntDesign
                                name={like ? 'heart' : 'hearto'}
                                style={{
                                    fontSize: 15,
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
                                style={{ fontSize: 15, color: 'dimgray', paddingRight: 6, }}
                            />
                        </Pressable>
                        {item.comment}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
     conContainer: {
        paddingHorizontal: 15,
        borderBottomColor: '#2b2b2b',
        borderWidth: 1,
    },
    category: {
        marginTop: 15,
        fontSize: 10,
        color: 'white',
        padding: 6,
        backgroundColor: '#2b2b2b',
        borderRadius: 3,
        marginBottom: 10,
        width: 60,
        textAlign: 'center',
    },
    midContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        color: 'white',
        paddingVertical:3,
        fontWeight: 'bold',
    },
    text: {
        width: 250,
        fontSize: 15,
        color: '#ffffff',
        opacity: 0.5,
    },
    time: {
        fontSize: 12,
        color: '#ffffff',
        opacity: 0.2,
        marginTop: 5,
    },
    picture: {
        width: 70,
    },
    lastContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    flex: {
        flexDirection: 'row',
    },
    profile: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    nickname: {
        color: 'dimgray',
        fontWeight: 'bold',
        marginHorizontal: 3,
    },
    like: {
        color: 'dimgray',
    },
    comment: {
        fontSize: 13,
        color: 'dimgray',
        marginLeft: 10,
    },
    

});

export default CommunityEntireItem;