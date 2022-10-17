import { StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import COLORS from "./COLOR";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import Foundation from "react-native-vector-icons/Foundation";
import Btn from "../components/Btn";
import axios from "axios";
import { ContextValue } from "../ContextApi/ContextCreate";
import * as DocumentPicker from "expo-document-picker";

export default function ApplyForLeave({ route, navigation }) {
  const { dispatch, user } = useContext(ContextValue);
  const { valuefunc, valueSent } = route.params;

  const [multipleFile, setMultipleFile] = useState([]);

  const data = [
    { leaveType: "Sick Leave", value: "1" },
    { leaveType: "Casual Leave", value: "2" },
    { leaveType: "Paternity ", value: "3" },
    { leaveType: "Religious ", value: "4" },
    { leaveType: "Maternity ", value: "5" },
    { leaveType: "Unpaid Leave", value: "6" },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [dateStart, setDateStart] = useState(new Date(1528578000000));
  const [dateEnd, setDateEnd] = useState(new Date(1528578000000));
  const [mode, setMode] = useState("date");
  const [modeEnd, setModeEnd] = useState("date");
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [reqLeaveDays, setReqLeaveDays] = useState();
  const [reason, setReason] = useState();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[styles.label, isFocus && { color: COLORS.buttonColor }]}
        ></Text>
      );
    }
    return null;
  };

  //start date of leave
  const onChangeDateStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateStart(currentDate);
  };

  //end date of leave
  const onChangeDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowEnd(false);
    setDateEnd(currentDate);
  };

  //start date mode of leave
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //end date mode of leave
  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  //start leave date picker
  const showDatepicker = () => {
    // console.log(" Msg");
    showMode("date");
  };

  //end leave date picker
  const showDatepickerEnd = () => {
    // console.log(" Msg");
    showModeEnd("date");
  };

  const postData = {
    leaveType: value,
    from: dateStart,
    to: dateEnd,
    // attachment: multipleFile,
    reason: reason,
    employee: user.id,
  };

  const leaveSubmitHandler = async () => {
    try {
      const res = await axios.post(
        "http://192.168.5.34:5001/leaverequest/addrequest",
        postData
      );
      // console.log(" responce of data", res);
      // valuefunc is a function to set value here in child component for parent
      //so that parent component may render to update new posted data automatically without relaod it
      valuefunc(!valueSent);
      res && navigation.navigate("LeaveDetails");
    } catch (error) {
      console.log(" Errors while requesting leave", error);
    }
  };

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.getDocumentAsync({});
      console.log(" Result", results);
      const formData = new FormData();
      formData.append("leaveType", value);
      formData.append("from", dateStart);
      formData.append("to", dateEnd);
      formData.append("reason", reason);
      formData.append("employee", user.id);
      formData.append("attachment", results);
      console.log("formDataformData", formData);
      const res = await axios({
        method: "post",
        url: "http://192.168.5.18:5001/leaverequest/addrequest",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Res", res);
      // const dataReceived = await res.JSON();
      // console.log(" file uploaded", dataReceived);
      // setMultipleFile(dataReceived);
    } catch (err) {
      console.log(" Error while fetching file", err);
    }
  };

  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((dateStart - dateEnd) / oneDay) + 1);
  // console.log(" USer in leave req", user.id);
  // console.log(" Data Start", dateStart);
  // console.log("Date End", diffDays);
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.linearStart, COLORS.linearEnd]}
    >
      <Text style={styles.headerText}>Leave Requests</Text>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Leave Type</Text>
        </View>
        <View style={styles.bg}>
          {renderLabel()}
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: COLORS.buttonColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="leaveType"
            valueField="leaveType"
            placeholder={!isFocus ? "Select leave" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.leaveType);
              setIsFocus(!isFocus);
              // console.log(" focus in dropdown", isFocus);
            }}
          />
        </View>
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>From Date</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
          }}
        >
          <Text style={styles.calendarStyle}>
            {" "}
            {dateStart.toLocaleDateString()}
            {"     "}
          </Text>
          <Foundation
            name="calendar"
            size={25}
            color={COLORS.textColor}
            onPress={showDatepicker}
          />
        </View>
        {showEnd && (
          <DateTimePicker
            testID="EndDateTimePicker"
            value={dateStart}
            mode={modeEnd}
            onChange={onChangeDateEnd}
          />
        )}
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>To Date</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
          }}
        >
          <Text style={styles.calendarStyle}>
            {" "}
            {dateEnd.toLocaleDateString()}
            {"     "}
          </Text>
          <Foundation
            name="calendar"
            size={25}
            color={COLORS.textColor}
            onPress={showDatepickerEnd}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateEnd}
            mode={mode}
            onChange={onChangeDateStart}
          />
        )}
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Total Days</Text>
        </View>
        <Text
          value={reqLeaveDays}
          keyboardType={"number-pad"}
          style={{
            paddingHorizontal: 50,
            color: COLORS.textColor,
          }}
          onChangeText={(text) => setReqLeaveDays(text)}
        >
          {diffDays}
        </Text>
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Reason</Text>
        </View>
        <TextInput
          value={reason}
          style={{
            paddingHorizontal: 50,
            color: COLORS.textColor,
          }}
          onChangeText={(text) => setReason(text)}
        ></TextInput>
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Attachment</Text>
        </View>
        <Text style={{ color: COLORS.textColor }} onPress={selectMultipleFile}>
          choose a file...
        </Text>
      </View>
      <View>
        <Btn
          onClick={leaveSubmitHandler}
          style={{
            width: "70%",
            backgroundColor: "#e0c222",
            marginHorizontal: "15%",
            marginTop: "30%",
          }}
          title="Save"
        />
      </View>
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
    marginTop: 20,
    marginBottom: 30,
    marginTop: 60,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.textColor,
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 5,
  },
  bgText: {
    backgroundColor: COLORS.textColor,
    marginRight: 20,
    width: "40%",
    alignItems: "center",
    padding: 7,
  },
  bg: {
    marginRight: 20,
    width: "50%",
    alignItems: "center",
    padding: 5,
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
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
  dropdown: {
    height: 20,
    width: 150,
    paddingHorizontal: 10,
  },
  label: {
    position: "absolute",
    color: COLORS.buttonColor,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.textColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.textColor,
    // paddingHorizontal: 40
    // paddingVertical: -1
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  calendarStyle: {
    fontSize: 20,
    color: COLORS.textColor,
  },
});
