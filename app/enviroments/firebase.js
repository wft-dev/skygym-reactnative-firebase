import firebase from '@firebase/app';
import '@firebase/auth';
import "firebase/firestore"
import { API_KEY,AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, MESSAGE_SENDER_ID, APP_ID, STORAGE_BUCKET , MEASUREMENT_ID } from '@env'
const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
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
