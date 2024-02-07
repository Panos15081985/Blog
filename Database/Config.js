
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfHRf5_o6TJgWB7c24c2ARiMuoWBvTd20",
  authDomain: "blog-478e6.firebaseapp.com",
  projectId: "blog-478e6",
  storageBucket: "blog-478e6.appspot.com",
  messagingSenderId: "158475142017",
  appId: "1:158475142017:web:bb33a2d21e2eebcc1b1e80",
  measurementId: "G-5ZQJHWN60W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;