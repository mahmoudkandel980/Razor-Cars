import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import OAuth from "../components/OAuth";

import { ReactComponent as Svg } from "../components/svg/signin.svg";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

function Signup() {
    const [showPassward, setShowPassward] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { name, email, password } = formData;

    const signinHandler = () => {
        navigate("/signin");
    };

    const showPasswardHandler = () => {
        setShowPassward((prevState) => !prevState);
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            updateProfile(auth.currentUser, { displayName: name });

            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, "users", user.uid), formDataCopy);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }

        setFormData((prevState) => ({
            name: "",
            email: "",
            password: "",
        }));
    };

    return (
        <div className="signin">
            <div className="container">
                <div className="signin__content">
                    <h1 className="heading heading-secondary">Sign up</h1>
                    <form className="form" onSubmit={submitHandler}>
                        <Input
                            htmlFor="name"
                            label="Your Name"
                            type="text"
                            id="name"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={onChange}
                        >
                            <FaUser className="icon" />
                        </Input>
                        <Input
                            htmlFor="email"
                            label="Your Email"
                            type="email"
                            id="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={onChange}
                        >
                            <MdEmail className="icon" />
                        </Input>
                        <div className="password-container">
                            <div
                                className="show-Password__container"
                                onClick={showPasswardHandler}
                            >
                                {showPassward ? (
                                    <BiHide className="show-Password" />
                                ) : (
                                    <BiShow className="show-Password" />
                                )}
                            </div>
                            <Input
                                htmlFor="password"
                                label="Your Password"
                                type={showPassward ? "text" : "password"}
                                id="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={onChange}
                                minLength="7"
                            >
                                <FaLock className="icon" />
                            </Input>
                        </div>
                        <Button>Sign up</Button>
                    </form>

                    {/* google authentication */}
                    <OAuth />

                    <button
                        type="button"
                        className="btn btn-signup"
                        onClick={signinHandler}
                    >
                        Sign in
                    </button>
                </div>
                <div className="signin__img">
                    <Svg className="svg" />
                </div>
            </div>
        </div>
    );
}

export default Signup;
