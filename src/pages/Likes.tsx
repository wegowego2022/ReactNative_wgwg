// import React, { useState, useCallback } from 'react';
// import { View, Text, StyleSheet, Pressable, Image, FlatList, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import ContentsLike from '../components/ContentsLike';
// import PlaceLike from '../components/PlaceLike';
// import GoodsLike from '../components/GoodsLike';


// function Likes({navigation}:any) {
//   const [selectedMenu, setSelectedMenu] = useState(0);

//   const onClick = useCallback(() => {
//     navigation.navigate('More');
//   }, [navigation]);
//   const handleMenuPress = (index:any) => {
//     setSelectedMenu(index);
//   }
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.fixedHeader}>
//       <View style={styles.header}>
//         <Text style={styles.moreText}>관심</Text>
//         <View style={styles.icons}>
//           <Pressable>
//             <Icon style={styles.icon} name="notifications-outline"  />
//           </Pressable>
//           <Pressable onPress={onClick}>
//               <Image 
//                 source={require('../../assets/images/more/profile-gray.png')}  
//                 style={{width: 30, height: 25, marginLeft: 8}}
//               />
//           </Pressable>
//         </View>
//       </View>
//       </View>


//       <View>
//         <View style={styles.menuContainer}>
//           <View style={styles.menu}>
//             <Pressable onPress={() => handleMenuPress(0)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 0 ? '#ff4376' : 'dimgray' }}>
//               <Text style={styles.menuText}>콘텐츠</Text>
//             </Pressable>
//           </View>
//           <View style={styles.menu}>
//             <Pressable onPress={() => handleMenuPress(1)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 1 ? '#ff4376' : 'dimgray' }}>
//               <Text style={styles.menuText}>장소</Text>
//             </Pressable>
//           </View>
//           <View style={styles.menu}>
//             <Pressable onPress={() => handleMenuPress(2)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 2 ? '#ff4376' : 'dimgray' }}>
//               <Text style={styles.menuText}>굿즈</Text>
//             </Pressable>
//           </View>
//         </View>
//         {selectedMenu === 0 && (
//           <ContentsLike />
//         )}
//         {selectedMenu === 1 && (
//           <PlaceLike />
//         )}
//         {selectedMenu === 2 && (
//           <GoodsLike />
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     color: 'white',
//   },
//   fixedHeader: {
    
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   moreText: {
//     color: 'white',
//     fontSize: 20,
//     paddingHorizontal:10,
//     marginVertical:10,
//     fontWeight: 'bold',
//   },
//   icons: {
//     flexDirection: 'row',
//     marginRight: 15,
//     marginTop: 10,
//   },
//   icon: {
//     fontSize: 23,
//     color: 'white',
//     paddingHorizontal: 8,
//   },

//   menuContainer: {
//     flexDirection: 'row',
//     borderBottomColor: 'dimgray',
//     borderWidth: 1,
//   },
//   menu: {
//     marginLeft: 10,
//     marginBottom: 10,
//   },
//   menuText: {
//     padding: 10,
//     color: 'white',
//     fontWeight: 'bold',
//   },


//   item: {
//     flex: 1,
//     width: '100%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     // justifyContent: 'space-between',
//   },
//   itemContainer: {
//     margin: 10,
//     width: 120,
//   },
//   image: {
//     borderRadius: 10,
//     width: '100%',
//     height: 150,
//     // backgroundColor: 'white'
//   },
//   textContainer: {
//     padding: 10,
//   },
//   title: {
//     fontSize: 18,
//     color: 'dimgray',
//     fontWeight: 'bold',
//     // backgroundColor: 'red',
//   },
//   type: {
//     fontSize: 16,
//     color: 'gray',
//     marginTop: 5,
//     backgroundColor: 'yellow',
//   },


//   contents: {
//     color: 'dimgray'
    
//   },
// });

// export default Likes;
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ContentsLike from '../components/ContentsLike';
import PlaceLike from '../components/PlaceLike';
import GoodsLike from '../components/GoodsLike';



function Likes({navigation}:any) {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const onClick = useCallback(() => {
    navigation.navigate('More');
  }, [navigation]);
  const handleMenuPress = (index:any) => {
    setSelectedMenu(index);
  }

  return (
  
  <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.moreText}>관심</Text>
        <View style={styles.icons}>
          <Pressable>
            <Icon style={styles.icon} name="notifications-outline" />
          </Pressable>
          <Pressable onPress={onClick}>
            <Image
              source={require('../../assets/images/more/profile-gray.png')}
              style={{ width: 30, height: 25, marginLeft: 8 }}
            />
          </Pressable>
        </View>
      </View>
    


      <View>
        <ScrollView>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(0)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 0 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>콘텐츠</Text>
            </Pressable>
          </View>
          <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(1)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 1 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>장소</Text>
            </Pressable>
          </View>
          <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(2)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 2 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>굿즈</Text>
            </Pressable>
          </View>
          </View>
        </ScrollView>
        <ScrollView>
        {selectedMenu === 0 && (
          <ContentsLike />
        )}
        {selectedMenu === 1 && (
          <PlaceLike />
        )}
        {selectedMenu === 2 && (
          <GoodsLike />
        )}
      </ScrollView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    headerMode: 'float',
  },
  fixedHeader: {
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  moreText: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal:10,
    marginVertical:10,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    marginRight: 15,
    marginTop: 10,
  },
  icon: {
    fontSize: 23,
    color: 'white',
    paddingHorizontal: 8,
  },

  menuContainer: {
    flexDirection: 'row',
    borderBottomColor: 'dimgray',
    borderWidth: 1,
  },
  menu: {
    marginLeft: 10,
    marginBottom: 10,
  },
  menuText: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },

  
  contents: {
    color: 'dimgray'
  },
});

export default Likes;
