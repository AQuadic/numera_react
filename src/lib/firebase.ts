import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from "firebase/messaging";

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
    }
  } catch (err) {
    // swallow token retrieval errors
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

/**
 * Delete the current FCM token (client-side) and remove any local storage
 * markers related to FCM registration.
 */
export const deleteFcmToken = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      try {
        await deleteToken(messaging);
      } catch (err) {
        console.warn("Failed to delete FCM token via SDK:", err);
      }
    }
  } catch (err) {
    console.warn("Could not retrieve FCM token before deletion:", err);
  }

  // Remove any localStorage markers related to FCM
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("fcm_registered_")) {
        localStorage.removeItem(key);
      }
    });
  } catch (err) {
    // ignore
  }
};
