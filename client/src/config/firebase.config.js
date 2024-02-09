import {getApp,getApps,initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGE_ID,
//     appId:process.env.REACT_APP_FIREBASE_APP_ID,
//    // measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID
//   };

const firebaseConfig = {
    apiKey: "AIzaSyBoexcVLsachVTptDB_36BdzcnFEq4WaAI",
    authDomain: "t-music-be993.firebaseapp.com",
    projectId: "t-music-be993",
    storageBucket: "t-music-be993.appspot.com",
    messagingSenderId: "650972389603",
    appId: "1:650972389603:web:db9a114d4dbf0f1053a5d6",
    measurementId: "G-009Z6FC0RW"
  };
  

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
  const storage = getStorage(app)

  export {app,storage}