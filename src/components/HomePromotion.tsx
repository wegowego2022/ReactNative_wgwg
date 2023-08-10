import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';


function HomePromotion() {
    return(
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.box1Text}>프로모션</Text>
                <Text style={styles.Text}>7월 신규 혜택</Text>
                {/* <Image source={require('../../assets/images/Home/box1.png')} /> */}
            </View>
            <View style={styles.box2}>
                <View style={styles.box21}>
                    <Image source={require('../../assets/images/Home/box2.png')} />
                </View>
                <View style={styles.box22}>
                    <Image source={require('../../assets/images/Home/box3.png')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    box1: {
        width: '46%',
        height: 246,
        marginRight: 10,
        backgroundColor: 'navy',
        borderRadius: 5,
    },
    box1Text: {
        color: 'white',
        position: 'absolute',
        top: 35,
        left: 35,
        fontWeight: 'bold',
        fontSize: 16,
        
    },
    Text: {
        position: 'absolute',
        top: 55,
        left: 35,
        color: '#11e0ff',
        fontSize: 12,
    },
    box2: {
        width: '45%',
    },
    box21: {
        marginBottom: 10,
    },

    box22: {
        marginBottom: 40,
    }
});

export default HomePromotion;