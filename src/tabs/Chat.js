import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
let myId = '';
const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getAllChats();
  }, []);
  const getAllChats = async () => {
    myId = await AsyncStorage.getItem('USERID');
    name = await AsyncStorage.getItem('NAME');

    console.log(myId,'myid................');
    firestore()
      .collection('Users')
      .doc(myId)
      .onSnapshot(documentSnapshot => {
        console.log(documentSnapshot._data.chatList,'documentSnapshot..............');
        setChatList(documentSnapshot._data.chatList);
      });
    // firestore()
    //   .collection('Users')
    //   .doc(myId)
    //   .then(snapshot => {
    //     console.log(snapshot._docs);
    //     setChatList(snapshot._docs);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={chatList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                
                navigation.navigate('Messages', {
                  data: {
                    name: item.name,
                    profilePic: item.profilePic,
                    userId: item.userId,
                    chatId: item.chatId,
                    myId: myId,
                    senderName: name,
                  },
                });

              }}>
              <Image
                source={require('../images/user.png')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 20,
                }}
              />
              <Text style={{ color:'#000',marginLeft: 20, fontSize: 18}}>
                {item.name == name?item.senderName:item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Chat;
