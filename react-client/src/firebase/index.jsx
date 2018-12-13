import firebase from 'firebase/app'
import 'firebase/storage'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCf7mbLLhm0X8yI9uqmZ1IkiXfE4qBAlO4",
    authDomain: "homerji-d2145.firebaseapp.com",
    databaseURL: "https://homerji-d2145.firebaseio.com",
    projectId: "homerji-d2145",
    storageBucket: "homerji-d2145.appspot.com",
    messagingSenderId: "226760344125"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {storage , firebase as default }
