  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { getAuth } from "firebase/auth";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBNndSs2KpVvOxuBnJMAdGCYdeoIVVemFM",
    authDomain: "logginbd.firebaseapp.com",
    projectId: "logginbd",
    storageBucket: "logginbd.firebasestorage.app",
    messagingSenderId: "781537094240",
    appId: "1:781537094240:web:d333264b2f3a9445c8f105",
    measurementId: "G-3SKYMBQ1YB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);