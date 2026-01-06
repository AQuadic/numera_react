import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
export const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
