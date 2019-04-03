import firebase from "firebase/app";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyDbIPe9sh-XfL48MP8HdUuEo8Zc25OR8EI",
  authDomain: "projecteagle-478b7.firebaseapp.com",
  databaseURL: "https://projecteagle-478b7.firebaseio.com",
  projectId: "projecteagle-478b7",
  storageBucket: "projecteagle-478b7.appspot.com",
  messagingSenderId: "401394909346"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
