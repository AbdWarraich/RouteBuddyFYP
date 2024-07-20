// firebaseConfig.js
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCblA_TKBtI_TsZr2l6xfuc2Z3FuDN6H04",
  authDomain: "route-budy-a5648.firebaseapp.com",
  databaseURL: "https://route-budy-a5648-default-rtdb.firebaseio.com",
  projectId: "route-budy-a5648",
  storageBucket: "route-budy-a5648.appspot.com",
  messagingSenderId: "523567207446",
  appId: "1:523567207446:web:98789b5dc7920515285137"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = getStorage();

export { firebase, storage };

