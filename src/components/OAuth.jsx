import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

import Button from "./UI/Button";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

function OAuth() {
    const navigate = useNavigate(),
        location = useLocation();

    const googleSignInUpHandler = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // check for user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            //if user dosent exist
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    profilePic: user.photoURL,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (error) {
            toast.error("Couldn`t authorize with Google");
        }
    };
    const facebookSignInUpHandler = async () => {
        try {
            const auth = getAuth();
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // check for user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            //if user dosent exist
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    profilePic: user.photoURL,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Couldn`t authorize with Facebook");
        }
    };

    return (
        <div className="socialLogin">
            <p className="socialLogin-text">
                Sign {location.pathname === "/signin" ? "in" : "up"} with
            </p>
            <div className="social-buttons">
                <Button className="google-btn" onClick={googleSignInUpHandler}>
                    <FcGoogle />
                </Button>
                <Button
                    className="facebook-btn"
                    onClick={facebookSignInUpHandler}
                >
                    <FaFacebookF />
                </Button>
            </div>
        </div>
    );
}

export default OAuth;
