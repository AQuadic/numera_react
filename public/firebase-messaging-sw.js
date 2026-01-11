importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCBBZqKtN2PKeArZwSbJX6lWWcOPa9iZnk",
  authDomain: "numra-ae.firebaseapp.com",
  projectId: "numra-ae",
  storageBucket: "numra-ae.firebasestorage.app",
  messagingSenderId: "722056318343",
  appId: "1:722056318343:web:59f1603b4bfa7cd60ed722",
  measurementId: "G-CD4630CKFV",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // background message received
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/header/numra_logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
