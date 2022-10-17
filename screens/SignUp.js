import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import TextBox from "../components/TextBox";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    //justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
  },
  signUp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4d5151",
    marginVertical: 25,
    marginTop: "30%",
  },
  underline: {
    textDecorationLine: "underline",
    fontStyle: "italic",
    color: "white",
  },
  underline: {
    textDecorationLine: "underline",
    fontStyle: "italic",
    color: "#e0c222",
  },
  terms: {
    width: "92%",
    //marginLeft:20,
    color: "#4d5151",
    marginVertical: 10,
    marginTop: "5%",
  },
  link: {
    color: "#e0c222",
    textDecorationLine: "underline",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});

export default function SignUpScreen({ navigation }) {
  const onTermsOfUse = () => {
    console.warn("Terms Of Use ");
  };
  const onPrivacyPolicy = () => {
    console.warn("Privacy Policy");
  };

  const [values, setValues] = useState({
    email: "",
    pwd: "",
    pwd2: "",
  });

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  function SignUp() {
    const { email, pwd, pwd2 } = values;

    if (pwd == pwd2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then(() => {})
        .catch((error) => {
          alert(error.message);
          // ..
        });
    } else {
      alert("Passwords are different!");
    }
  }

  return (
    <LinearGradient
      colors={["#014872", "#A0EACF"]}
      style={styles.linearGradient}
    >
      <View style={styles.view}>
        <Text
          style={{
            fontSize: 34,
            fontWeight: "800",
            marginBottom: 20,
            color: "",
          }}
        >
          Create Account
        </Text>
        <TextBox
          placeholder="Email Address"
          onChangeText={(text) => handleChange(text, "email")}
        />
        <TextBox
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => handleChange(text, "pwd")}
        />
        <TextBox
          placeholder="Confirme Password"
          secureTextEntry={true}
          onChangeText={(text) => handleChange(text, "pwd2")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "92%",
          }}
        >
          <Btn
            onClick={() => SignUp()}
            title="Sign Up"
            style={{ width: "100%", backgroundColor: "#e0c222" }}
          />
        </View>
        <Text style={styles.terms}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUse}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPolicy}>
            Privacy Policy
          </Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "40%",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#4d5151" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center", color: "#4d5151" }}>
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "#4d5151" }} />
        </View>
        <Text style={styles.signUp}>
          Already have an account?{" "}
          <Text
            onPress={() => navigation.replace("Login")}
            style={styles.underline}
          >
            Log In
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}
//<Btn onClick={() => navigation.replace("Login")} title="Login" style={{ width: "48%", backgroundColor: "#3B71F3" }} />
