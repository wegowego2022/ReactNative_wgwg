import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Likes from './src/pages/Likes';
import Write from './src/pages/Write';
import Community from './src/pages/Community';
import Home from './src/pages/Home';
import Search from './src/pages/Search';
import { useNavigation } from '@react-navigation/native';

export type LoggedInParamList = {
    Home: undefined;
    Community: undefined;
    Write: undefined;
    Likes: undefined;
    Search: undefined;
  };

const Tab = createBottomTabNavigator();

function MainTab() {
  const navigation = useNavigation();
    return (
        <Tab.Navigator
       
            screenOptions={({ route }) => ({              
              tabBarStyle: {
                backgroundColor: 'black',
              },
              tabBarActiveTintColor: 'white',
              tabBarIcon: ({ focused }) => {
                let iconName: string ='';
                let iconColor: string = 'gray';
                let iconSize: number = 20;
                if (route.name === '홈') {
                  iconName = focused ? 'home' : 'home';
                  iconColor = focused ? 'white' : 'gray';
                } else if (route.name === '커뮤니티') {
                  iconName = focused ? 'comments': 'comments';
                  iconColor = focused ? 'white' : 'gray';
                } else if (route.name === '작성') {
                  iconName = 'pencil';
                  iconColor = focused ? 'white' : 'gray';
                } else if (route.name === '관심') {
                  iconName = focused ? 'heart': 'heart-o';
                  iconColor = focused ? 'white' : 'gray';
                } else if (route.name === '검색') {
                  iconName = 'search';
                  iconColor = focused ? 'white' : 'gray';
                }
                return (
                  <FontAwesome name={iconName} size={iconSize} color={iconColor} />
                  )
              },

            })}
            >
                <Tab.Screen
                name="홈"
                component={Home}
                options={{
                  headerShown: false, 
                }}
                />
                <Tab.Screen
                name="커뮤니티"
                component={Community}
                options={{
                  headerShown: false, 
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={focused ? require('./assets/images/gnb/community_active.png') : require('./assets/images/gnb/community.png')}
                    />
                  ),
                }}
                />
                <Tab.Screen
                name="작성"
                component={Write}
                options={{
                  headerShown: false, 
                  tabBarIcon: ({ focused }) => (
                      <Image 
                      source={focused ? require('./assets/images/gnb/write_active.png') : require('./assets/images/gnb/write.png')} 
                      style={styles.circle}/>
                  ),
                }}
                />
                <Tab.Screen
                name="관심"
                component={Likes}
                options={{
                  headerShown: false, 
                  // tabBarIcon: () => <FontAwesome name="heart-o" size={20} color={'gray'}/>,
                }}
                />
                <Tab.Screen
                name="검색"
                component={Search}
                options={{
                  headerShown: false, 
                  // tabBarIcon: () => <FontAwesome name="navicon" size={20} color={'gray'}/>,
                }}
                />
            </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    bottom: 0,
  },
});

export default MainTab;