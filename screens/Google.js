// import React, { useState, useEffect } from 'react'
// import { Text, View } from 'react-native'
// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import "firebase/auth";
// import firebase from "firebase/app";
// import Button from '../components/Btn';
// import {GoogleSignin, GoogleSigninButton} from 'expo-auth-session';
// import 'expo-auth-session';
// export default function Google() {
//     const [initializing, setInitializing] = useState(true);
//     const [user, setUser] = useState('');
//     GoogleSignin.configure({
//         webClientId: '963741666684-gfl2387rhvv1rcptgas9ga49h5s1psf1.apps.googleusercontent.com',
//       });
//       function onAuthStateChanged(user){
//         setUser(user);
//         if(initializing) setInitializing(false);
//       }
//       useEffect(()=>{
//         const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber;
//       },[]);
//     const onGoogleButtonPress=async ()=> {
//         // Get the users ID token
//         const { idToken } = await GoogleSignin.signIn();
      
//         // Create a Google credential with the token
//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
//         // Sign-in the user with the credential
//         //return auth().signInWithCredential(googleCredential);
//         const user_sign_in = auth().signInWithCredential(googleCredential);
//         user_sign_in.then((user)=>{
//             console.log(user);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
//       }
//       const signOut =async()=>{
//         try{
//             await GoogleSignin.revokeAccess();
//             await auth().signOut();
//         } catch (error){
//             console.error(error);
//         }
//       }
//       if (initializing) return null;
// if (!user){
//     return (
//       <View>
//         <Text> textInComponent </Text>
//         <GoogleSigninButton 
//             style={{width:300,height:65,marginTop:10}}
//             onPress={onGoogleButtonPress}
//         />
//       </View>
//     )
// }
// return(
//     <View>
//         <View style={{marginTop:100, alignItems:'center'}}>
//             <Text style={style.text}>welcome, {user.displayName}</Text>
//        <Button title='sign out' onPress={signOut}/>
//         </View>
//     </View>
// )
//   }
//   Naila, 12:30 PM
//   import {
//     Image,
//     Modal,
//     Pressable,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
//   } from 'react-native';
//   import React, {useEffect, useState} from 'react';
//   import {SafeAreaView} from 'react-native-safe-area-context';
//   import Foundation from 'react-native-vector-icons/Foundation';
//   import SearchBar from 'react-native-dynamic-search-bar';
//   import DatePicker from 'react-native-date-picker';
//   import moment from 'moment';
//   import axios from 'axios';
//   import COLORS from '../constants/Colors';
  
//   export default function Projects({navigation}) {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [details, setDetails] = useState([]);
//     const [projectName, setProjectName] = useState('');
//     const [projectManager, setProjectManager] = useState('');
//     const [projectDetail, setProjectDetail] = useState('');
//     const [workingDays, setWorkingDays] = useState('');
//     const [projects, setProjects] = useState([]);
//     const [users, setUsers] = useState([]);
  
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [open, setOpen] = useState(false);
  
//     const [userId, setuserId] = useState();
  
//     const [isVisible, setVisible] = useState(false);
  
//     const startdate = moment(details.projectStartDate).format('DD/MM/YYYY');
//     const enddate = moment(details.projectStartDate).format('DD/MM/YYYY');
  
//     var projectData = {
//       projectname: projectName,
//       description: projectDetail,
//       projectStartDate: startDate,
//       projectEndDate: endDate,
//       allocatedWorkingDays: workingDays,
//       projectmanager: projectManager,
//     };
  
//     const projectSubmitHandler = async () => {
//       try {
//         const res = await axios.post(
//           'http://192.168.5.5:5000/projects/addproject',
//           projectData,
//         );
//         // console.log(' responce of projects', res);
//         res && setModalVisible(!modalVisible);
//         navigation.navigate('Projects');
//       } catch (error) {
//         console.log(' Errors while adding projects', error);
//       }
//     };
  
//     const getProjectDetails = async () => {
//       try {
//         const res = await axios.get(
//           'http://192.168.5.5:5000/projects/allprojects',
//         );
  
//         res && setProjects(res.data.get);
//       } catch (error) {
//         console.log('Errors while getting projects', error);
//       }
//     };
  
