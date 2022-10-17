import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import COLORS from "./COLOR";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Btn from "../components/Btn";
import { ContextValue } from "../ContextApi/ContextCreate";

const image = require("./images/avatar.png");

export default function LeaveDetails({ navigation }) {
  const [leaveDetails, setLeaveDetails] = useState({});

  const [valueTest , setValueTest]=useState(false)

  const { dispatch, user } = useContext(ContextValue);

  const getLeaveDetails = async () => {
    try {
      const res = await axios.get(
        `http://192.168.5.34:5001/employees/${user.id}`
      );
      // console.log("get req in leave details", res);
      res && setLeaveDetails(res.data);
    } catch (error) {
      console.log(" Errors while get list of user leaves", error);
    }
  };

  useEffect(() => {
    getLeaveDetails();
  }, [valueTest]);

  // console.log("Leaves of user", leaveDetails.Leaves);
  // console.log(" User in leave details", user.id);
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.linearStart, COLORS.linearEnd]}
    >
      <SafeAreaView style={{paddingHorizontal:7}}>
        <Text style={styles.headerText}>Leave Details</Text>
        <View style={styles.headercontainer}>
          <Image source={image} style={styles.img} />
          <View>
            <Text style={styles.text}> {leaveDetails.firstname}</Text>
            <Text style={{ color: COLORS.textColor, marginLeft: 30 }}>
              {" "}
              Designation: {leaveDetails.designation}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontWeight: "bold", color: COLORS.textColor }}>
            {" "}
            Leave Types
          </Text>
          <Text style={{ fontWeight: "bold", color: COLORS.textColor }}>
            {" "}
            Status
          </Text>
        </View>
        <ScrollView>
          {leaveDetails.Leaves &&
            leaveDetails.Leaves.map((i, d) => {
              // console.log(" Data", i.leaveType);

              return (
                <Pressable
                  onPress={() => {
                    var date = new Date(i.from).toLocaleDateString();
                    var dateEnd = new Date(i.to).toLocaleDateString();
                    navigation.navigate("LeaveListing", {leaveType : i.leaveType, date: date, dateEnd: dateEnd , status : i.status, reason : i.reason }) 
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.leaveListColor,
                      padding: 8, 
                      margin: 2,
                      borderRadius: 10,
                      elevation: 5,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text>{i.leaveType}</Text>
                    <Text>{i.status}</Text>
                  </View>
                </Pressable>
              );
            })}
          <Text
            style={{
              color: COLORS.textColor,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Contact Detail: {leaveDetails.phone}
          </Text>

          <Btn
            title="Apply For Leave"
            style={styles.button}
            //valueSent will rcv a value from child
            // valufunc will send a function from here to the child that will take a value from child component
            onClick={() => navigation.navigate("ApplyForLeave", {valuefunc : setValueTest , valueSent : valueTest})}
          />
          
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: COLORS.textColor,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  headercontainer: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
  },
  text: {
    color: COLORS.textColor,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginBottom: 5,
  },
  buttonStyle: {
    backgroundColor: COLORS.buttonColor,
  },
  textStyle: {
    color: COLORS.textColor,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    fontSize: 20,
  },
  button: {
    width: "60%",
    backgroundColor: "#e0c222",
    marginHorizontal: "17%",
  },

});
