import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDx1Q18GjuW52Qoj1K9ax_1Z2g2EU4lVb4",
    authDomain: "auth-development-9877b.firebaseapp.com",
    projectId: "auth-development-9877b",
    storageBucket: "auth-development-9877b.appspot.com",
    messagingSenderId: "63287820578",
    appId: "1:63287820578:web:6f8de44b5214fbe1cb257b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app) //authentication instance

export default app; //firebase in general to be used anywhere within the application

