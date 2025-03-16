import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv_KBQlIjPMiWEhayL4RQ2nqyIGlAnw_M",
  authDomain: "customer-help-5f2b0.firebaseapp.com",
  projectId: "customer-help-5f2b0",
  storageBucket: "customer-help-5f2b0.firebasestorage.app",
  messagingSenderId: "1057127796353",
  appId: "1:1057127796353:web:5c340e9e3d3df399950780",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const userSignOut = () => signOut(auth);