import firebase from 'firebase/app';
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDlYiswKefk0jNYe5PLRO2cvo7AYQKuqBI",
  authDomain: "delivr-72594.firebaseapp.com",
  databaseURL: "https://delivr-72594.firebaseio.com",
  projectId: "delivr-72594",
  storageBucket: "delivr-72594.appspot.com",
  messagingSenderId: "893853092769",
  appId: "1:893853092769:web:6a078e476f648c8353d9e0",
  measurementId: "G-0P2B237J8P"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };