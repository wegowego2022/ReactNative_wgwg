import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Share, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ThismonthItem from './ThismonthItem';
import GoodsBoxItem from './GoodsBoxItem';

function ContentsVideoItem() {
  const [episode, setEpisode] = useState('전체');
  const options = ['장소', '굿즈'];
  const [place, setPlace] = useState('장소/굿즈');
  const [selectedOption, setSelectedOption] =useState('');
  
  const handleOptionChange = (option:any) => {
    setSelectedOption(option);
  };

  // 장소

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        영상 <Text style={styles.pink}>10</Text>
      </Text>

      <View style={styles.secondContainer}>
        <View style={styles.firstHalf}>
          <View style={[styles.contentsInput, { borderRadius: 5 }]}>
            <Picker
              selectedValue={episode}
              onValueChange={(itemValue) => setEpisode(itemValue)}
              style={styles.categoryText}
              dropdownIconColor="dimgray"
              itemStyle={{ color: 'gray' }}
            >
              <Picker.Item label="전체" value="전체" />
              {Array.from({ length: 10 }, (_, i) => {
                const value = String(i + 1);
                return <Picker.Item label={value} value={value} key={value} />;
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.secondHalf}>
        <View style={[styles.contentsInput, { borderRadius: 5 }]}>
            <Picker
              selectedValue={place}
              onValueChange={(itemValue) => setPlace(itemValue)}
              style={styles.categoryText}
              dropdownIconColor="dimgray"
              itemStyle={{ color: 'gray' }}
            >
              <Picker.Item label="장소/굿즈" value="장소/굿즈" key="장소/굿즈" />
              {options.map((option) => (
                <Picker.Item label={option} value={option} key={option} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.thirdHalf}>
        <Pressable
            style={[styles.selectAll, { borderRadius: 10 }]}
            onPress={() => handleOptionChange('전체보기')}
          >
            <Text style={styles.selectAllText}>전체보기</Text>
          </Pressable>
    
        </View>
      </View>

      {selectedOption === '장소' && <ThismonthItem item={item} navigation={navigation} />}
      {selectedOption === '굿즈' && <GoodsBoxItem item={item} />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  pink: {
    color: '#ff4376',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstHalf: {
    width: '30%',
  },
  secondHalf: {
    width: '40%',
  },
  thirdHalf: {
    width: '25%',
    marginLeft: 10,
  },
  selectAll: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: 'dimgray',
    marginTop: 10,
    height: 35,
  },
  selectAllText: {
    color: 'white',
    fontSize: 12,
  },
  contentsInput: {
    justifyContent: 'center',
    // borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    height: 35,
    backgroundColor: '#242323',
    color: '#ffffff',
    fontSize: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 10,
    opacity: 0.5,
  },
});

export default ContentsVideoItem;
