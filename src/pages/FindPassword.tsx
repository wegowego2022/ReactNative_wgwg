import React from 'react';
import { useState, useCallback, useRef } from 'react';
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

type FindPasswordProps = NativeStackScreenProps<RootStackParamList, 'FindPassword'>;

function FindPassword({ navigation }: FindPasswordProps) {
  
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  
    // Function to send the password reset email
    const sendResetEmail = useCallback(async () => {
      if (!forgotPasswordEmail || !forgotPasswordEmail.trim()) {
        return Alert.alert('알림', '이메일을 입력해주세요.');
      }
  
      try {
        await axios.post(`${Config.API_URL}/users/forgot-password`, {
          email: forgotPasswordEmail,
        });
        Alert.alert('알림', '위 주소로 비밀번호 설정 메일이 전송되었습니다. 메일을 확인해주세요.');
      } catch (error) {
        console.log(error);
        const errorResponse = (error as AxiosError).response;
        if (errorResponse) {
          Alert.alert('알림', (errorResponse.data as { message: string }).message);
        }
      }
    }, [forgotPasswordEmail]);
  
    return (
      <DismissKeyboardView style={[styles.container]}>
        <View style={styles.findContainer}>
            <Text style={styles.text}>비밀번호를 잃어버리셨나요? 위고위고에 가입한 이메일을 정확히 입력해 주세요. 이메일을 통해 비밀번호 변경 링크가 전송됩니다.</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="gray"
            style={styles.input}
            value={forgotPasswordEmail}
            onChangeText={setForgotPasswordEmail}
            importantForAutofill="yes"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={sendResetEmail}
          />
          <Pressable onPress={sendResetEmail}>
            <Text style={styles.findText}>인증메일 전송하기</Text>
          </Pressable>
        </View>
      </DismissKeyboardView>
    );
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        backgroundColor: 'black',
        
    },
    text: {
        color: 'gray',
        fontSize: 13,
        padding: 15,
        justifyContent: 'center',
    },
    input: {
        marginHorizontal: 15,
        color: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: '90%',
        justifyContent: 'center',
    },
    findContainer: {
        marginTop: 20,
  
      },
      findText: {
        marginTop: 30,
        fontSize: 14,
        color: 'white',
        marginHorizontal: 15,
        opacity: 0.8,
        width: '90%',
        backgroundColor: '#ff4376',
        padding: 20,
        borderRadius: 5,
        textAlign: 'center',
      },
  });

  export default FindPassword;
  