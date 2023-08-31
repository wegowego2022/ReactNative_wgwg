import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Config from 'react-native-config';


type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: any)=> {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback((text: any) => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback((text: any) => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(async() => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(email, name, password);
    // 서버로 이메일, 이름, 패스워드 보내기!! axios로

    try { // 성공했을 때
      setLoading(true);
      console.log(Config.API_URL);
      const response = await axios.post(`${Config.API_URL}/users/signup`, {
      // const response = await axios.post(`${Config.API_URL}/users`, {

        userId: email, // 수정
        nickName: name, // 수정
        password, // 수정
      });
      console.log('회원가입 성공',response.data);
      // console.log(response.data.password);

    } 
    catch (error) { // 실패했을때
      const errorResponse = (error as AxiosError).response as AxiosResponse | undefined;
      if (errorResponse) {
        const errorMessage = errorResponse.data.message;
        if (errorMessage === 'User or nickname already exists') {
          Alert.alert('알림', '이미 가입한 회원입니다.');
        } else {
          Alert.alert('알림', '이미 가입한 회원입니다.');
      }
    } else {
      // Alert.alert('알림', '회원가입에 실패했습니다. 다시 시도해주세요.??');
      
    }
  } finally { // 무조건 실행
    setLoading(false);
    Alert.alert('알림', '회원가입이 되었습니다.');
    navigation.navigate('SignIn');
    }
   
  }, [loading, navigation, email, name, password]); // password일방향 암호화 

  const canGoNext = email && name && password;
  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeEmail}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#666"
            autoComplete='email'
            importantForAutofill="yes"
            textContentType="emailAddress"
            value={email}
            returnKeyType="next"
            keyboardType='email-address'
            clearButtonMode="while-editing"
            ref={emailRef}
            onSubmitEditing={() => nameRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.textInput}
            placeholder="닉네임을 입력해주세요."
            placeholderTextColor="#666"
            onChangeText={onChangeName}
            value={name}
            textContentType="name"
            // autoCapitalize="none" //
            // autoCorrect={false} //
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nameRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
            placeholderTextColor="#666"
            onChangeText={onChangePassword}
            value={password}
            keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={passwordRef}
            onSubmitEditing={onSubmit}
          />
        </View>
        <View style={styles.buttonZone}>
          <Pressable
            style={
              canGoNext
                ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
                : styles.loginButton
            }
            disabled={!canGoNext || loading}
            onPress={onSubmit}>
              {loading ? (
                <ActivityIndicator color="#ff4376"/>
              ) : (
                <Text style={styles.loginButtonText}>회원가입</Text>
              )}
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  background: {
  },
  textInput: {
    color: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 210,
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonActive: {
    backgroundColor: '#ff4376',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUp;