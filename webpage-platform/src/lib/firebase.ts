import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBMJKoFnqea4T5sr7AwbM7xE2eJ4ja34Ic",
  authDomain: "nivel-up-english.firebaseapp.com",
  projectId: "nivel-up-english",
  storageBucket: "nivel-up-english.firebasestorage.app",
  messagingSenderId: "256616655228",
  appId: "1:256616655228:web:e3f3638ff2e3f501375cf9",
  measurementId: "G-BRK6DT340K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

const analytics = getAnalytics(app);