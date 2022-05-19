import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import OAuth from "../components/OAuth";

import { ReactComponent as Svg } from "../components/svg/signin.svg";

import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

function Signin() {
    const [showPassward, setShowPassward] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { email, password } = formData;

    const signupHandler = () => {
        navigate("/signup");
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
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            if (user) {
                navigate("/profile");
            }

            toast.success("You are logged in successfully");

            setFormData((prevState) => ({
                email: "",
                password: "",
            }));
        } catch (error) {
            toast.error("Bad user credentials");
            console.log(error);
        }
    };

    return (
        <div className="signin">
            <div className="container">
                <div className="signin__content">
                    <h1 className="heading heading-secondary">Sign in</h1>
                    <form className="form" onSubmit={submitHandler}>
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
                        <Button>Sign in</Button>
                    </form>

                    {/* google authentication */}
                    <OAuth />

                    <button
                        type="button"
                        className="btn btn-signup"
                        onClick={signupHandler}
                    >
                        Sign up
                    </button>
                </div>
                <div className="signin__img">
                    <Svg className="svg" />
                </div>
            </div>
        </div>
    );
}

export default Signin;
