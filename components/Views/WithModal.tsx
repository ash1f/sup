import React, { useState, Children }  from 'react';
import {
  Modal,
  View,
  ModalProps,
  StyleSheet,
} from 'react-native'
import WithBackButton from '../Views/WithBackButton'

interface NotModalProps {
  onClose?: () => void,
  children?: any,
  show: boolean,
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  shownav?: boolean
}

type WithModalProps = ModalProps & NotModalProps;

const WithModal = (props: WithModalProps) => {
  return (
    <Modal 
    animationType="slide" 
    presentationStyle="pageSheet"
    visible={props.show}
    onRequestClose={() => {
      props.toggleModal(false)
      props.onClose;
    }}>
      {props.shownav ? (
        <WithBackButton back={() => props.toggleModal(false)} direction="down">
          {props.children}
        </WithBackButton>
      ) :  props.children}
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {

  }
})

export default WithModal
