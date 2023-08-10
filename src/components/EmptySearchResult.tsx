import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const messages: { [key: string]: string} = {
    NOT_FOUND: '검색 결과가 없습니다.',
    EMPTY_KEYWORD: '검색어를 입력하세요.',
};

function EmptySearchResult({ type }: { type: string }) {
    return (
        <View style={styles.block}>
            <Text style={styles.text}>{messages[type]}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default EmptySearchResult;