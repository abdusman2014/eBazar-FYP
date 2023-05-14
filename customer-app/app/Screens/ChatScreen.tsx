import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'

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

const ChatScreen = ({user, route}) => {
    
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        setMessages([{
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
                user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
                }, 
            },])
    }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}


export default ChatScreen