//     const toggleModal = () => {
//       setVisible(!isVisible);
//     };
  
//     useEffect(() => {
//       getProjectDetails();
//       // getUsers();
//     }, []);
  
//     // console.log(' Details of user project will be as', details);
//     return (
//       <SafeAreaView>
//         {/ Start of Modal add project /}
//         <View style={styles.centeredView}>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               setModalVisible(!modalVisible);
//             }}>
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 <Text style={styles.modalTitleText}>Add another Project</Text>
//                 <TextInput
//                   style={styles.inputData}
//                   value={projectName}
//                   placeholder="Project name"
//                   onChangeText={text => setProjectName(text)}
//                 />
//                 <TextInput
//                   style={styles.inputData}
//                   value={projectManager}
//                   placeholder="Project Manager"
//                   onChangeText={text => setProjectManager(text)}
//                 />
//                 <View>
//                   <View style={{flexDirection: 'row', marginBottom: 5}}>
//                     <Text
//                       style={[
//                         styles.modalText,
//                         {fontWeight: 'bold', marginRight: 10},
//                       ]}>
//                       Start Date :
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         borderColor: COLORS.grey,
//                         borderWidth: 1,
//                         borderRadius: 2,
//                         paddingHorizontal: 10,
//                         marginLeft: 42,
//                       }}>
//                       <Text style={styles.modalText}>
//                         {' '}
//                         {startDate.toLocaleDateString()}
//                         {'     '}
//                       </Text>
//                       <Foundation
//                         name="calendar"
//                         size={18}
//                         onPress={() => setOpen(true)}
//                       />
//                       <DatePicker
//                         modal
//                         open={open}
//                         date={startDate}
//                         onConfirm={date => {
//                           setOpen(false);
//                           setStartDate(date);
//                           // console.log(' date picker', date);
//                         }}
//                         onCancel={() => {
//                           setOpen(false);
//                         }}
//                       />
//                     </View>
//                   </View>
//                   <View style={{flexDirection: 'row'}}>
//                     <Text
//                       style={[
//                         styles.modalText,
//                         {fontWeight: 'bold', marginRight: 10},
//                       ]}>
//                       Estimated End Date :
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         borderColor: COLORS.grey,
//                         borderWidth: 1,
//                         borderRadius: 2,
//                         paddingHorizontal: 10,
//                       }}>
//                       <Text style={styles.modalText}>
//                         {' '}
//                         {endDate.toLocaleDateString()}
//                         {'     '}
//                       </Text>
//                       <Foundation
//                         name="calendar"
//                         size={18}
//                         onPress={() => setOpen(true)}
//                       />
//                     </View>
//                     <DatePicker
//                       modal
//                       open={open}
//                       date={endDate}
//                       onConfirm={date => {
//                         setOpen(false);
//                         setEndDate(date);
//                         // console.log(' date picker', date);
//                       }}
//                       onCancel={() => {
//                         setOpen(false);
//                       }}
//                     />
//                   </View>
//                 </View>
//                 <TextInput
//                   style={styles.inputData}
//                   value={workingDays}
//                   placeholder="Allocated working days"
//                   onChangeText={text => setWorkingDays(text)}
//                 />
//                 <TextInput
//                   style={styles.inputText}
//                   value={projectDetail}
//                   placeholder="Project Description"
//                   onChangeText={text => setProjectDetail(text)}
//                 />
//                 <Pressable
//                   style={[styles.button, styles.buttonClose]}
//                   onPress={() => setModalVisible(!modalVisible)}>
//                   <Text style={styles.textStyle} onPress={projectSubmitHandler}>
//                     Save
//                   </Text>
//                 </Pressable>
//               </View>
//             </View>
//           </Modal>
//         </View>
//         {/ End of Modal /}
  
//         {/ Start of Component Project's UI /}
  
