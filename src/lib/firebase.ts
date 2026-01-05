import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBBZqKtN2PKeArZwSbJX6lWWcOPa9iZnk",
  authDomain: "numra-ae.firebaseapp.com",
  projectId: "numra-ae",
  storageBucket: "numra-ae.firebasestorage.app",
  messagingSenderId: "722056318343",
  appId: "1:722056318343:web:59f1603b4bfa7cd60ed722",
  measurementId: "G-CD4630CKFV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
