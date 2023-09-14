import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

export const UserContext = createContext();
const auth = getAuth(app);

const UserValidation = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // Login process for social media
    const loginProvider = (provider) => {
        setLoader(true);
        return signInWithPopup(auth, provider);
    }

    // create a new user via firebase auth system
    const createNewUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (userInfo) => {
        setLoader(true)
        return updateProfile(auth.currentUser, userInfo);
    }

    const forgetPassLinkToEmail = (email) => {
        setLoader(true);
        return sendPasswordResetEmail(auth, email)
    }

    const signIn = (email , password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth , email , password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    // observing user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (user === null) {
                // console.log(`from Auth state, observing user!`)
                setUser(currentUser);
                setLoader(false)
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    // object to share with entire app for auth related executions
    const fireAuthValue = {
        user,
        loader,
        setLoader,
        loginProvider,
        createNewUser,
        updateUser,
        signIn,
        forgetPassLinkToEmail,
        logOut
    }

    return (
        <UserContext.Provider value={fireAuthValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserValidation;