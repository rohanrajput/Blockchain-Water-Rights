import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { collection, addDoc } from 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAGnpcdMduKsMPc1OaiyE7nRV2uwUjX_iE",
    authDomain: "blockchain-dapp-c94f9.firebaseapp.com",
    projectId: "blockchain-dapp-c94f9",
    storageBucket: "blockchain-dapp-c94f9.appspot.com",
    messagingSenderId: "131031663232",
    appId: "1:131031663232:web:3e42323cb9d0c5d75a9c65",
    measurementId: "G-XZ17HN0LYP"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;