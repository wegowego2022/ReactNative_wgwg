import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Pressable, Image, TextInput, FlatList, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import CommentItem from '../components/CommentItem';
import { CommentItemProps } from '../components/CommentItem';

interface UploadScreenRouteParams {
  findName?: string;
  findSeries?: string;
  findEpisode?: string;
  findHour?: string;
  findMinute?: string;
  findSecond?: string;
  findText?: string;
  preview?:string;
}

interface NewItem {
  id: number;
  category: string;
  title: string;
  text: string;
  time: string;
  profile: any;
  nickname: string;
  picture: any;
  isLiked: boolean;
  like: number;
  comment: number;
}

const DATA: NewItem[] = []; 

function UploadScreen({
  navigation,
  route: {
    params: {
      findName,
      findSeries,
      findEpisode,
      findHour,
      findMinute,
      findSecond,
      findText,
      preview,
    } = {},
  },
}: {
  navigation: any;
  route: { params: UploadScreenRouteParams };
}) {
  const name = useSelector((state: RootState) => state.user.name);
  const profilepicture = useSelector((state: RootState) => state.user.profilepicture);
  const dispatch = useAppDispatch();
  
  // 좋아요
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [comment, setComment] = useState('');
  const [isCommentInputVisible, setCommentInputVisible] = useState(false);
  const [comments, setComments] = useState<CommentItemProps[]>([]);
// 서버시간
  const [serverTime, setServerTime] = useState('');
  useEffect(() => {
    // Set the server time when the component mounts
    const koreanDateFormatter = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Seoul', // Set the Korean timezone
    });
    
    const formattedTime = koreanDateFormatter.format(new Date());
    setServerTime(formattedTime);
  }, []);

  const handleSendComment = () => {
    if (comment.trim()) {
      const newComment: CommentItemProps = {
        id: comments.length + 1,
        message: comment,
        nickname: name,
        publishedAt: new Date().toLocaleString(),
      };

      setComment('');
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentInputVisible(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  const handleCommentButtonPress = () => {
    setCommentInputVisible(true);
  };

  // 뒤로가기 버튼 후 
  const handleBackButtonPress = () => {
    const newItem: NewItem = {
      id: DATA.length + 1,
      category: '찾아주세요',
      title: findName || '', // Use an empty string if undefined
      text: findText || '', // Use an empty string if undefined
      time: serverTime,
      profile: profilepicture ? { uri: profilepicture } : require('../../assets/images/more/profile-gray.png'),
      nickname: name,
      picture: preview || '', 
      isLiked: like,
      like: likeCount,
      comment: comments.length,
    };

    DATA.unshift(newItem);

    navigation.navigate('Community', { newItem });
  };

  return (
    <ScrollView>

    <View style={styles.block}>
      <Pressable onPress={handleBackButtonPress}>
      {/* <Pressable onPress={() => navigation.goBack()}> */}
        <Icon style={styles.icon} name="arrow-back-outline" />
      </Pressable>

      <Text style={styles.category}>찾아주세요</Text>

      <View style={styles.profileContainer}>
        <View>
        <Image
                source={profilepicture ? { uri: profilepicture } : require('../../assets/images/more/profile-gray.png')}
                style={styles.profile}
              />

        </View>
        <View>
          <Text style={styles.nickname}>{name}</Text>
          <Text style={styles.time}>{serverTime}</Text>
        </View>
      </View>

      <Text style={styles.title}>{findName}</Text>
      <Text style={styles.text}>{findText}</Text>
      <View style={styles.episodeContainer}>
        <Text style={styles.episode}>{findSeries}  Ep.{findEpisode}화</Text>
        <Text style={styles.episodeTime}>- {findHour} {findMinute} {findSecond}</Text>
      </View>
     
      {preview && <Image source={{ uri: preview }} style={styles.image} />}


      <View style={styles.flex}>
        <Text style={styles.like}>
          <Pressable onPress={() => {
            setLike(!like);
            setLikeCount(likeCount + (like ? -1 :1));
          }}>
            <AntDesign
              name={like ? 'heart' : 'hearto'}
              style={{
                fontSize: 25,
                color: like ? '#ff4376' : 'dimgray',
                marginRight: 6,
              }}
            />
          </Pressable>
          {likeCount}
        </Text>
        <Text style={styles.comment}>
          <Pressable>
            <Ionic
              name="ios-chatbubble-outline"
              style={{ fontSize: 25, color: 'dimgray', paddingRight: 6 }}
            />
          </Pressable>
          {comments.length}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.commentRow}>
      <Text style={styles.commentTitle}>댓글</Text>
        {!isCommentInputVisible && (
          <Pressable style={styles.commentButton} onPress={handleCommentButtonPress}>
            <Ionic name="ios-chatbubble-outline" style={styles.commentButtonText} />
          </Pressable>
        )}
      </View>
      <ScrollView style={styles.commentContainer}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            message={comment.message}
            nickname={comment.nickname}
            publishedAt={comment.publishedAt}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}


        {isCommentInputVisible && (
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChangeText={setComment}
            />
            <Pressable style={styles.sendButton} onPress={handleSendComment}>
              <Text style={styles.sendButtonText}>보내기</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
    block: {
    backgroundColor: '#141414',
        color: 'white',
        flex: 1,
        paddingHorizontal: 15,
    },
    icon: {
        fontSize: 23,
        color: 'white',
        paddingVertical: 14,
    },
    profileContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    category: {
        color: 'white',
        backgroundColor: '#2b2b2b',
        width: 60,
        textAlign: 'center',
        borderRadius: 3,
        padding: 6,
        fontSize: 10,
        
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 15,
        marginBottom: 20,
    },
    episodeContainer: {
        flexDirection: 'row',
        paddingBottom:10,
    },
    episode: {
        color: 'white',
        fontSize: 15,
    },
    episodeTime: {
        marginLeft: 10,
        color: 'gray',
        fontSize: 14,
    },
    image: {
      width: Dimensions.get('window').width - 20,
      height: Dimensions.get('window').height / 2,
        // width: '100%',
        // height: 350,
        marginVertical: 16,
        resizeMode: 'cover',
    },
    time: {
        color: 'white',

    },
   
    profile: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 14,
        borderRadius: 50,
        marginLeft: 8, 
    },
    nickname: {
        color: 'white',
        fontWeight: 'bold',
        
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 20,
        paddingVertical: 10,

    },
    like: {
        fontSize: 14,
        color: 'dimgray',
        
    },
    comment: {
       fontSize: 14,
        color: 'dimgray',

    },

    //댓글 
    commentRow: {
      flexDirection: 'row',
    },
    commentTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 10,
      },
     
      commentButton: {
        width: 25,
        backgroundColor: '#ff4376',
        padding: 5,
        borderRadius: 8,
        marginVertical: 12,
      },
      commentContainer: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 50,
        color: 'white',
      },
      commentButtonText: {
        color: 'white',
        fontSize: 15,
      },
      commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginRight: 10,
        color: 'white',
      },
      sendButton: {
        backgroundColor: '#ff4376',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
      },
      sendButtonText: {
        color: 'white',
        fontSize: 15,
      },
      //
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 15,
      },

});

export default UploadScreen;