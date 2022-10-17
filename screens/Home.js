import { Text, View, StyleSheet, Image, Button, pla } from "react-native";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import "firebase/firestore";
import * as Location from "expo-location";
import { useRef } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ContextValue } from "../ContextApi/ContextCreate";
import axios from "axios";
//import * as ImagePicker from 'expo-image-picker';
//import { LinearGradient } from "expo-linear-gradient";
//import { Card } from 'react-native-elements';
import TextBox from "../components/TextBox";
// import { ContinousBaseGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gesture";
const styles = StyleSheet.create({
  view: {
    //flex: 1,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    height: 900,
  },
  date: {
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 30,
    color: "green",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 20,
    marginTop: 20,
    marginVertical: "20%",
  },
  checkIn: {
    width: "30%",
    marginVertical: 70,
    backgroundColor: "green",
    marginTop: 40,
    height: 42,
    width: "92%",
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: "#3B71F3",
    justifyContent: "center",
    alignItems: "center",
  },
  checkOUt: {
    width: "30%",
    marginVertical: 70,
    backgroundColor: "#ff0000",
    marginTop: 40,
    height: 42,
    width: "92%",
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: "#3B71F3",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
    fontStyle: "italic",
    marginVertical: 40,
  },
  logo: {
    width: "60%",
    maxWidth: 300,
    maxHeight: 250,
    marginVertical: "2%",
    marginTop: 80,
  },
  log: {
    maxWidth: 300,
    maxHeight: 250,
    marginTop: "35%",
    backgroundColor: "#e0c222",
  },
  profile: {
    marginTop: "80%",
  },
  // logo:{width: 250,
  // //maxWidth: 300,
  // //maxHeight: 250,
  // height: 250,
  // marginVertical: "10%",
  // borderRadius: 240 / 2,},
  card: {
    alignItems: "center",
    barder: 1,
    borderColor: "black",
    backgroundColor: "white",
    width: 350,
    height: 400,
    borderRadius: 10,
    marginTop: 2,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
//code for store data in firestore
export default function Home({ navigation, email }) {
  const { dispatch, user } = useContext(ContextValue);

  const [checkIn, setCheckIn] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [latitudeState, setLatitude]=useState('');
  const [longitudeState,setLongitude]=useState('');

  const [location, setLocation] = useState(null);


  const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const createUserProfileDocument = async (user, additionalData) => {
    // if (!user) return;
    console.log("value of useremail", userEmail);
    const docRef = firestore.doc(`users/${userEmail}`);
    const docSnapshot = await docRef.get();
    //console.log("docsnapshot", docSnapshot.data());
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    {
      const createdAt = new Date();
      try {
        await docRef.set(
          {
            createdAt: timestamp,
            CheckIn: currentTime,
          },
          { merge: true }
        );
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }

    return docRef;
  };

  const createUserProfileDocumentOut = async (user, additionalData) => {
    //if (!user) return;
    console.log("value of useremail", userEmail);

    const docRef = firestore.doc(`users/${userEmail}`);
    const docSnapshot = await docRef.get();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    console.log(timestamp);
    {
      const createdAt = new Date();
      try {
        await docRef.set(
          {
            createdAt: timestamp,
            CheckOut: currentCTime,
          },
          { merge: true }
        );
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }

    return docRef;
  };
  //code for maps
  async function GetCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync(
        {
          latitude,
          longitude,
        },
        console.log("current",latitude, longitude)
      );

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.city}`;

        alert(address);
      }
    }
  }
  // useEffect(() => {
  //   Location.getCurrentPositionAsync().then((t)=>{
  //     setLatitude(t.coords.latitude);
  //     setLongitude(t.coords.longitude)
  //     console.log(t.coords)
  //   });

  //  }, []);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  //code for time

  let newTime = new Date().toLocaleTimeString("en-US");

  const [currentTime, setCurrentTime] = useState(newTime);
  const UpdateTime = () => {
    newTime = new Date().toLocaleTimeString("en-US");

    setCurrentTime(newTime);

    alert("Your Are Successfully Checked In");

    //setCheckIn(newTime);
  };
  let newCTime = new Date().toLocaleTimeString("en-US");
  const [currentCTime, setCurrentCTime] = useState(newCTime);
  const UpdateCTime = () => {
    newTime = new Date().toLocaleTimeString("en-US");

    setCurrentCTime(newTime);

    alert("You Are Successfully Checked Out ");
  };
  function name() {
    console.log("hello");
  }
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const todoRef = firebase.firestore().collection("newData");
  const [addData, setAddData] = useState("");

  // const addField = () => {
  //   if (addData && addData.length > 0) {
  //     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //     const data = {
  //       Name: addData,
  //       createdAt: timestamp,
  //     };
  //     todoRef
  //       .add(data)
  //       .then(() => {
  //         setAddData("");
  //         //Keyboard.dismiss();
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   }
  // };
  const disabledHandler = () => {
    setDisabled(true);
  };
  const isDisabledHandler = () => {
    setIsDisabled(true);
  };
  console.log(disabled);
  const Time = {
    In: currentTime,
    out: currentCTime,
    date: new Date(),
    employeeId: user.id,
    //   date:
  };
  console.log(user.id);
  const timeSubmitHandler = async () => {
    console.log("Time", Time);
    try {
      const res = await axios.post(
        "http://192.168.5.34:5001/userattendance",
        Time
      );
    } catch (error) {
      console.log(error);
    }
  };



 
    return (
      //<LinearGradient colors={['#def2f7', '#98b6df', '#7891c2']} style={styles.linearGradient}>
      <View style={styles.view}>
        <Image source={require("../assets/logo4.jpg")} style={styles.logo} />
        <Text style={styles.text}>Employee Attendance Time</Text>
        <View style={styles.card}>
          {/* <TextBox
            placeholder="Enter Your Name"
            onChangeText={(Name) => setAddData(Name)}
            value={addData}
          /> */}

          <Text style={styles.Text}>
            CheckIn Time: <Text style={styles.date}>{currentTime}</Text>
          </Text>
          <Button
            title="Check In "
            disabled={disabled}
            onPress={() => {
              console.log("tofixed", Math.trunc(location.coords.latitude*100)/100)
              console.log("tofixed", Math.trunc(location.coords.longitude*100)/100)
              if(Math.trunc(location.coords.latitude*100)/100 == 31.48 && Math.trunc(location.coords.longitude*100)/100==74.30 ){
              AsyncStorage.getItem("userName").then((v) => setUserEmail(v));

              UpdateTime();
              timeSubmitHandler();
              // createUserProfileDocument();
              GetCurrentLocation();
              disabledHandler();
              console.log("after", disabled);}
              else{
                alert("not in location")
              }
            }}
            style={styles.checkIn}
          />
          <Text style={styles.Text}>
            CheckOut Time:<Text style={styles.date}>{currentCTime}</Text>
          </Text>
          <Button
            title="Check Out "
            disabled={isDisabled}
            onPress={() => {
              console.log("tofixed", Math.trunc(location.coords.latitude*100)/100)
              console.log("tofixed", Math.trunc(location.coords.longitude*100)/100)
              if(Math.trunc(location.coords.latitude*100)/100 == 31.48 && Math.trunc(location.coords.longitude*100)/100==74.30 ){
              AsyncStorage.getItem("userName").then((v) => setUserEmail(v));

              UpdateCTime();
              timeSubmitHandler();
              // createUserProfileDocumentOut();
              GetCurrentLocation();
              isDisabledHandler();}
              else{
                alert("You are not in location")
              }
            }}
            style={styles.checkOUt}
          />
        </View>
        {/* <Btn title='select' onClick={()=>navigation.navigate('Select')}/> */}
        <Btn
          title="Logout"
          style={{ width: "75%", backgroundColor: "#e0c222", marginTop: "5%" }}
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            navigation.navigate("Login");
          }}
        />
      </View>
      //</LinearGradient>
    );
  
}
