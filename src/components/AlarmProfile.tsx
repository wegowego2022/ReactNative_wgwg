import React  from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
type RootStackRaramList = {
    More: undefined;
};


function AlarmProfile ( navigation:any ) {
    return(
        <View style={styles.icons}>
            <Pressable>
                <Icon style={styles.icon} name="notifications-outline"  />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('More')}>
                <Image 
                    source={require('../../assets/images/more/profile-gray.png')}  
                    style={{width: 30, height: 25, marginLeft: 8}}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
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
})

export default AlarmProfile;