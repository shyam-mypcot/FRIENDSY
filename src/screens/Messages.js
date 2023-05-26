import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database, {firebase} from '@react-native-firebase/database';

import firestore from '@react-native-firebase/firestore';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
let userId = '';
let chatList = [];
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const [chats, setChats] = useState(false);
  
  const setUndefined = async () => {
   await route.params.data.chatId == undefined ? setChats(true): setChats(false);
  }
  useEffect(()  => {
    setUndefined()
     
    getData();
    console.log(chats,'chats.........',route.params.data.chatId);
    const querySnapshot = firestore()
      .collection('chats')
      .doc(chats? userId + route.params.data.userId: route.params.data.chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
      console.log('querysnapshot.........',querySnapshot);
      querySnapshot.onSnapshot(querySnapshot => {
      const allmessages = querySnapshot.docs.map(docSnap => {
        const data = docSnap.data();
        console.log(data,'data.........');
        return {
          ...docSnap.data(),
          createdAt: new Date(),
        };
      });
      setMessages(allmessages);
    });
  }, []);

  const getData = async () => {
    userId = await AsyncStorage.getItem('USERID');
    senderName = await AsyncStorage.getItem('NAME');
    console.log(name,'name........');

  };

  const onSend = msgArray => {
    const msg = msgArray[0];
    const mymsg = {
      ...msg,
      sendBy: userId,
      sendTo: route.params.data.userId,
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    sendMessage(mymsg);
  };
  const sendMessage = mymsg => {
    
    console.log('chats..................', chats);
    
    console.log(
      'userId+route.params.data.userId...............................',
      userId + route.params.data.userId,
    );
    firestore()
      .collection('chats')
      .doc(chats? userId + route.params.data.userId: route.params.data.chatId,)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()})
      .then(res => {
        console.log(res, 'res........');
      })
      .catch(error => {
        console.log(error);
      });
    // console.log('route.params.data.myId', route.params.data.myId);
    if (chats) {
      chatList.push({
        chatId: userId + route.params.data.userId,
        name: route.params.data.name,
        senderName: senderName,
        userId: route.params.data.userId,
        profilePic: route.params.data.profilePic,
      });
      console.log(chatList, 'chatlist......................');
      firestore()
        .collection('Users')
        .doc(userId)
        .update({
          chatList: chatList,
        })
        .then(res => {console.log('res.....',res);})
        .catch(error => {
          console.log(error);
        });
      firestore()
        .collection('Users')
        .doc(route.params.data.userId)
        .update({
          chatList: chatList,
        })
        .then(res => {})
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
        alwaysShowSend
        renderSend={props => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  alert('attach clicked');
                }}>
                <Image
                  source={require('../images/attach.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  alert('mic clicked');
                }}>
                <Image
                  source={require('../images/mic.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../images/image.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
              <Send
                {...props}
                containerStyle={{justifyContent: 'center', marginLeft: 15}}>
                <Image
                  source={require('../images/send.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 15,
                    tintColor: 'orange',
                  }}
                />
              </Send>
            </View>
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{borderRadius: 10}}></InputToolbar>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'orange',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Messages;
