
import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { View, Text, Image, StyleSheet, Pressable, TextInput, ActivityIndicator, Platform } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { KakaoOAuthToken, KakaoProfile, getProfile as getKakaoProfile, KakaoProfileNoneAgreement, login, logout, unlink } from '@react-native-seoul/kakao-login';
import { useSelector } from 'react-redux';
import {RootState} from '../store/reducer';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';



type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const onChangeEmail = useCallback((text:any) => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback((text:any) => {
    setPassword(text.trim());
  }, []);
  const accessToken1 = useSelector((state: RootState) => state.user.accessToken);

  //로그인 
  const onSubmit = useCallback(async() => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/users/login`, {
        userId: email,
        password,
      });
      console.log('일반로그인', response.data);
      const { user, accessToken, refreshToken } = response.data;
      console.log(user, user.userId, user.nickName, accessToken, user.password);
      dispatch(
        userSlice.actions.setUser({
          name: user.nickName,
          email: user.userId,
          accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        refreshToken
      );
    } catch (error) {
      console.log(error);
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        const errorMessage = (errorResponse.data as { message: string }).message;
        if (errorResponse.status === 401 && errorMessage === 'Invalid credentials') {
          Alert.alert('알림', '이메일과 비밀번호를 확인해주세요.');
        } else {
          Alert.alert('알림', errorMessage);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [loading, navigation, dispatch, email, password]);


  // 회원가입 페이지 이동
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  

// 비밀번호 재설정 메일
  const FindPass = useCallback(() => {
   navigation.navigate('FindPassword');
  }, [navigation]);


  //카카오
  const signInWithKakao = useCallback(async (): Promise<void> => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const token: KakaoOAuthToken = await login();
      const accessTokn = token.accessToken;
      const refreshToekn = token.refreshToken;
      console.log(accessTokn, refreshToekn);
      console.log('카카오 idToken:',token.idToken);
      console.log('카카오 토큰 전ㅔ',token);
      const profile: KakaoProfile | KakaoProfileNoneAgreement = await getKakaoProfile();
      const { email, nickname } = profile;
      const name = nickname;

      console.log("카카오정보", email, name, accessTokn, refreshToekn);
  
      // 회원가입 시도
      // const signupResponse = await axios.post(`${Config.API_URL}/users/signup`, {
      //   userId: email,
      //   nickName: name,
      //   password: Kpassword,
      // });
      // // signup서버로부터 응답 처리
      // console.log('회원가입후 데이터 전')
      // if (signupResponse.data.statusCode === 201) {
        // console.log('회원가입 성공 :' , signupResponse.data.data);
        // const {userId:newEmail, password:newPassword}= signupResponse.data.data;
        // console.log('서버에서 받은 id,비번:',newEmail, newPassword);
        // 회원가입 성공 후 로그인 진행
        const response = await axios.post(`${Config.API_URL}/users/login`, {
          userId: email,
          password: accessTokn,
        });
        console.log("카카오 로그인");
        console.log(response.data);
        const { user, accessToken, refreshToken } = response.data;
        console.log(user.nickName, user.userId, accessToken);
        dispatch(
          userSlice.actions.setUser({
            name: user.nickName,
            email: user.useId,
            accessToken,
          }),
        );
        await EncryptedStorage.setItem('refreshToken', refreshToken);
      // } else if (signupResponse.data.statusCode === 409) {
        // console.log('회원가입 실패(이메일,닉네임 존재):', signupResponse.data.message);
        // 이메일 또는 닉네임이 이미 존재하는 경우 처리할 내용을 작성합니다.
 
      // } else {
        // console.log("로그인 실패:", signupResponse.data.message);
      // }

    } catch (error) {
      console.log('Error occurred during Kakao login:', error);
      if (error) {
        Alert.alert('회원가입 실패', '이미 가입된 계정입니다. 로그인 해주세요.');
      }
    } finally {
      setLoading(false);
      Alert.alert('알림', '로그인이 되었습니다.');
      // navigation.navigate('MainTab');
    }},  [loading, navigation, dispatch, email, password]);
//   ...

// // 카카오 로그인
// const signInWithKakao = useCallback(async (): Promise<void> => {
//   if (loading) {
//     return;
//   }
//   try {
//     setLoading(true);
//     const token: KakaoOAuthToken = await login();
//     const Kpassword = token.accessToken;
//     console.log('카카오 idToken:',token.idToken);
//     console.log(token);
//     const profile: KakaoProfile | KakaoProfileNoneAgreement = await getKakaoProfile();
//     const { email, nickname } = profile;
//     const name = nickname;

//     console.log("카카오정보", email, name, Kpassword);

//     // 이미 가입된 계정인지 확인
//     const checkAccountResponse = await axios.get(`${Config.API_URL}/users/userId/${encodeURIComponent(email)}`)

//     if (checkAccountResponse.data === 200) {
//       const {userId, nickName, password} = checkAccountResponse.data;
//       // 이미 가입된 계정인 경우 바로 로그인 처리
//       console.log('id찾기 후 :', userId, nickName, password);
//       const loginResponse = await axios.post(`${Config.API_URL}/users/login`, {
//         userId: userId,
//         password: password,
//       });
//       console.log("카카오 로그인 후");
//       console.log(loginResponse.data.data);
//       const { user, accessToken, refreshToken } = loginResponse.data.data;
//       console.log(user.nickName, user.userId, accessToken);
//       dispatch(
//         userSlice.actions.setUser({
//           name: user.nickName,
//           email: user.userId,
//           accessToken,
//         }),
//       );
//       await EncryptedStorage.setItem('refreshToken', refreshToken);
//     } else {
//       // 가입되지 않은 계정인 경우 회원가입 시도
//       const signupResponse = await axios.post(`${Config.API_URL}/users/signup`, {
//         userId: email,
//         nickName: name,
//         password: Kpassword,
//       });

//       if (signupResponse.data.statusCode === 201) {
//         console.log('회원가입 성공 :' , signupResponse.data.data);
//         const {userId:newEmail, password:newPassword}= signupResponse.data.data;
//         console.log('서버에서 받은 id,비번:',newEmail, newPassword);
//         // 회원가입 성공 후 로그인 진행
//         const loginResponse = await axios.post(`${Config.API_URL}/users/login`, {
//           userId: newEmail,
//           password: newPassword,
//         });
//         console.log("카카오 로그인");
//         console.log(loginResponse.data.data);
//         const { user, accessToken, refreshToken } = loginResponse.data.data;
//         console.log(user.nickName, user.userId, accessToken);
//         dispatch(
//           userSlice.actions.setUser({
//             name: user.nickName,
//             email: user.useId,
//             accessToken,
//           }),
//         );
//         await EncryptedStorage.setItem('refreshToken', refreshToken);
//       } else if (signupResponse.data.statusCode === 409) {
//         console.log('회원가입 실패(이메일,닉네임 존재):', signupResponse.data.message);
//         // 이메일 또는 닉네임이 이미 존재하는 경우 처리할 내용을 작성합니다.
//       } else {
//         console.log("로그인 실패:", signupResponse.data.message);
//       }
//     }
//   } catch (error) {
//     console.log('Error occurred during Kakao login:', error);
//     if (error) {
//       Alert.alert('회원가입 실패', '이미 가입된 계정입니다. 로그인 해주세요.');
//     }
//   } finally {
//     setLoading(false);
//     Alert.alert('알림', '로그인이 되었습니다.');
//     // navigation.navigate('MainTab');
//   }
// }, [loading, dispatch, email, password]);



// 구글
GoogleSignin.configure({
  webClientId: '30827782913-uqnbma9ambqij83talbhoetm2u6t42iu.apps.googleusercontent.com',
  offlineAccess: true,
});
// 구글 로그인
const GoogleLogin = useCallback(async (): Promise<void> => {
  if (loading) {
    return;
  }
  try {
    setLoading(true);
    await GoogleSignin.hasPlayServices(); //
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);

    const idToken = userInfo.idToken;
    // const accessToken = userInfo.accessToken;
    console.log(idToken);
    // const {name, email} =userInfo.user;
    console.log(userInfo.user.name, );
    // const response = await axios.get(`${Config.API_URL}/auth/callback/google?idtoken=${idToken}`);
      const response = await axios.post(
        `${Config.API_URL}/auth/google-signin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      console.log( '서버서버',response.data, response.data.data, response);
      const { name, email, accessToken, refreshToken } = response.data.data;
      // const { userId, nickName } = response.data;
      dispatch(
        userSlice.actions.setUser({
          name,
          email,
          accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        refreshToken,
      );
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
}, [loading, dispatch]);




    const canGoNext = email && password;
    return (
        <DismissKeyboardView style={[styles.container]}>
            <View style={styles.containerr}>
                <Image style={styles.logo} source={require('../../assets/images/login/logo.png')} />
                <View>
                    <View>
                        <Text style={styles.label}>이메일</Text>
                        <TextInput
                            placeholder="이메일을 입력해주세요." 
                            placeholderTextColor='gray'
                            style={styles.input}
                            value={email}
                            onChangeText={onChangeEmail} 
                            importantForAutofill="yes"
                            autoComplete='email'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                passwordRef.current?.focus()
                            }}
                            blurOnSubmit={false}
                            ref={emailRef}
                            clearButtonMode="while-editing"
                            />
                    </View>
                    <View>
                        <Text style={styles.label}>비밀번호</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)." 
                            placeholderTextColor='#666' 
                            onChangeText={onChangePassword}
                            value={password}
                            keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
                            textContentType="password"
                            secureTextEntry
                            importantForAutofill='yes'
                            autoComplete="password"
                            returnKeyType="send"
                            clearButtonMode='while-editing'
                            ref={passwordRef}
                            onSubmitEditing={onSubmit}
                            />
                    </View>
                    <View>
                        <Pressable 
                          style={
                            canGoNext
                            ? StyleSheet.compose(styles.loginbtn, styles.loginbtnActive)
                            : styles.loginbtn
                          }
                            disabled={!canGoNext || loading}
                            onPress={onSubmit}>
                            {loading ? (
                              <ActivityIndicator color="white" />
                              ) : (
                                <Text style={styles.loginText}>로그인</Text>
                                )}
                        </Pressable>
                     
                        <Pressable onPress={toSignUp}>
                            <Text style={styles.signup}>회원가입하기</Text>
                        </Pressable>
                    </View>
                </View>




                <Text style={styles.text}>OTT콘텐츠 속 위시 아이템을 위고위고에서 빠르게 만나보세요!</Text>

                <View style={styles.button}>
                    <Pressable onPress={()=>signInWithKakao()}>
                        <Image style={styles.each_button} source={require('../../assets/images/login/kakao.png')} />
                    </Pressable>
                    <Pressable onPress={()=>GoogleLogin()}>
                    <Image style={styles.each_button} source={require('../../assets/images/login/google.png')} />
                    </Pressable>
                   

                    <Pressable>
                    <Image style={styles.each_button} source={require('../../assets/images/login/apple.png')} />
                    </Pressable>
                </View>
                <View style={styles.findContainer}>
                  
                  <Pressable onPress={FindPass}>
                    <Text style={styles.findText}>비밀번호 찾기</Text>
                  </Pressable>
         
                </View>
                <Text style={styles.enter}>먼저, 둘러볼께요.</Text>
                
            </View>
        </DismissKeyboardView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        backgroundColor: 'black'
    },
    containerr: {
        alignItems: "center",
    },
    logo: {
        marginTop: 100,
        marginBottom:40,
    },

    label: {
        marginVertical: 1,
        padding: 5,
        color: 'white',
        fontWeight: 'bold',

    },
    input: {
        color: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: 200,
    },

    loginbtn: {
        color: 'white',
        backgroundColor: 'gray',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    loginbtnActive: {
        backgroundColor: '#ff4376',
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
    },
    signup: {
        color: 'white',
        padding: 10,
        textAlign: 'center',
    },

    text: {
        marginTop: 70,
        color: "gray",
        fontSize: 13,
        width: 190,
    },
    button: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    findContainer: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-around',

    },
    findText: {
      fontSize: 12,
      color: 'white',
      marginHorizontal: 15,
      opacity: 0.8,
    },
    each_button: {
        marginRight: 6,
        marginLeft: 6,
    },
    enter: {
        marginTop: 20,
        color: "white",
        textDecorationLine: 'underline',
    }
})

export default SignIn;

