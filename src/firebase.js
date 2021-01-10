import * as firebase from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyAeSnKD6WmJ8L5e6DBt1hOQQgQMEYCCqaU",
  authDomain: "sburridge-e0b43.firebaseapp.com",
  databaseURL: "https://sburridge-e0b43.firebaseio.com",
  projectId: "sburridge-e0b43",
  storageBucket: "gs://sburridge-e0b43.appspot.com",
  messagingSenderId: "1068042419023",
  appId: "1:1068042419023:web:0c222a57f457266cc5633a",
  measurementId: "G-KCJSVVKB16"
};

export default firebase
  ? firebase.default.initializeApp(firebaseConfig)
  : firebase.default.app();

//firebase.default.initializeApp(firebaseConfig);

// utils
const db = firebase.default.firestore();
const auth = firebase.default.auth();
const storageCollection = firebase.default.storage();
const provider = new firebase.default.auth.GoogleAuthProvider();

// collection references
const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// storage reference

// export utils/refs
export {
  db,
  auth,
  provider,
  usersCollection,
  songsCollection,
  commentsCollection,
  likesCollection,
  storageCollection
};