//         <View style={styles.headingContainer}>
//           <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>
//             Projects
//           </Text>
//         </View>
//         <SearchBar
//           style={styles.input}
//           placeholder="Search here"
//           onPress={() => alert('onPress')}
//           onChangeText={text => console.log(text)}
//         />
//         <Pressable
//           style={[styles.button, styles.buttonOpen]}
//           onPress={() => setModalVisible(true)}>
//           <Text
//             style={{
//               color: COLORS.textcolor,
//               textAlign: 'center',
//               fontWeight: 'bold',
//             }}>
//             {' '}
//             Add new project{' '}
//           </Text>
//         </Pressable>
//         {projects.map((d, i) => {
//           const startdate = moment(d.projectStartDate).format('DD/MM/YYYY');
//           const enddate = moment(d.projectStartDate).format('DD/MM/YYYY');
//           return (
//             <View key={i}>
//               <View
//                 style={{
//                   marginBottom: 10,
//                   marginLeft: 10,
//                   borderBottomColor: COLORS.grey,
//                   borderBottomWidth: 1,
//                 }}>
//                 <Pressable
//                   onPress={() => {
//                     setDetails(d);
//                     setVisible(true);
//                   }}>
//                   <Text style={{fontWeight: 'bold'}}>
//                     Project: {d.projectname}
//                   </Text>
//                   <Text>Start Date: {startdate}</Text>
//                   <Text>End Date: {enddate}</Text>
//                   <Text>Description: {d.description}</Text>
//                 </Pressable>
//               </View>
//             </View>
//           );
//         })}
//         {/ Modal View for project details /}
//         {isVisible && (
//           <View style={styles.centeredView}>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               isVisible={modalVisible}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <Text style={styles.modalTitleText}>Project Details</Text>
//                   <View style={{marginBottom: 10, marginLeft: 10}}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                       }}>
//                       <Text style={{fontWeight: 'bold', marginBottom: 10}}>
//                         Project: {details.projectname}{' '}
//                       </Text>
//                       <Image
//                         style={styles.tinyLogo}
//                         source={{
//                           uri: 'https://picsum.photos/200/300',
//                         }}
//                       />
//                     </View>
//                     <Text>Project Manager: {details.projectmanager} </Text>
//                     <Text>Start Date: {startdate} </Text>
//                     <Text>End Date: {enddate} </Text>
//                     <Text>Details: {details.description} </Text>
//                   </View>
//                   <Pressable
//                     style={[styles.button, styles.buttonClose]}
//                     onPress={() => setVisible(!isVisible)}>
//                     <Text style={styles.textStyle} onPress={toggleModal}>
//                       Close
//                     </Text>
//                   </Pressable>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         )}
//       </SafeAreaView>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     headingContainer: {
//       marginBottom: 20,
//     },
//     centeredView: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 22,
//     },
//     button: {
//       borderRadius: 20,
//       padding: 10,
//       elevation: 2,
//     },
//     buttonOpen: {
//       backgroundColor: COLORS.buttoncolor,
//     },
//     modalView: {
//       margin: 20,
//       backgroundColor: 'white',
//       borderRadius: 20,
//       padding: 35,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     buttonClose: {
//       backgroundColor: COLORS.buttoncolor,
//     },
//     textStyle: {
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     modalTitleText: {
//       marginBottom: 15,
//       textAlign: 'center',
//       fontWeight: 'bold',
//       fontSize: 20,
//       marginTop: -20,
//     },
//     modalText: {
//       fontSize: 10,
//     },
//     input: {
//       borderColor: COLORS.grey,
//       borderWidth: 1,
//       marginTop: 10,
//       paddingHorizontal: 70,
//       borderRadius: 5,
//       marginBottom: 10,
//     },
//     inputData: {
//       borderColor: COLORS.grey,
//       borderWidth: 1,
//       marginTop: 10,
//       paddingHorizontal: '40%',
//       borderRadius: 5,
//       marginBottom: 5,
//     },
//     inputText: {
//       marginTop: 2,
//       marginBottom: 10,
//       borderWidth: 1,
//       borderColor: COLORS.grey,
//       borderRadius: 5,
//       paddingHorizontal: '40%',
//       padding: 20,
//     },
//     picker: {
//       width: 200,
//       height: 30,
//       borderColor: COLORS.grey,
//       borderWidth: 1,
//       marginTop: -15,
//     },
//     picker: {
//       width: 200,
//       height: 30,
//       borderColor: COLORS.grey,
//       borderWidth: 1,
//       marginTop: -15,
//     },
//     tinyLogo: {
//       width: 50,
//       height: 50,
//       borderRadius: 50,
//     },
//   });