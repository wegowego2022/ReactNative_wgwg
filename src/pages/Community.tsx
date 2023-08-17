import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommunityEntire from '../components/CommunityEntire';
import CommunityWriteBtn from '../components/CommunityWriteBtn';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
function Community({ navigation, category }: { navigation: any; category?: string }) {
  const profilepicture = useSelector((state: RootState) => state.user.profilepicture);

  const [selectedMenu, setSelectedMenu] = useState(2);

    const onClick = useCallback(() => {
    navigation.navigate('More');
  }, [navigation]);

  const handleMenuPress = (index: number) => {
    setSelectedMenu(index);
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.moreText}>커뮤니티</Text>
        <View style={styles.icons}>
          <Pressable>
            <Icon style={styles.icon} name="notifications-outline"  />
          </Pressable>
          <Pressable onPress={onClick}>
              {/* <Image 
                source={require('../../assets/images/more/profile-gray.png')}  
                style={{width: 30, height: 25, marginLeft: 8}}
              /> */}
              <Image
                source={profilepicture ? { uri: profilepicture } : require('../../assets/images/more/profile-gray.png')}
                style={{width: 30, height: 30, marginLeft: 8, borderRadius: 50, }}
              />
          </Pressable>
        </View>
      </View>


      <View>
        <ScrollView style={styles.menuContainer} horizontal={true}>
          {/* <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(0)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 0 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>전체📣</Text>
            </Pressable>
          </View>
          <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(1)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 1 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>인기🔥</Text>
            </Pressable>
          </View> */}
          <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(2)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 2 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>찾아주세요🔍</Text>
            </Pressable>
          </View>
          {/* <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(3)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 3 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>꿀팁공유🍯</Text>
            </Pressable>
          </View>
          <View style={styles.menu}>
            <Pressable onPress={() => handleMenuPress(4)} style={{ borderRadius: 10, backgroundColor: selectedMenu === 4 ? '#ff4376' : 'dimgray' }}>
              <Text style={styles.menuText}>위고질문💬</Text>
            </Pressable>
          </View> */}
        </ScrollView>
       <CommunityWriteBtn navigation={navigation} />
        
        <ScrollView >

        {/* {selectedMenu === 0 && (
          <>
            <CommunityEntire navigation={navigation} category='찾아주세요'/>
            <CommunityEntire navigation={navigation} category='인기' />
          </>
        )}
        {selectedMenu === 1 && (
          <>
           <CommunityEntire navigation={navigation} category='인기' />
       
          </>
        )} */}
        {selectedMenu === 2 && (
          <CommunityEntire navigation={navigation} category='찾아주세요'/>
        )}
        {/* {selectedMenu === 3 && (
          <CommunityEntire navigation={navigation} category='꿀팁공유'/>
        )}
        {selectedMenu === 4 && (
          <CommunityEntire navigation={navigation} category='위고질문'/>
        )} */}
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
    paddingBottom: 160,
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
    paddingHorizontal:15,
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


});

export default Community;
