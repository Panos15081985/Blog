
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
//firebase Daten
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;