import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
export interface CommentItemProps {
  id: number;
  message: string;
  nickname: string;
  publishedAt: string;
  onDelete: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({

  id,
  message,
  nickname,
  publishedAt,
  onDelete,
}) => {
  const profilepicture = useSelector((state: RootState) => state.user.profilepicture);

  return (
    <View key={id} style={styles.container}>
      <View style={styles.header}>
        {/* <Image style={styles.image} source={require('../../assets/images/more/profile-gray.png')} /> */}
        <Image
                source={profilepicture ? { uri: profilepicture } : require('../../assets/images/more/profile-gray.png')}
                style={styles.image}
              />
        <View style={styles.info}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.date}>{publishedAt}</Text>
        </View>
        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    padding: 10,
    marginBottom: 12,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 15,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    marginRight: 15,
  },
  date: {
    opacity: 0.8,
    fontSize: 13,
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#ff4376',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  message: {
    color: 'white',
    fontSize: 15,
  },
});

export default CommentItem;
