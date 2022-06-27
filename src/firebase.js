import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDobsjtORzO_qAMeLY8g45n6sPJiuNXr-w",
  authDomain: "resume-builder-a4737.firebaseapp.com",
  projectId: "resume-builder-a4737",
  storageBucket: "resume-builder-a4737.appspot.com",
  messagingSenderId: "42760375839",
  appId: "1:42760375839:web:5ea94a11eed5c199598f2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
