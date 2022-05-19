import React, { useState } from "react";

import Input from "./UI/Input";
import Button from "./UI/Button";

import { getAuth } from "firebase/auth";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { AiFillFileText } from "react-icons/ai";

function ContactForm() {
    const user = getAuth().currentUser;
    const [formData, setFormData] = useState({
        name: user ? user.displayName : "",
        email: user ? user.email : "",
        text: "",
        phone: "",
    });

    const { name, email, text, phone } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(formData);

        setFormData((prevState) => ({
            name: "",
            email: "",
            text: "",
            phone: "",
        }));
    };

    return (
        <form className="form" onSubmit={submitHandler}>
            {!user && (
                <>
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
                </>
            )}
            <div className="form-group">
                <label htmlFor="text">Your Inquiries</label>
                <div className="input-group">
                    <textarea
                        id="text"
                        rows="5"
                        placeholder="Enter Your Inquiries"
                        required
                        value={text}
                        onChange={onChange}
                    ></textarea>
                    <div className="input-group__icon">
                        <AiFillFileText className="icon" />
                    </div>
                </div>
            </div>
            <Input
                htmlFor="phone"
                label="Your Phone Number"
                type="number"
                id="phone"
                placeholder="Enter Your Phone Number"
                value={phone}
                onChange={onChange}
            >
                <BsTelephoneFill className="icon" />
            </Input>
            <Button>Submit</Button>
        </form>
    );
}

export default ContactForm;
