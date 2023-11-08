import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAHQn2MpuMTl45NrIBQZ8ZMP8n02-71uAo",
    authDomain: "olx-clone-b21ac.firebaseapp.com",
    projectId: "olx-clone-b21ac",
    storageBucket: "olx-clone-b21ac.appspot.com",
    messagingSenderId: "329014925507",
    appId: "1:329014925507:web:4292c852bc90641f32ea76",
    measurementId: "G-5Y2DWHKXWL",
   databaseURL: "https://olx-clone-b21ac-default-rtdb.firebaseio.com/"

  };

  export const firebase = initializeApp(firebaseConfig);
  export const firestore = getFirestore(firebase);