import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
// import 'react-native-gesture-handler';


export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function UserLogin() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        let collRef = firebase.firestore()
        .collection('users').doc(user.user.uid);

        collRef.set({
          email: email,
          name: name,
        });
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <SafeAreaView style={styles.main}>
      <Ionicons name="account-plus" size={100} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
      />
      <Pressable
          style={[styles.button2, { backgroundColor: '#ccbeff' }]}
          onPress={() => UserLogin()}>
          <Text style={{ color: 'white' }}>Register</Text>
        </Pressable>
        <Pressable
          style={[styles.button2, { backgroundColor: '#ccbeff' }]}
          onPress={() => navigation.goBack()}>
          <Text style={{ color: 'white' }}>Back</Text>
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
