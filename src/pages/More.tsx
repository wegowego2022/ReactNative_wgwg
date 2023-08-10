import React, {useCallback, useState} from 'react';
import { Dimensions, Alert, Pressable, StyleSheet, Text, View, Image, Modal, TextInput, Platform } from 'react-native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';

function More( ) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const name = useSelector((state: RootState) => state.user.name);
  const email = useSelector((state: RootState) => state.user.email);
  const userIdx = email;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  // name revise modal
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(name);

  // 프로필 이미지
  const [findImage, setImage] = useState<{ uri: string; name: string; type: string }>({
    uri: '', // 프로필 기본값은 빈 문자열로 설정
    name: '',
    type: '',
  });  const [preview, setPreview] = useState<{uri: string}>();

  const onResponse = useCallback(async (response: any) => {
    console.log(response.width, response.height, response.exif);
    setPreview({uri: `data:${response.mime};base64,${response.data}`});
    const orientation = (response.exif as any)?.Orientation;
    console.log('orientation', orientation);
    return ImageResizer.createResizedImage(
      response.path,
      50,
      50,
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
  // 취소 버튼 클릭 시
  const cancelPress = () => {
    setShowModal(false);
  }
  // 닉네임 수정
  const handlePress = () => {
    setShowModal(true);
    setNewName(name);
  };

  // 확인 버튼 누른 후
  const handleSubmit = () => {
    // setNewName(newName);
    dispatch(userSlice.actions.setUser({ name: newName, email}))
    setShowModal(false);
  };

  const onLogout = useCallback(async () => {
    try {
      if (!accessToken) {
        // 액세스 토큰이 없는 경우에는 로그아웃 요청을 보내지 않고 바로 초기화 처리합니다.
        handleLogout();
        return;
      }
  
      // await axios.post(
      //   `${Config.API_URL}/api/users/logout`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   },
      // );
      Alert.alert('알림', '로그아웃 되었습니다.');
      handleLogout(); // 로그아웃 후 초기화 처리
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [accessToken, dispatch]);
  
  const handleLogout = async () => {
    dispatch(
      userSlice.actions.setUser({
        name: '',
        email: '',
        accessToken: '',
      }),
    );
    await EncryptedStorage.removeItem('refreshToken');
  };
  

  // 프로필 이미지 선택하기
  const onSelectImage = useCallback(() => {
    ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((res) => {
        if (!res || res.error) {
          // 이미지 선택이 취소되거나 오류가 발생한 경우
          return;
        }
        return onResponse(res);
      })
      .catch(console.log);
  }, [onResponse]);
  // 기본이미지
  const handleDefaultImage = () => {
    setImage({
      uri: '', // 기본 이미지로 변경
      name: '',
      type: '',
    });
    setShowModal(false);
  };

  // 회원탈퇴
const deleteId = useCallback(async () => {
  Alert.alert(
    '회원탈퇴',
    '정말로 회원탈퇴를 하시겠습니까?',
    [
      {
        text: '예',
        onPress: async () => {
          try {
            if (!accessToken) {
              Alert.alert('Error', 'No access token found.');
              return;
            }

            await axios.delete(`${Config.API_URL}/users/${userIdx}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            dispatch(
              userSlice.actions.setUser({
                name: '',
                email: '',
                accessToken: '',
              })
            );
            await EncryptedStorage.removeItem('refreshToken');
            Alert.alert('Success', 'User deleted successfully.');
            navigation.goBack();
          } catch (error) {
            // const errorResponse = error.response;
            // console.error(errorResponse);

            Alert.alert('Error', 'Failed to delete user.');
          }
        },
      },
      {
        text: '아니오',
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );
}, [accessToken, dispatch, navigation, userIdx]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon style={styles.icon} name="arrow-back-outline" />
        </Pressable>
        <View style={styles.icons}>
          <Pressable>
            <Icon style={styles.icon} name="notifications-outline"  />
          </Pressable>
          <Pressable>
              <Image
                source={require('../../assets/images/more/profile-gray.png')}  
                style={{width: 30, height: 25, marginLeft: 8}}
              />
          </Pressable>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profilePicture}>
          <Pressable onPress={handlePress}>
            <Image
              style={styles.circle}
              resizeMode='cover'
              source={
                findImage.uri ? { uri: findImage.uri } : require('../../assets/images/more/profile-gray.png')
              }            
              />
          </Pressable>
        </View>

        <View style={styles.nickEmail}>
          <Pressable onPress={handlePress}>
            <View style={styles.nicknameContainer}>
              <Text style={styles.nickname}>{name}</Text>
              <Image source={require('../../assets/images/more/icon-revise.png')} />
            </View>
          </Pressable>
          <View style={styles.emailContainer}>
            <Image source={require('../../assets/images/more/small-kakao.png')} />
            <Text style={styles.email}> {email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.WHContainer}>
        <View style={styles.con}>
          <Pressable>
            <Image source={require('../../assets/images/more/mywriting.png')} />
            <Text style={styles.conText}>내가 작성한 글</Text>
          </Pressable>
        </View>
        <View style={styles.con}>
          <Pressable>
            <Image source={require('../../assets/images/more/history.png')} />
            <Text style={styles.conText}>내 히스토리</Text>
          </Pressable>
        </View>
      </View>


      <View style={styles.listContainer}>
        <Pressable>
          <View style={styles.list}>
            <Image source={require('../../assets/images/more/customercenter.png')} />
            <Text style={styles.listText}>  고객센터</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.list}>
            <Image source={require('../../assets/images/more/notice.png')} />
            <Text style={styles.listText}>  공지/이벤트</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.list}>
            <Image source={require('../../assets/images/more/terms.png')} />
            <Text style={styles.listText}>  이용약관/개인정보취급방침</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.list}>
            <Image source={require('../../assets/images/more/versioninfo.png')} />
            <Text style={styles.listText}>  버전정보</Text>
          </View>
        </Pressable>
        <Pressable onPress={deleteId}>
          <View style={styles.list}>
            <Image source={require('../../assets/images/more/versioninfo.png')} />
            <Text style={styles.listText}>  회원탈퇴</Text>
          </View>
        </Pressable>
        
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive,
          )}
          onPress={onLogout}>
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalButton}>
            <Pressable onPress={cancelPress}>
              <Text style={styles.cancel}>취소</Text>
            </Pressable>
            <Pressable onPress={handleSubmit}>
              <Text style={styles.cancel}>확인</Text>
            </Pressable>
          </View>
          <View style={styles.bigcirclecon}>
            <Image
                style={styles.bigcircle}
                resizeMode='cover'
                source={
                  findImage.uri ? { uri: findImage.uri } : require('../../assets/images/more/profile-gray.png')
                }            
                />
            <View style={styles.profileText}>
                <Pressable onPress={handleDefaultImage}>
                  <Text style={styles.cancel}>기본이미지로 변경</Text>
                </Pressable>
                <Pressable onPress={onSelectImage}>
                  <Text style={styles.cancel}>앨범에서 선택</Text>
               </Pressable>
            </View>
            </View>
            <TextInput
              style={styles.reviseText}
              placeholder={name}
              value={newName}
              onChangeText={setNewName}
              onSubmitEditing={handleSubmit}
            />
        </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
 
  profileContainer: {
    flexDirection: 'row',
    color: 'white',
  },
  profilePicture: {
    paddingLeft: 12,
  },
  circle: {
    width: 50,
    height: 55,
    margin: 5,
    borderRadius: 50,
  },
  nickEmail: {
    padding: 10,
  },
  nicknameContainer: {
    flexDirection: 'row',
  },
  nickname: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailContainer: {
    flexDirection: 'row',
    paddingTop: 6,
  },
  email: {
    color: 'white',
    fontSize: 12,
  },

 
  WHContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 18,
    justifyContent: 'space-around',
  },
  con: {
    width: '50%',
    marginLeft: 10,

  },
  conText: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    fontWeight: 'bold',
  },

  listContainer: {
    marginTop: 30,
    flexDirection: 'column',
  },
  list: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 16,
  },
  listText: {
    color: 'white',
    fontSize: 16,
  },

  buttonZone: {
    alignItems: 'center',
    paddingTop: 110,

  },
  loginButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loginButtonActive: {
    backgroundColor: 'gray',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 13,
  },

  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    color: 'white',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    color: 'white',
    padding: 15,
    fontSize: 16,
  },
  profileText: {
    flexDirection: 'row',
  },
  reviseText: {
    marginTop: 50,
    borderBottomColor: 'white',
    borderWidth: 1,
    color: 'white',
    marginHorizontal: 20,
    justifyContent: 'center',

  },
  bigcirclecon: {
    alignItems: 'center', // 수평 가운데 정렬

  },
  bigcircle: {
    width: 90,
    height: 90,
    padding: 20,
    borderRadius: 50,
  },
  previewImage: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 3,
    marginVertical: 16,
    resizeMode: 'cover',
  },
  // list2: {
  //   justifyContent: 'flex-end',
  //   alignItems: 'flex-end',
  //   marginRight: 20,
  //   marginTop: 30,
  // },
  // deleteId: {
  //   color: 'gray',
  //   fontSize: 12,
  // },
});

export default More;