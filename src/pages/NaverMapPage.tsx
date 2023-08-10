import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import NaverMapView, { Marker, Path } from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Config from 'react-native-config';
import TMap from '../modules/TMap';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Address {
  x: number;
  y: number;
}

function NaverMapPage({ navigation, route }: { navigation: any; route: { params?: { address?: string } } }) {
  const address  = route.params?.address;
  console.log(address);
  console.dir(navigation);

  const [myPosition, setMyPosition] = useState<Coordinate | null>(null);
  const [destination, setDestination] = useState<Coordinate | null>(null);

  // 현재 위치 가져오기
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
      }
    );
  }, []);

// 주소를 좌표로 변환하는 함수
const geocodeAddress = async (address: string): Promise<Coordinate | null> => {
  try {
    const response = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': Config.clientId,
          'X-NCP-APIGW-API-KEY': Config.clientSecret,
        },
      }
    );

    const items: Address[] = response.data.addresses;

    if (items.length > 0) {
      const { x, y } = items[0];
      console.log(x, y);
      return {
        latitude: Number(y), // x와 y의 순서를 변경합니다.
        longitude: Number(x),
      };
    } else {
      throw new Error('No results found for the address');
    }
  } catch (error) {
    console.log('Error geocoding address:', error);
    throw error;
  }
};

// 도착지 검색하기
useEffect(() => {
  const searchDestination = async () => {
    try {
      if (!address) {
        return; // 주소가 없으면 종료
      }
      const destinationLocation = await geocodeAddress(address);
      setDestination(destinationLocation);

    } catch (error) {
      console.log('Error searching destination:', error);
      Alert.alert('도착지 검색 실패!');
    }
  };

  searchDestination();
}, [address]);


  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={styles.container}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NaverMapView
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        center={{
          zoom: 10,
          tilt: 0,
          latitude: (myPosition.latitude + (destination?.latitude || myPosition.latitude)) / 2,
          longitude: (myPosition.longitude + (destination?.longitude || myPosition.longitude)) / 2,
        }}
        
      >
        {myPosition && (
          <Marker
            coordinate={{
              latitude: myPosition.latitude,
              longitude: myPosition.longitude,
            }}
            width={15}
            height={15}
            anchor={{ x: 0.5, y: 0.5 }}
            caption={{ text: '나' }}
            image={require('../../assets/images/Home/star.png')}
            onClick={() => {
              TMap.openNavi(
                '출발지',
                myPosition.longitude.toString(),
                myPosition.latitude.toString(),
                'MOTORCYCLE',
              ).then(data => {
                console.log('TMap callback', data);
                if (!data) {
                  Alert.alert('알림', '티맵을 설치하세요1.');
                }
              });
            }}
          />
        )}
        {destination && destination.latitude && destination.longitude && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            width={15}
            height={15}
            anchor={{ x: 0.5, y: 0.5 }}
            caption={{ text: '도착' }}
            image={require('../../assets/images/Home/star.png')}
            onClick={() => {
              TMap.openNavi(
                '도착지',
                destination?.longitude.toString(),
                destination?.latitude.toString(),
                'MOTORCYCLE',
              ).then(data => {
                console.log('TMap callback', data);
                if (!data) {
                  Alert.alert('알림', '티맵을 설치하세요2.');
                }
              });
            }}
          />
        )}

        {myPosition?.latitude && destination?.latitude && (
          <Path
            coordinates={[
              {
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              },
              {
                latitude: destination?.latitude,
                longitude: destination?.longitude,
              },
            ]}
            color="#ff4376"
          />
        )}
       <Text style={styles.buttonText}>경로 더보기</Text>
      </NaverMapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff4376',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ff4376',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NaverMapPage;
