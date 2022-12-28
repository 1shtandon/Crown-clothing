// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// importing auth library

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

// import the firestore database library
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
}
    from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiSTRTpOd7YRibHse6U-Bx67IcedJ6ru4",
    authDomain: "clothing-project-db-a8dd2.firebaseapp.com",
    projectId: "clothing-project-db-a8dd2",
    storageBucket: "clothing-project-db-a8dd2.appspot.com",
    messagingSenderId: "139779141957",
    appId: "1:139779141957:web:aba960aea4d19b8e734e2c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// creating provider with custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters(
    {
        prompt: "select_account"
    }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// creating a firestore database
export const db = getFirestore();

// creating a function to store user data in firestore database
// note that the doc takes 3 arguments : database , collections , and the identifier

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {

    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);
    const userDocSnapshot = await getDoc(userDocRef);
    console.log(userDocSnapshot);
    console.log(userDocSnapshot.exists());

    // now we check if the user exists in the database or not and if not we create a new user

    if (!userDocSnapshot.exists()) {
        const { displayName, email } = userAuth;
        // date at which created
        const createdAt = new Date();
        // now try and catch for error handling
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log("Error creating user", error.message);
        }
    }
    return userDocRef;
}

// creating a function to create a user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)
        return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

// creating a function to let a user signin with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)
        return;

    return await signInWithEmailAndPassword(auth, email, password);
}

// function that signs out the user
export const signOutUser = async () => await signOut(auth);
 
// using the observer to check if the user is signed in or not
export const onAuthStateChangeListener = (callback) => 
    onAuthStateChanged(auth, callback);