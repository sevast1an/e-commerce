import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDLKIUrz83-f7gKyEa3W48ovQ7-yk6I2q0",
  authDomain: "e-commerce-db-7d679.firebaseapp.com",
  databaseURL: "https://e-commerce-db-7d679.firebaseio.com",
  projectId: "e-commerce-db-7d679",
  storageBucket: "e-commerce-db-7d679.appspot.com",
  messagingSenderId: "685054602772",
  appId: "1:685054602772:web:e0bd511a93e401a329c101",
  measurementId: "G-K0N7VXZ7QK"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
