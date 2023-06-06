import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import { getDatabase, set, ref, child, get, DataSnapshot, push } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATKoL8mZlFfIO6xa2ldKWbO7_j_KE-LXc",
  authDomain: "tutorial-857a1.firebaseapp.com",
  projectId: "tutorial-857a1",
  storageBucket: "tutorial-857a1.appspot.com",
  messagingSenderId: "345207898338",
  appId: "1:345207898338:web:499b06c912da7b8b465ebb",
  measurementId: "G-H87W7WLZ62",
  databaseURL: 'https://tutorial-857a1-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'gs://tutorial-857a1.appspot.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//authentication
const auth = getAuth()
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({prompt: 'select_account'})

//firestore
const database = getDatabase(app);
export const addNewUser = (data) => {
  const random = () => {
    return Math.floor(Math.random() * 10)
  }
  set(ref(database, 'user/' + data.uid ), {
    ...data,
    tagNumber : `${random()}${random()}${random()}${random()}`
  })
  // const userRef = ref(database, 'user/')
  // const newUser = push(userRef, {
  //   ...data,
  //   tagNumber : `${random()}${random()}${random()}${random()}`
  // })
}


export const getUserByUID = async (uid) => {
  const getUser = () => {
    return new Promise((resolve, reject) => {
      get(child(ref(database), `user/${uid}`))
      .then(snapshot => {
        if(snapshot.exists()) {
          resolve(snapshot.val())
        }
      })
    })
  }
  const user = await getUser()
  return user
}



export { auth, facebookProvider, googleProvider }