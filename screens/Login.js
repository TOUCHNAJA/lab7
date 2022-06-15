import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, Pressable, LogBox, } from 'react-native';
import Constants from 'expo-constants';
import firebase from '../firestore';
import 'firebase/compat/auth';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
// import 'react-native-gesture-handler';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function UserLogin() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        alert('สำเร็จ');
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
    async function CheckLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
      });
    }
    CheckLogin();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
        <Ionicons name="login" size={100} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={[styles.button2, { backgroundColor: '#ccbeff' }]}
          onPress={() =>
            UserLogin()
          }>
          <Text style={{ color: 'white' }}>LOGIN</Text>
        </Pressable>
        <Pressable
          style={[styles.button2, { backgroundColor: '#ccbeff' }]}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: 'white' }}>REGISTER</Text>
        </Pressable>
        <Pressable
          style={[styles.button2, { backgroundColor: '#ccbeff' }]}
          onPress={() => navigation.navigate('Reset')}>
          <Text style={{ color: 'white' }}>FORGOT PASSWORD</Text>
        </Pressable>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    margin: 5,
    marginTop: 0,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'papayawhip',
  },
  input: {
    width: '60%',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  button2: {
    width: '60%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
});
