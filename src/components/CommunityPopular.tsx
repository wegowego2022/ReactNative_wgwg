// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
// import CommunityEntireItem from './CommunityEntireItem';
// import DATA from './CommunityEntire';

// import { ImageSourcePropType } from 'react-native';

// interface Item {
//   id: number;
//   category: string;
//   text: string;
//   time: string;
//   picture: ImageSourcePropType;
//   profile: ImageSourcePropType;
//   nickname: string;
//   like: number;
//   comment: number;
//   isLiked: boolean;
// }

// function CommunityPopular({item}:{item:Item}) {
//     // const popularData = DATA.filter((item: Item) => item.category === '인기');
//     return (
//         <ScrollView>
//             <View style={styles.CommunityContainer}>
//                 <View style={styles.entireContainer}>
//                 <Text style={styles.entireText}>
//                     인기 <Text style={styles.num}>42</Text>
//                 </Text>
//                 <Text style={styles.writebtn}>글쓰기 ✏️</Text>
//                 </View>
//                 {Data.map((item: Item) => (
//                 <CommunityEntireItem item={item} key={item.id} />
//                 ))}
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     CommunityContainer: {
//         marginBottom: 150,
//     },
//     entireContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingTop: 15,
//         paddingHorizontal: 15,
//     },
//     entireText: {
//         fontSize: 18,
//         color: 'white',
//     },
//     num: {
//         color: '#ff4376',
//     },
//     writebtn: {
//         fontSize: 12,
//         color: 'white',
//         backgroundColor: 'black',
//         opacity: 0.7,
//         borderRadius: 5,
//         borderColor: 'gray',
//         borderWidth: 1,
//         padding: 6,
//         textAlign: 'center',
//     },
// });

// export default CommunityPopular;