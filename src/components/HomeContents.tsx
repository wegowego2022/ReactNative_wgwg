import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import HomePromotion from './HomePromotion';
import HomeKeyword from './HomeKeyword';
import HomePlan from './HomePlan';
import { useNavigation } from '@react-navigation/native';
import ThismonthItem from './ThismonthItem';
import HomeEditorItem from './HomeEditorItem';
type Item = {
    id: number;
    title: string;
    age: string;
    year: string;
    episodeNum: string;
    titleInfo: string;
    cast: string; 
    type: string;
    image: any;
  };
  
  const DATA: Item[] = [
    {
      id: 1,
      title: '수리남',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/97970/k2PiYV5KByiNPdQh27DdEthxdHt.jpg',
    },
    {
      id: 2,
      title: '수리남',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/97970/k2PiYV5KByiNPdQh27DdEthxdHt.jpg',
    },
    {
      id: 3,
      title: '강철비',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
    },
    {
      id: 4,
      title: '대행사',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/203698/48RLkW84Cz4MBZSk9zWRxkGRXVW.jpg',
    },
    {
      id: 5,
      title: '강철비5',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
    },
    {
      id: 6,
      title: '강철비6',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
    },
    {
      id: 7,
      title: '강철비',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
    },
    {
      id: 8,
      title: '강철비',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image:
        'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
    },
    {
      id: 9,
      title: '강철비',
      age: '18',
      year: '2022',
      episodeNum: '6',
      titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
      cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
      type: '시리즈',
      image: 'https://images.nstatic.org/info/tv/97970/k2PiYV5KByiNPdQh27DdEthxdHt.jpg',
    },
      {
        id: 10,
        title: '강철비',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
      },
      {
        id: 11,
        title: '강철비',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
      },
      {
        id: 12,
        title: '강철비',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
      },
      {
        id: 13,
        title: '강철비13',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/112486/p5K6QPISAPuXXYg2bUjux5FMxeh.jpg',
      },
      {
        id: 14,
        title: '대행사14',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/203698/48RLkW84Cz4MBZSk9zWRxkGRXVW.jpg',
      },
      {
        id: 15,
        title: '대행사15',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/203698/48RLkW84Cz4MBZSk9zWRxkGRXVW.jpg',
      },
      {
        id: 16,
        title: '대행사16',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/203698/48RLkW84Cz4MBZSk9zWRxkGRXVW.jpg',
      },
      {
        id: 17,
        title: '대행사17',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/203698/48RLkW84Cz4MBZSk9zWRxkGRXVW.jpg',
      },
      {
        id: 18,
        title: '대행사18',
        age: '18',
        year: '2022',
        episodeNum: '6',
        titleInfo: '남미 국가 수리남에서 한국인 마약대부로 인해 누명을 쓴 한 민간인이 국정원의 비밀임무를 수락하여 수리남에서 일어나는 이야기이다...',
        cast: '윤종빈 감독 하정우, 황정민, 박해수, 조우진 등',
        type: '시리즈',
        image:
          'https://images.nstatic.org/info/tv/203698/48RLkW84Cz4MBZSk9zWRxkGRXVW.jpg',
      },
  
  ];

  
  function HomeContents() {
    const goToNextScreen = (item: Item) => {
        navigation.navigate('HomeThismonthScreen', { item });
    };
    const navigation = useNavigation();
    const [itemCount, setItemCount] = useState(9);
    const [showButton, setShowButton] = useState(true);

    const handleItemCount = () => {
      setItemCount((prevCount) => prevCount + 4);
      hideButton();
    }
    const hideButton = () => {
      setShowButton(false);
    };

    return (
        <View>
       
            <View style={styles.container}>
                {/* <Image
                    source={require('../../assets/images/Home/Contents/banner1.png')}
                    style={styles.event}
                /> */}

                <View>
                    <Text style={styles.thismonthText}>이달의 인기 콘텐츠🍿</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    
                    {DATA.slice(0, 5).map((item) => (
                      <Pressable key={item.id} onPress={() => goToNextScreen(item)}>
                        <View style={styles.thismonth}>
                        <Text style={styles.number}>{item.id}</Text>

                          <ThismonthItem navigation={navigation} item={item} />
                        </View>
                      </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* <HomePromotion /> */}
                <Text style={styles.padding}></Text>
                <HomeKeyword />

      
                  <Text style={styles.editorTitle}>에디터 선정 추천 콘텐츠 💫 </Text>
            
                  <View style={styles.editorContainer}>
                    {DATA.slice(5, itemCount).map((item) => (
                      <Pressable key={item.id} onPress={() => goToNextScreen(item)}>
                        <HomeEditorItem item={item} navigation={navigation} />
                      </Pressable>
                    ))}
                  </View>

                  {showButton && <Text style={styles.editorButton} onPress={handleItemCount}
                  >에디터 선정 추천 콘텐츠 모두보기</Text>}
                    
        

                
                <Text style={styles.thismonthText}>회원님을 위한 추천💘</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    
                    {DATA.slice(13, 18).map((item) => (
                      <Pressable key={item.id} onPress={() => goToNextScreen(item)}>
                        <View style={styles.thismonth}>

                          <ThismonthItem navigation={navigation} item={item} />
                        </View>
                      </Pressable>
                        ))}
                    </ScrollView>



                {/* <HomePlan /> */}
                

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 0,
        marginBottom: 130,
    },
    event: {
        width: '100%',
    },

    //
    thismonthText: {
        color: 'white',
        fontSize: 17,
        marginTop: 20,
        paddingVertical: 12,
        fontWeight: 'bold',
      },
      thismonth: {
        flex: 1,
        flexDirection: 'row',
      },
      number: {
        position: 'absolute',
        top: 3,
        left: 3,
        backgroundColor: 'black',
        color: 'white',
        zIndex: 99,
        paddingHorizontal: 4,
        borderRadius: 3,
      },
      ///
      padding: {
        padding: 5,
      },
      editorTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        paddingVertical: 14,
    },

    editorContainer: {
        width: '100%',
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        flexWrap: 'wrap',
 
    },
 
    editorButton: {
        color: 'white',
        fontWeight: 'bold',
        borderColor: 'dimgray',
        borderWidth: 1,
        padding: 20,
        textAlign: 'center',
        borderRadius: 3,
        marginBottom: 10,
    },




    
});

export default HomeContents;