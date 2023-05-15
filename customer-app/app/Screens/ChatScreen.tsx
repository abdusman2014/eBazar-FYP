import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase/compat/app'
import { StyleSheet } from 'react-native';
import userStore from '../state-management/AppUser';

interface Message {
    _id: number;
    text: string;
    createdAt: Date;
    user: {
      _id: number;
      name: string;
      avatar: string;
    };
  }

const ChatScreen = (props) => {

    const { user } = userStore();
    const [messages, setMessages] = useState<Message[]>([]);

    const onSend = (msgArray) => {
      const msg = msgArray[0]
      const usermsg = {
        ...msg,
        sentBy: user.uid,
        sentTo: "null",
        createdAt: new Date()
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
      const chatid = uid > user.uid ? user.uid+ "-" +uid : uid+ "-" +user.uid
      
      firebase.firestore().collection('Chats')
      .doc(chatid)
      .collection('messages')
      .add({...usermsg,createdAt:firebase.firestore.FieldValue.serverTimestamp()})
    }

    const getAllMessages = async () => {
      const chatid = uid > user.uid ? user.uid+"-"+ uid : uid+"-"+user.uid   
      const msgResponse = await firebase.firestore().collection('messages')
      .doc(chatid)
      .collection('messages')
      .orderBy('createdAt', "desc")
      .get()
      const allTheMsgs = msgResponse.docs.map(docSanp => {
        return {
          ...docSanp.data(),
          createdAt:docSanp.data().createdAt.toDate()
        }
      })
      setMessages(allTheMsgs)
    }
    
    useEffect(() => {
      getAllMessages()
    },[]);

    return (
      <GiftedChat 
      style={{flex: 1}}
      messages={messages}
      onSend={text => onSend(text)}
      user={{ 
        _id: user.uid,
      }}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    flex: 1,
    padding: 8,
  },
  inputToolbar: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 0,
  },
  bubbleWrapper: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#e5e5e5',
  },
  bubbleText: {
    color: '#000',
  },
});

export default ChatScreen;