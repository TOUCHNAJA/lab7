import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  Button,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Pressable,
  LogBox,
} from 'react-native';
import 'react-native-gesture-handler';
import { useState } from 'react';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './screens/Login';
import Register from './screens/Register';
import Reset from './screens/Reset';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [tempdata, setTempData] = useState(data);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    LogBox.ignoreLogs(['Unhandled promise rejection']);
    async function fetchData() {
      const result = await fetch(
        'https://it2.sut.ac.th/labexample/product.php?pageno=' + offset
      );
      const json = await result.json();
      if (json.products.length > 0) {
        setOffset(offset + 1);
        setData([...data, ...json.products]);
        setTempData([...data, ...json.products]);
      } else {
        setIsListEnd(true);
      }
    }
    fetchData();
  }, [data]);

  async function addProduct(prodName) {
    //alert(prodName)
    try {
      SecureStore.getItemAsync('cart').then(async (res) => {
        var prodlist = null;
        if (res === undefined || res === null) {
          prodlist = [prodName];
        } else {
          prodlist = JSON.parse(res);
          prodlist.push(prodName);
        }
        console.log(prodlist);
        await SecureStore.setItemAsync('cart', JSON.stringify(prodlist));
        getCart();
      });
    } catch (e) {}

    let mes = 'บันทึกแล้ว ' + prodName;
    alert(mes);
  }
  async function DeleteCart() {
    await SecureStore.deleteItemAsync('cart');
    setCart([]);
    alert('ตระกร้าสินค้าถูกลบแล้ว');
  }

  async function getCart() {
    var res = await SecureStore.getItemAsync('cart');
    if (res === undefined || res === null) {
    } else {
      console.log(res);
      setCart(JSON.parse(res));
    }
  }
  useEffect(() => {});

  function renderItem({ item }) {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: 185,
            width: 250,
            backgroundColor: 'white',
            marginLeft: '15%',
            marginBottom: '5%',
          }}>
          <TouchableOpacity onPress={() => addProduct(item.name)}>
            <Image
              style={{ width: 80, height: 75, marginLeft: '35%' }}
              source={{ uri: item.pic }}
            />
           <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ color: 'grey' }}>จำนวนคงเหลือ {item.stock}</Text>
              <Text style={{ color: 'red' }}>{item.price}$</Text>
              <Text> </Text>
              <Text> </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  function Home({ navigation }) {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Product"
          component={Product}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  function Product({ navigation }) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'papayawhip',
        }}>
       <Pressable
          style={[styles.pum, { backgroundColor: '#ccbeff' }]}
          onPress={() => filterItem('All')}>
          <Text style={{ color: 'white' }}>All</Text>
        </Pressable>
        <Pressable
          style={[styles.pum, { backgroundColor: '#ccbeff' }]}
          onPress={() => filterItem('0')}>
          <Text style={{ color: 'white' }}>In Stock</Text>
        </Pressable>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

  function Cart({ navigation }) {
    return (
      <SafeAreaView style={{ backgroundColor: 'papayawhip', flex: 1 }}>
        {cart.map((item) => (
          <View
            style={{

              flexDirection: 'column',
              justifyContent: 'flex-start',
              backgroundColor: 'papayawhip',

            }}>
            <Text style={styles.price}>{item}</Text>
          </View>
        ))}
        <Pressable
          style={[styles.pum1, { backgroundColor: '#ccbeff' }]}
          onPress={() => clearCart()}>
          <Text style={{ color: 'white' }}>CLEAR</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  function Profile({ navigation }) {
    return (
      <SafeAreaView style={{ backgroundColor: 'papayawhip', flex: 1 }}>
        <Ionicons
          style={{ marginLeft: '35%' }}
          name="account"
          size={100}
          color="black"
        />
        <Text style={{ marginBottom: '50%' }}>Your Name</Text>
        <Pressable
          style={[styles.pum2, { backgroundColor: '#ccbeff' }]}>
          <Text style={{ color: 'white' }}>CHANGE PROFILE PICTURE</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  

  function filterItem(val) {
    if (val == 'All') {
      //alert("Hello World");
      setData(tempdata);
    } else {
      setData(tempdata.filter((item) => item.stock > val));
    }
    console.log(data);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  price: {
    margin: 0,
    marginTop: 30,
    fontSize: 14,
    color: 'black',
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
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    width: '80%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
  button2: {
    width: '60%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
  pum: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0.5,
  },
  pum1: {
    marginVertical: 20,
    width: '100%',
    padding: 5,
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0.5,
  },
  pum2: {
    marginVertical: 20,
    width: '100%',
    padding: 5,
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0.5,
  },
});
