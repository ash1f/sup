import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals'

import Font from '../constants/Typography'

export default function PremiumModal({ open, onClose }) {
  return (
    <Modal
      width={0.9}
      visible={open}
      onTouchOutside={onClose}
      footer={
        <ModalFooter>
          <ModalButton
            text="CLOSE"
            onPress={onClose}
          />
        </ModalFooter>
      }
    >
      <ModalContent>
        <View>
          <Text style={styles.heading}>Premium</Text>
          <Text style={styles.subheading}>Sorry, this is features is exclusively for members only, but we are more than happy for you to tryout !</Text>
        </View>
      </ModalContent>
    </Modal>
  )
}


const styles = StyleSheet.create({
  heading: {
    fontSize: Font(32),
    textAlign: "center",
    fontWeight: "600",
    color: "#f9a20f",
    lineHeight: 28,
    paddingVertical: Font(16)
  },
  subheading: {
    color: "#555",
    fontWeight: '400',
    fontSize: Font(18),
    lineHeight: 22,
    marginBottom: Font(12)
  },
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
    marginBottom: 8
  },
});

