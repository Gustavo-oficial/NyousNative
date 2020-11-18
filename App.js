import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login';
import Home from './pages/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Logout = ({navigation}) => {
   return(
     <View>
       <Text>Deseja realmente sair?</Text>
       <Button onPrees={() =>{
         AsyncStorage.removeItem('@jwt');
         navigation.push('Login');
       }} title="SAIR"></Button>
     </View>
   )
}

const Autenticacao = () => {
  return(
    <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name = "Home" component={Home}/>
  </Drawer.Navigator>
  )
  
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator screenOptions={{ headerShown : false}}>
       <Stack.Screen name = "Login" component={Login}/>
       <Stack.Screen name = "Autenticação" component={Autenticacao}/>
    </StackNavigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
