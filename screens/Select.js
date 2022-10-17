//import liraries
import React, { Component, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import Btn from "../components/Btn";
import { ContextValue } from "../ContextApi/ContextCreate";

export default function SelectScreen({ navigation }) {
  const { dispatch, user } = useContext(ContextValue);

  return (
    <LinearGradient
      colors={["#014872", "#A0EACF"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>
          Attendance and Leave Management System{" "}
        </Text>
        <View style={styles.direction}>
          <View style={styles.card}>
            <Image
              source={require("../assets/attendance.jpg")}
              style={styles.image}
            />
            <Btn
              title="Attendance"
              style={{ width: "75%", backgroundColor: "#e0c222" }}
              onClick={() => navigation.navigate("Home")}
            />
          </View>
          <View style={styles.card}>
            <Image
              source={require("../assets/leave.jpg")}
              style={styles.image}
            />
            <Btn
              title="Leave"
              style={{ width: "75%", backgroundColor: "#e0c222" }}
              onClick={() => navigation.navigate("LeaveDetails")}
            />
          </View>
        </View>
        <Btn
          title="Logout"
          style={{ width: "75%", backgroundColor: "#e0c222", marginTop: "70%" }}
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            navigation.navigate("Login");
          }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  heading: {
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: "20%",
    fontSize: 17,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  card: {
    alignItems: "center",
    barder: 1,
    borderColor: "black",
    backgroundColor: "#F5F5F5",
    width: 170,
    height: 230,
    borderRadius: 10,
    marginTop: "10%",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: "center",
    marginHorizontal: 22,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: "10%",
    borderRadius: 100 / 2,
  },
  direction: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
