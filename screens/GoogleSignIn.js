//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import * as google from "expo-auth-session/providers/google";
import * as webBrowser from "expo-auth-session";
// create a component
const GoogleSignIn = () => {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({});
  return (
    <View style={styles.container}>
      <Text>GoogleSignIn</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default GoogleSignIn;
