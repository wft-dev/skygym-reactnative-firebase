import firebase from '@firebase/app';
import '@firebase/auth';
import "firebase/firestore"
import { API_KEY,AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, MESSAGE_SENDER_ID, APP_ID, STORAGE_BUCKET  } from '@env'
const config = {
  apiKey: "AIzaSyBCwop34bkyiRUnCdjtJhY30di72wooLC8",
  authDomain: "gym-app-68df8.firebaseapp.com",
  databaseURL: "https://gym-app-68df8.firebaseio.com",
  projectId: "gym-app-68df8",
  storageBucket: "gym-app-68df8.appspot.com",
  messagingSenderId: "38792183749",
  appId: "1:38792183749:web:e140042556368a06c815ac",
  measurementId: "G-NW4KLEKQ9F"
};

let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(config);
      instance = this;
    }
    return instance;
  }
}


// var admin = require('firebase-admin');
// export const  app = admin.initializeApp();

// const firebaseService = new FirebaseService().app;
 //const db =firebase.firestore()
const Firebase = firebase.initializeApp(config)
export const db = firebase.firestore()
export default Firebase
