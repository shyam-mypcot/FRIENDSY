import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import HomeScreen from './screens/HomeScreen';
import Comments from './screens/Comments';
import Messages from './screens/Messages';
import MyMessages from './screens/MyMessages';
import NewMessage from './screens/NewMessage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" options={{headerShown: false}}>
          {props => <Splash {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login" options={{headerShown: false}}>
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" options={{headerShown: false}}>
          {props => <Signup {...props} />}
        </Stack.Screen>
        <Stack.Screen name="HomeScreen" options={{headerShown: false}}>
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Comments" options={{headerShown: false}}>
          {props => <Comments {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Messages" options={{headerShown: false}}>
          {props => <Messages {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MyMessages" options={{headerShown: false}}>
          {props => <MyMessages {...props} />}
        </Stack.Screen>
        <Stack.Screen name="NewMessage" options={{headerShown: false}}>
          {props => <NewMessage {...props} />}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
