import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Button, Alert, Pressable } from 'react-native';

const CommunityReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const reasons = ['욕설 및 비방', '스팸', '부적절한 콘텐츠'];

  const reportPost = () => {
    if (selectedReason) {
      console.log(`Reason: ${selectedReason}`);
      setShowModal(false);
      setSelectedReason('');
      Alert.alert('Reported', '신고가 완료되었습니다.');
    } else {
      Alert.alert('Error', '신고 사유를 선택해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowModal(true)}>
        <Text style={styles.reportText}>이 게시글 신고하기</Text>
      </Pressable>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>신고 사유 선택하기:</Text>
          {reasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.reasonButton,
                selectedReason === reason && styles.selectedReasonButton,
              ]}
              onPress={() => setSelectedReason(reason)}
            >
              <Text
                style={[
                  styles.reasonButtonText,
                  selectedReason === reason && styles.selectedReasonButtonText,
                ]}
              >
                {reason}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.buttonContainer}>

            <Button title="신고하기" onPress={reportPost} color="#ff4376" />
            <Button title="취소하기" onPress={() => setShowModal(false)} color="gray" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reportText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  reasonButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  selectedReasonButton: {
    backgroundColor: 'lightgray',
  },
  reasonButtonText: {
    fontSize: 15,
    color: 'black',
  },
  selectedReasonButtonText: {
    color: 'darkblue',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,

  },
});

export default CommunityReport;
