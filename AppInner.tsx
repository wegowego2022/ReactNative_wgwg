import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import FindPassword from './src/pages/FindPassword';
import More from './src/pages/More';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';
import { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios, { AxiosError } from 'axios';
import userSlice from './src/slices/user';
import { useAppDispatch } from './src/store';
import { Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import usePermissions from './src/hooks/usePermissions';
import MainTab from './MainTab';
import CommunityView from './src/components/CommunityView';
import PlaceInfo from './src/components/PlaceInfo';
import WriteFind from './src/components/WriteFind';
import HomeThismonthScreen from './src/components/HomeThismonthScreen';
import GoodsInfo from './src/components/GoodsInfo';
import WegoPickInfo from './src/components/WegoPickInfo';
import PlacePickInfo from './src/components/PlacePickInfo';
import PlacePickInfo2 from './src/components/PlacePickInfo2';
import UploadScreen from './src/pages/UploadScreen';
import NaverMapPage from './src/pages/NaverMapPage';
import Privacy from './src/components/Privacy';
type Item = {
  id: number;
  title: string;
  category: string;
  text: string;
  time: string;
  profile: any;
  nickname: string;
  picture: any;
  isLiked: boolean;
  like: number;
  comment: number;
  age: string;
  year: string;
  episodeNum: string;
  titleInfo:string;
  cast: string;
  type: string;
  image: string;
  //
  findName: string;
  findSeries: string;
  findEpisode: string;
  findHour: string;
  findMinute: string;
  findSecond: string;
  findText: string;
  findImage: string;
};

  export type RootStackParamList = {
    MainTab: undefined;
    More: undefined;
    CommunityView: { item: Item };
    PlaceInfo: { item: Item };
    WriteFind: {item: Item };
    UploadScreen: undefined;
    SignIn: undefined;
    SignUp: undefined;
    FindPassword: undefined;
    HomeThismonthScreen: { item: Item };
    GoodsInfo: { item: Item };
    WegoPickInfo: { item: Item };
    PlacePickInfo: { item: Item };
    PlacePickInfo2: { item: Item };
    NaverMapPage: undefined;
    Privacy: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const dispatch = useAppDispatch();
    const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

    usePermissions(); // 카메라, 위치 허용
    // 앱 자동 로그인
    useEffect(() => {
      const getTokenAndRefresh = async () => {
        try {
          const refreshtoken = await EncryptedStorage.getItem('refreshToken');
          if (!refreshtoken) {
            SplashScreen.hide();
            return;
          }
          const response = await axios.post(
            `${Config.API_URL}/users/api/refreshToken`,
            {},
            {
              headers: {
                authorization: `Bearer ${refreshtoken}`,
              },
            },
          );
          console.log(response.data, response.data.data);
          const { email, name, accessToken} = response.data.data;
          dispatch(
            userSlice.actions.setUser({
              // name: response.data.data.name,
              // email: response.data.data.email,
              // accessToken: response.data.data.accessToken,
              name,
              email,
              accessToken,
            }),
          );
        } catch (error) {
          console.error(error);
          if ((error as AxiosError<{ code: any }>).response?.data.code === 'expired') {
            Alert.alert('알림', '다시 로그인 해주세요.');
          }
        } finally {
          SplashScreen.hide();
        }
      };
      getTokenAndRefresh();
    }, [dispatch]);



    return isLoggedIn ? (
           
           <Stack.Navigator>
            <Stack.Screen 
              name="MainTab"
              component={MainTab}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="More"
              component={More}
              options={{headerShown: false}}
            />

            <Stack.Screen 
              name="WriteFind"
              component={WriteFind}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="UploadScreen"
              component={UploadScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen 
              name="CommunityView"
              options={{headerShown: false}}
            >
              {({ navigation, route }: { navigation: any; route: any }) => (
                <CommunityView navigation={navigation} item={route.params.item} />
              )}
            </Stack.Screen>

            <Stack.Screen 
              name="PlaceInfo"
              options={{headerShown: false}}
            >
              {({ navigation, route }: { navigation: any; route: any }) => (
                <PlaceInfo navigation={navigation} item={route.params.item} />
              )}
            </Stack.Screen>




            <Stack.Screen 
              name="HomeThismonthScreen"
              options={{headerShown: false}}
            >
              {({ navigation, route }: { navigation: any; route: any }) => (
                <HomeThismonthScreen navigation={navigation} item={route.params.item} />
              )}
            </Stack.Screen>

            <Stack.Screen 
              name="GoodsInfo"
              options={{headerShown: false}}
            >
              {({ navigation, route }: { navigation: any; route: any }) => (
                <GoodsInfo navigation={navigation} item={route.params.item} />
              )}
            </Stack.Screen>


            <Stack.Screen 
              name="WegoPickInfo"
              options={{headerShown: false}}
            >
              {({ navigation, route }: { navigation: any; route: any }) => (
                <WegoPickInfo navigation={navigation} item={route.params.item} />
              )}
            </Stack.Screen>

            <Stack.Screen 
              name="PlacePickInfo"
              options={{headerShown: false}}
            >
              {({ navigation, route }: { navigation: any; route: any }) => (
                <PlacePickInfo navigation={navigation} item={route.params.item} />
              )}
            </Stack.Screen>

            <Stack.Screen 
              name="PlacePickInfo2"
              options={{headerShown: false}}
            >
              {({ navigation, route }: { navigation: any; route: any }) => (
                <PlacePickInfo2 navigation={navigation} item={route.params.item} />
              )}
            </Stack.Screen>

            <Stack.Screen
                name="NaverMapPage"
                component={NaverMapPage}
                options={{ headerShown: false }}
              />

            <Stack.Screen 
              name="Privacy"
              component={Privacy}
              options={{headerShown: false}}
            />

           </Stack.Navigator>
            ) : (
            <Stack.Navigator>
             
                <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
                />
                <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTitleStyle: {
                    color: '#ff4376',
                  },
                  headerTitle: '회원가입',
                  headerTintColor: '#ff4376',
                }}
                />
               <Stack.Screen
                name="FindPassword"
                component={FindPassword}
                options={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTitleStyle: {
                    color: '#ff4376',
                  },
                  headerTitle: '비밀번호 찾기',
                  headerTintColor: '#ff4376',
                }}
                />
                
            </Stack.Navigator>
    );


}


export default AppInner;