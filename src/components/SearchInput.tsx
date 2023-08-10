import React, {useContext, useState} from 'react';
import { View, TextInput, Text, Pressable, Image, StyleSheet } from 'react-native';
import Ionic from 'react-native-vector-icons/MaterialIcons';

function SearchInput() {
    const[keyword, setKeyword] = useState('');

    const handleTextChange = (text) => {
        setKeyword(text);
    };

    return (
        <View style={styles.container}>
            <Ionic name='search' style={styles.searchIcon} />
            <TextInput 
                placeholder="원하는 콘텐츠를 검색하세요" 
                placeholderTextColor="#909090"
                style={styles.searchInput}
                value={keyword}
                onChangeText={handleTextChange}
                autoFocus
                autoCapitalize="none"
            />
            <Pressable
                style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
                onPress={() => setKeyword('')}
            >
                <Ionic name="cancel" size={20} color="gray" />

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'relative',
    },
    searchIcon: {
        fontSize: 22,
        color: 'white',
        position: 'absolute',
        zIndex: 1,
        left: 20,
        top: 18,
    },
    searchInput: {
        width: '97%',
        backgroundColor: '#141414',
        color: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        padding: 4,
        paddingLeft: 50,
        marginBottom: 8,
    },
    button: {
        position: 'absolute',
        right: 20,
        top: 18,
        
    }
});

export default SearchInput;