import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { upload } from "@testing-library/user-event/dist/upload";

const AuthContext = React.createContext();

//ERROR
export function useGlobalContext() {
    return (
        useContext(AuthContext)
    );
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [url, setUrl] = useState(null);

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

        const q = query(collection(db, 'userData'), where('email', '==', email));
        const qSnap = await getDocs(q);

        qSnap.forEach((doc) => {
            data = doc.data();
            id = doc.id;
        });

        setUserData({ name: data.name, userID: id, image: data.image });
    }

    async function uploadProfile(userName, photo) {

        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, photo).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url)
            })
            .catch((error) => {
                console.log(error.message, "error getting the image url");
            })
        })
        .catch((error) => {
            console.log(error.message, "error getting the image url");
        })

        const q = doc(collection(db, 'userData'), userData.userID)
        await updateDoc(q, {
            name: userName,
            image: url
        });

    };

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
        uploadProfile,
        url,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};