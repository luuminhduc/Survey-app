import firebase from 'firebase';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyBBrJEcLQLr88hh3-A2C94y0WhV6Irum54",
    authDomain: "survey-app-da57b.firebaseapp.com",
    projectId: "survey-app-da57b",
    storageBucket: "survey-app-da57b.appspot.com",
    messagingSenderId: "658410039562",
    appId: "1:658410039562:web:e778ba1063356eef4272f3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

  export default firebase;