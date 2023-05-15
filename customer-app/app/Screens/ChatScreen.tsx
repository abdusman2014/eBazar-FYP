import { useState, useEffect, useCallback } from "react";
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase/compat/app";
import { StyleSheet } from "react-native";
import userStore from "../state-management/AppUser";

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
  console.log(props.route.params);

  const { user } = userStore();
  const [messages, setMessages] = useState<Message[]>([]);

  const onSend = (msgArray) => {
    const msg = msgArray[0];
    const usermsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: props.route.params.uid,
      createdAt: (new Date()).toISOString(),
    };
    const msgs = [...messages, usermsg];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, usermsg)
    );
    const chatid = props.route.params.uid;

    const usersRef = firebase
      .firestore()
      .collection("Users/" + user?.uid! + "/messages")
      .doc(chatid);
    usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log("exist");
        usersRef.update({
          messages: msgs,
        });
        // usersRef.onSnapshot((doc) => {
        //   // do stuff with the data
        //   console.log("exist");
        //   usersRef.update({
        //     messages: msgs,
        //   });
        // });
      } else {
        const data = { messages: msgs };
        console.log("does not exist: ", data);
        usersRef
          .set({ recievername: props.route.params.name, messages: msgs })
          .then(() => {
            console.log("card added!");
          })
          .catch((e) => {
            console.log("error: ", e);
          });
      }
    });
    //.update({...usermsg,createdAt:firebase.firestore.FieldValue.serverTimestamp()})
  };

  const getAllMessages = async () => {
    const chatid = props.route.params.uid;
    const msgResponse = await firebase
      .firestore()
      .collection("Users/" + user?.uid! + "/messages")
      .doc(chatid)
      .get();
      console.log(msgResponse.data())
    // const allTheMsgs = msgResponse.docs.map((docSanp) => {
    //   return {
    //     ...docSanp.data(),
    //     createdAt: docSanp.data().createdAt.toDate(),
    //   };
    // });
    if (msgResponse.data() !== undefined){

      setMessages(msgResponse.data().messages);
    }
  };

  useEffect(() => {
    //if(messages.length === 0){

      getAllMessages();
    //}
  }, []);

  return (
    <GiftedChat
      style={{ flex: 1 }}
      messages={messages}
      onSend={(text) => onSend(text)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listView: {
    flex: 1,
    padding: 8,
  },
  inputToolbar: {
    backgroundColor: "#f5f5f5",
    borderTopWidth: 0,
  },
  bubbleWrapper: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#e5e5e5",
  },
  bubbleText: {
    color: "#000",
  },
});

export default ChatScreen;
