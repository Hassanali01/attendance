import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import TextBox from "../components/TextBox";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import { AsyncStorage } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Formik } from "formik";
import { ContextValue } from "../ContextApi/ContextCreate";

const url = "http://192.168.5.34:5001/auth/login";
const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    height: "100%",
    //justifyContent: "center",
    alignItems: "center",
    // marginTop: "10%",
    //backgroundColor:'blue'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  logo: {
    width: 250,
    //maxWidth: 300,
    //maxHeight: 250,
    height: 250,
    marginVertical: "10%",
    borderRadius: 240 / 2,
    marginTop: 100,
    // resizeMode:"stretch"
  },
  forgot: {
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#D3D3D3",
    marginVertical: 25,
    textAlign: "right",
  },
  signUp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4d5151",
    marginVertical: 25,
    marginTop: "20%",
  },
  underline: {
    textDecorationLine: "underline",
    fontStyle: "italic",
    color: "#e0c222",
  },
  textInput: {
    marginTop: 0,
    width: "100%",
    borderColor: "#0B3270",
    borderWidth: 1,
    paddingLeft: 15,
    backgroundColor: "white",
    marginVertical: 20,
    padding: 4,
    borderRadius: 15,
    paddingVertical: 10,
  },
  containerInput: {
    height: 42,
    width: "92%",
    borderRadius: 15,
    marginTop: 20,
  },
});

export default function Loginscreen({ navigation }) {
  const { dispatch, user } = useContext(ContextValue);
  // const [values, setValues] = useState({
  //   email: "",
  //   pwd: "",
  // });

  // function handleChange(text, eventName) {
  //   setValues((prev) => {
  //     return {
  //       ...prev,
  //       [eventName]: text,
  //     };
  //   });
  // }

  // const save = async () => {
  //   try {
  //     console.log("called");
  //     await AsyncStorage.setItem("userName", values.email);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // function Login() {
  //   const { email, pwd } = values;

  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, pwd)
  //     .then((res) => {
  //       console.log(res);
  //       navigation.navigate("Select");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //       // ..
  //     });
  // }
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // let loginData = {
  //   username: username,
  //   password: password,
  // };
  // const handleSubmit = async () => {
  //   console.log("url", url);
  //   console.log(loginData);
  //   try {
  //     const resp = await axios.post(url, loginData);
  //     console.log("response", resp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const loginData = {
    username: username,
    password: password,
  };

  const handleSubmit = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://192.168.5.34:5001/auth/login",
        loginData
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setUserName("");
      setPassword("");
      // console.log("response", res);

      res && navigation.navigate("Select");

      // console.log(" Dispatch data", dispatch);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(error);
      alert("Re-enter Your Username & Password");
    }
  };

  // console.log("user will be", user);
  return (
    <LinearGradient
      colors={["#014872", "#A0EACF"]}
      style={styles.linearGradient}
    >
      <KeyboardAvoidingView style={styles.view}>
        <Image source={require("../assets/logo8.jpg")} style={styles.logo} />
        <TextInput
          placeholder="Email Address"
          value={username}
          style={styles.textInput}
          // onChangeText={(text) => handleChange(text, "email")}
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          placeholder="Password"
          // onChangeText={(text) => handleChange(text, "pwd")}
          value={password}
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <View
          style={{
            //flexDirection: "row",
            justifyContent: "space-between",
            //alignItems: "center",
            width: "92%",
          }}
        >
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgot}
          >
            ForgotPassword?
          </Text>
          {/* <Btn
            onClick={() => {
              save();
              Login();
            }}
            title="Login"
            style={{ width: "100%", backgroundColor: "#e0c222" }}
          /> */}
          <Btn
            onClick={handleSubmit}
            style={{ width: "100%", backgroundColor: "#e0c222" }}
            title="login"
            type={"submit"}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center", color: "black" }}>
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <Text style={styles.signUp}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Sign Up")}
            style={styles.underline}
          >
            Sign Up
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
