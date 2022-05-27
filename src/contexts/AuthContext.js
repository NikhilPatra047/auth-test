import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";
import {db} from "../firebase";
import {collection, query, where, getDocs, doc, updateDoc} from "firebase/firestore";

const AuthContext = React.createContext();

//ERROR
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function passwordReset(email) {
        return sendPasswordResetEmail(auth, email);
    }

    async function getData(email) {
        let data = null
        let id = null 

        const q = query(collection(db, 'userData'), where('email','==', email));
        const qSnap = await getDocs(q);

        qSnap.forEach((doc) => {
            data = doc.data();
            id = doc.id;
        });

        setUserData({name: data.name, userID: id});
    }

    async function updateName(userName, email) {
        const q = doc(collection(db, 'userData'), userData.userID)
        await updateDoc(q, {
            name: userName
        });
    }

    useEffect(() => {
        //Upon creating a user we want to set the created user to the current user
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false);
            setCurrentUser(user);
            console.log(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        passwordReset,
        userData,
        getData,
        updateName
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export function useGlobalContext() {
    return (
        useContext(AuthContext)
    );
};
