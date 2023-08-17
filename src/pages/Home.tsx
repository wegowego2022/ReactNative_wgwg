import React, {useCallback, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import HomeContents from '../components/HomeContents'
import PlaceContents from '../components/PlaceContents';
import GoodsContents from '../components/GoodsContents';
import WegoPick from '../components/WegoPick';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

function Home() {
  const profilepicture = useSelector((state: RootState) => state.user.profilepicture);

  const navigation = useNavigation();
  const [selectedMenu, setSelectedMenu] = useState(0);

  const onClick = useCallback(() => {
    navigation.navigate('More');
  }, [navigation]);

  // const onConents = useCallback(() => {
  //   navigation.navigate('Alarm');
  // }, [navigation]);

  const handleMenuPress = (index:number) => {
    setSelectedMenu(index);
  }
  return (     
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Image
            source={require('../../assets/images/login/logo.png')} 
            style={styles.logo}
          />
        </Pressable>
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
        <View style={styles.menu}>
          <View style={styles.contents}>
            <Pressable
               onPress={() => handleMenuPress(0)} style={{ borderBottomWidth: 2, borderBottomColor: selectedMenu === 0 ? 'white' : 'transparent' }}>
              <Text style={[styles.contentsText, {color: selectedMenu === 0 ? 'white' : 'dimgray'}]}>콘텐츠</Text>
            </Pressable>
          </View>


          <View style={styles.contents}>
            <Pressable
              onPress={() => handleMenuPress(1)} style={{ borderBottomWidth: 2, borderBottomColor: selectedMenu === 1 ? 'white' : 'transparent' }}>
              <Text style={[styles.contentsText, {color: selectedMenu === 1 ? 'white' : 'dimgray'}]}>장소</Text>
            </Pressable>
          </View>

          <View style={styles.contents}>
            <Pressable
              onPress={() => handleMenuPress(2)} style={{ borderBottomWidth:2, borderBottomColor: selectedMenu === 2 ? 'white' : 'transparent' }}>
              <Text style={[styles.contentsText, {color: selectedMenu === 2 ? 'white' : 'dimgray'}]}>굿즈</Text>
            </Pressable>
          </View>

          <View style={styles.contents}>
            <Pressable
              onPress={() => handleMenuPress(3)} style={{ borderBottomWidth:2, borderBottomColor: selectedMenu === 3 ? 'white' : 'transparent' }}>
              <Text style={[styles.contentsText, {color: selectedMenu === 3 ? 'white' : 'dimgray'}]}>위고PICK</Text>
            </Pressable>
          </View>
        </View>
        {selectedMenu === 0 && (
          <HomeContents />
        )}
        {selectedMenu === 1 && (
          <PlaceContents />
        )}
        {selectedMenu === 2 && (
          <GoodsContents />
        )}
        {selectedMenu === 3 && (
          <WegoPick />
        )}


      </View>
    </ScrollView>
    // </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'black',
  color: 'dimgray',
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
  marginLeft: 5,
  marginBottom: 8,
},
logo: {
  width: 90,
  height: 42,
  resizeMode: 'contain',
},
/////
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
//////
menu: {
  flexDirection: 'row',
  borderBottomColor: 'dimgray',
  borderBottomWidth:1,
},
contents: {
  marginLeft: 10,
},
contentsText: {
  padding: 10,
  fontSize: 16,
  color: 'white',
  fontWeight: 'bold',
},
});




export default Home;


