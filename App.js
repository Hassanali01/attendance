import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login";
import Home from "./screens/Home";
import SignUpScreen from "./screens/SignUp";
import firebase from "firebase/app";
import "firebase/auth";
import ForgotPassword from "./screens/ForgotPassword";
import SelectScreen from "./screens/Select";
import LeaveDetails from "./screens/LeaveDetails";
import ApplyForLeave from "./screens/ApplyForLeave";
import COLORS from "./screens/COLOR";
import { StatusBar } from "expo-status-bar";
import { ContextProvider, ContextValue } from "./ContextApi/ContextCreate";
import { useContext } from "react";
import LeaveListing from "./screens/LeaveListing";
const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyCgFhOwIu6j9sYuML1psaH1OKzK4-UZUuU",
    authDomain: "fir-app-50f88.firebaseapp.com",
    projectId: "fir-app-50f88",
    storageBucket: "fir-app-50f88.appspot.com",
    messagingSenderId: "963741666684",
    appId: "1:963741666684:web:f181f226fe3f8ab332e8f9",
  };

  //Checking if firebase has been initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <ContextProvider>
      <NavigationContainer>
        {/* {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator> : */}
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Select"
            component={SelectScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LeaveDetails"
            component={LeaveDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ApplyForLeave"
            component={ApplyForLeave}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LeaveListing"
            component={LeaveListing}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
