
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import ContentsLike from '../components/ContentsLike';
import PlaceLike from '../components/PlaceLike';
import GoodsLike from '../components/GoodsLike';


function ThreeMenuItem() {

    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleMenuPress = (index:any) => {
      setSelectedMenu(index);
    }
    return (  
    <View>
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
        {selectedMenu === 0 && (
            <ContentsLike />
            )}
        {selectedMenu === 1 && (
            <PlaceLike />
            )}
        {selectedMenu === 2 && (
            <GoodsLike />
            )}
      </View>
  
    );
}

const styles = StyleSheet.create({
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
  
  export default ThreeMenuItem;