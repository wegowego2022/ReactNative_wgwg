// import React, { useState, useEffect } from 'react';
// import { TextInput, View, Text, StyleSheet, Pressable, Image, ScrollView, InteractionManager } from 'react-native';
// import axios from 'axios';
// import Config from 'react-native-config';

// interface Movie {
//   link: string;
//   title: string;
// }

// function NaverApi() {
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     // 서버에 데이터 요청
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${Config.API_URL}/search/movie`, {
//           params: {
//             query: '기생충' // 프론트에서 전달할 쿼리 파라미터 값
//           }
//         });
//         const data = response.data;
//         setMovies(data.items); // 응답 데이터의 'items' 프로퍼티를 상태로 저장
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);


//   return (
//     <View>
//       <Text style={styles.text}>api</Text>
//       {movies.map(movie => (
//         <Text style={styles.text} key={movie.link}>{movie.title}</Text>
//       ))}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   text: {
//     color: 'white',
//   }
// })

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
interface SearchResult {
  title?: string;

}

const NaverApi = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const search = () => {
    const encodedQuery = encodeURIComponent(query);
    const url = `${Config.API_URL}/search/blog?query=${encodedQuery}`;

    axios.get(url)
      .then((response: AxiosResponse<{ items: SearchResult[] }>) => {
        if (response.data.items) {
          setResults(response.data.items);
        } else {
          setResults([]);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{ color: 'white',height: 40, borderWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder="Enter search query"
        onChangeText={setQuery}
        value={query}
      />
      <Button title="Search" onPress={search} />
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 16 }}>
              {item.title && <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>}
             
            </View>
          )}
        />
      ) : (
        <Text>No results found.</Text>
      )}
    </View>
  );
};

export default NaverApi;
