
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGMmZmUh3PTKsYx9MeALOeMj7pbVM9nLo",
    authDomain: "netflix-w.firebaseapp.com",
    projectId: "netflix-w",
    storageBucket: "netflix-w.appspot.com",
    messagingSenderId: "49876434330",
    appId: "1:49876434330:web:9a3afdad0f98b57e548e23"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }