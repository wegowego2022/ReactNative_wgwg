import React, { useState, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet, TextInput, Pressable, Image, Alert, ScrollView } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute,} from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DismissKeyboardView from '../components/DismissKeyboardView';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import CloseButton from './CloseButton';
import { useDispatch } from 'react-redux';
import findSlice from '../slices/find';
import Icon from 'react-native-vector-icons/MaterialIcons';


    function WriteFind() {
    const [findName, setContents] = useState('');

    const [findSeries, setCategory] = useState('전체');
    const [findEpisode, setEpisodeNum] = useState('');
    
    const [findHour, setHour] = useState('');
    const [findMinute, setMinute] = useState('');
    const [findSecond, setSecond] = useState('');
    
    const [findText, setText] = useState('');
    const options = ['전체','시리즈', '영화', '드라마'];

    const dispatch = useDispatch();


    // 사진 업로드
    const [findImage, setImage] = useState<{uri: string; name: string; type: string}>();
    const [preview, setPreview] = useState<{uri: string}>();
    const navigation = useNavigation();
    // const navigation = useNavigation<RouteProp<LoggedInParamList>>();
    const accessToken = useSelector((state: RootState) => state.user.accessToken);

    // callback 함수
    const onResponse = useCallback(async (response: any) => {
      console.log(response.width, response.height, response.exif);
      setPreview({uri: `data:${response.mime};base64,${response.data}`});
      const orientation = (response.exif as any)?.Orientation;
      console.log('orientation', orientation);
      return ImageResizer.createResizedImage(
        response.path,
        100,
        100,
        response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
        50,
        0,
      ).then(r => {
        console.log(r.uri, r.name);

        setImage({
          uri: r.uri,
          name: r.name,
          type: response.mime,
        });
      });
    }, []);
    // 사진 찍기 함수
    const onTakePhoto = useCallback(() => {
      return ImagePicker.openCamera({
        includeBase64: true,
        includeExif: true,
        saveToPhotos: true,
      })
      .then(onResponse)
      .catch(console.log);
    }, [onResponse]);
    
    // 사진 업로드 버튼 눌렀을 때 함수
    const onChangeFile = useCallback(() => {
      return ImagePicker.openPicker({
        includeExif: true,
        includeBase64: true,
        mediaType: 'photo',
      })
        .then(onResponse)
        .catch(console.log);
    }, [onResponse]);

    const onChangeContents = useCallback((text:any) => {
      setContents(text);
    }, []);

    const onChangeEpisodeNum = useCallback((text: string) => {
      const number = text.replace(/[^0-9]/g, '');
      const trimmedNumber = number.slice(0,2);
      setEpisodeNum(trimmedNumber);
    }, []);
   

    // 보내기 버튼 눌렀을 때
const onComplete = useCallback(async () => {
  if (!findName) {
    return Alert.alert('알림', '콘텐츠명을 입력해주세요.');
  }
  if (!findEpisode) {
    return Alert.alert('알림', '회차를 입력해주세요.');
  }
  if (findSeries === '전체') {
    return Alert.alert('알림', '카테고리를 선택해주세요.');
  }
  if (!findEpisode) {
    return Alert.alert('알림', '회차를 입력해주세요.');
  }
  if (!findText) {
    return Alert.alert('알림', '찾고 계신 장소에 대해 상세히 입력해주세요.');
  }

  const formData = new FormData();
  formData.append('image', {
    uri: findImage?.uri,
    name: findImage?.name,
    type: findImage?.type,
  });
  formData.append('findName', findName);
  formData.append('findSeries', findSeries);
  formData.append('findEpisode', findEpisode);
  formData.append('findHour', findHour);
  formData.append('findMinute', findMinute);
  formData.append('findSecond', findSecond);
  formData.append('findText', findText);

  try {
    const response = await axios.post(`${Config.API_URL}/complete`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    
    dispatch(
      findSlice.actions.setFind({
        findName: response.data.data.findName,
        findSeries: response.data.data.findSeries,
        findEpisode: response.data.data.findEpisode,
        findHour: response.data.data.findHour,
        findMinute: response.data.data.findMinute,
        findSecond: response.data.data.findSecond,
        findText: response.data.data.findText,
      }),
      );
      
      Alert.alert('알림', '완료되었습니다.');
      navigation.navigate('UploadScreen',{ findName, findSeries, findEpisode, findHour, findMinute, findSecond, findText, findImage: findImage?.uri, preview });
  } catch (error) {
    const errorResponse = (error as AxiosError).response as AxiosResponse | undefined;
    if (errorResponse) {
      Alert.alert('알림', errorResponse.data.message);
    }
  }
}, [
  findName,
  findSeries,
  findEpisode,
  findHour,
  findMinute,
  findSecond,
  findText,
  findImage,
  accessToken,
  dispatch,
  navigation,
  preview,
]);

    return (
        <DismissKeyboardView style={styles.container}>
          <ScrollView>

      
            <Text style={styles.findText}>찾아주세요</Text>

            <CloseButton />

            <Text style={styles.contentsName}>콘텐츠명</Text>
            <TextInput 
                placeholder="ex) 이상한 변호사 우영우"
                placeholderTextColor='gray'
                style={styles.contentsInput}
                returnKeyType='next'
                blurOnSubmit={false}
                clearButtonMode="while-editing"
                value={findName}
                onChangeText={onChangeContents}
            />

            <View style={styles.secondContainer}>
                <View style={styles.secondHalf}>
                    <Text style={styles.contentsName}>카테고리</Text>
                    <View style={[styles.contentsInput, { borderRadius: 5 }]}>
                    <Picker
                      selectedValue={findSeries}
                      onValueChange={(itemValue) => {
                        if (itemValue !== '전체') {
                          setCategory(itemValue);
                        }
                      }}
                      style={styles.categoryText}
                      dropdownIconColor="dimgray"
                      itemStyle={{ color: 'gray' }}
                    >
                      {options.map((option) => (
                        <Picker.Item label={option} value={option} key={option} />
                      ))}
                    </Picker>
                </View>
              </View>
                <View style={styles.secondHalf}>
                    <Text style={styles.contentsName}>회차</Text>
                    <TextInput
                        placeholder="회차 입력" 
                        placeholderTextColor='gray' 
                        style={styles.contentsInput}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        clearButtonMode="while-editing"
                        value={findEpisode}
                        onChangeText={onChangeEpisodeNum}
                        keyboardType="numeric"
                        maxLength={2}
                        />   
                </View>
            </View>

              <Text style={styles.contentsName}>등장시간</Text>
              <View style={styles.thirdContainer}>
                <View style={styles.timeContainer} >
                  <Picker
                    selectedValue={findHour}
                    onValueChange={(itemValue) => setHour(itemValue)}
                    style={styles.contentsInput}
                    dropdownIconColor="dimgray"
                  >
                    {Array.from({ length: 4 }, (_, i) => {
                      const value = i < 10 ? `0${i}시` : `${i}시`;
                      return <Picker.Item label={value} value={value} key={value}/>;
                    })}
                  </Picker>
                </View>
                <View style={styles.timeContainer}>
                  <Picker 
                    selectedValue={findMinute}
                    onValueChange={(itemValue) => setMinute(itemValue)}
                    style={styles.contentsInput}
                    dropdownIconColor="dimgray"
                  >
                    {Array.from({ length: 60 }, (_, i) => {
                      const value = i < 10 ? `0${i}분` : `${i}분`;
                      return <Picker.Item label={value} value={value} key={value}/>;
                    })}
                  </Picker>
                </View>
                <View style={styles.timeContainer}>
                  <Picker 
                    selectedValue={findSecond}
                    onValueChange={(itemValue) => setSecond(itemValue)}
                    style={styles.contentsInput}
                    dropdownIconColor="dimgray"
                  >
                    {Array.from({ length: 60 }, (_, i) => {
                      const value = i < 10 ? `0${i}초` : `${i}초`;
                      return <Picker.Item label={value} value={value} key={value}/>;
                    })}
                  </Picker>
                </View>
              </View>

              <View>
                <TextInput 
                  multiline={true}
                  numberOfLines={10}
                  maxLength={500}
                  placeholder="찾고 계신 장소나 굿즈를 최대한 상세히 기재해주세요. 해당 아이템이 등장하거나 관련 영상을 캡처해서 보내시면 더욱 도움이 되요 :)"
                  onChangeText={text => setText(text)}
                  value={findText}
                  style={styles.textInput}
                  placeholderTextColor='gray'
                  returnKeyType="send"
                  textAlignVertical='top'
                />
              </View>

            {preview && <Image source={preview} style={styles.previewImage} />}
            <Pressable style={styles.background}>
              <View style={styles.camerabox}>
                <Pressable
                  android_ripple={{ color: '#ffffff' }}
                  style={styles.cameraCircle}
                  onPress={onTakePhoto}
                >
                  <Icon name="camera-alt"  style={styles.cameraIcon} />
                </Pressable>
                <Pressable
                  android_ripple={{ color: '#ffffff' }}
                  style={styles.cameraCircle}
                  onPress={onChangeFile}
                >
                  <Icon name="photo" style={styles.cameraIcon} />
                </Pressable>
              </View>
            </Pressable>
              

            <Pressable onPress={onComplete}>
              <Text style={styles.submit}>보내기</Text>
            </Pressable>
          </ScrollView>
        </DismissKeyboardView>
    );
};

const styles = StyleSheet.create({
  pictureContainer: {
    flexDirection: 'row',
  },

  imageBtn: {
    marginTop: 20,
    width: 60,
    height: 60,
    backgroundColor: '#141414',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff4376',
    marginRight: 10,
  },
  image: {
    color: 'dimgray',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 12,
  },
  submit: {
    marginTop: 25,
    fontSize: 15,
    color: 'white',
    backgroundColor: '#ff4376',
    borderRadius: 5,
    padding: 12,
    textAlign: 'center',
    height: 50,
    marginBottom: 60,
  }, 


  // 
    container : {
        flex: 1,
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 15,
        
    },
    findText: {
        color: '#67ff86',
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },


    contentsName: {
        fontSize: 12,
        color: '#ffffff',
        opacity: 0.5,
        marginTop: 20,
    },
    contentsInput: {
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        height: 50,
        backgroundColor: '#141414',
        color: '#ffffff',
        fontSize: 14,
    },
    categoryText: {
      color: '#fff',
      fontSize: 12,
    },

    secondContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    secondHalf: {
      width: '49%',
    },

    thirdContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'

    },

    timeContainer: {
      width: '32%',
    },

    textInput: {
      borderRadius: 5,
      paddingHorizontal: 10,
      marginTop: 20,
      height: 160,
      backgroundColor: '#141414',
      color: '#fff',
      fontSize: 14,
    },

//
background: {
  backgroundColor: 'rgba(0,0,0,0.6)',
},
camerabox: {
  flexDirection: 'row',
},
cameraCircle: {
  marginTop: 20,
  width: 60,
  height: 60,
  backgroundColor: '#141414',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ff4376',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
},
cameraIcon: {
  color: 'white',
  fontSize: 26,
},
previewImage: {
  width: Dimensions.get('window').width - 10,
  height: Dimensions.get('window').height / 2,
  // width: '100%',
  // height: 350,
  marginVertical: 16,
  resizeMode: 'cover',
},
});

export default WriteFind; 