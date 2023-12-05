// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3C5k84wDbpBqcbGkdSYAAPopIu8sdzs8",
  authDomain: "focus-app-cac16.firebaseapp.com",
  projectId: "focus-app-cac16",
  storageBucket: "focus-app-cac16.appspot.com",
  messagingSenderId: "707105423759",
  appId: "1:707105423759:web:edd26053462aaa72c54bfa",
  measurementId: "G-C9EX4KGQG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;