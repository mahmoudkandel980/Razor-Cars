import React, { useState, useContext } from "react";

import Input from "./UI/Input";
import Button from "./UI/Button";
import JobsContext from "../context/Jobs-context";

import { getAuth } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { GiRank2 } from "react-icons/gi";
import { AiOutlineFilePdf } from "react-icons/ai";

function JobsForm() {
    const user = getAuth().currentUser;
    const ctx = useContext(JobsContext);

    const [formData, setFormData] = useState({
        name: user ? user.displayName : "",
        email: user ? user.email : "",
        position: "",
        file: "",
        phone: "",
    });

    const { name, email, position, file, phone } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        await setDoc(doc(db, `${user.uid}Jobs`, position), {
            name,
            email,
            position,
            file,
            phone,
            timestamp: serverTimestamp(),
        });

        setFormData((prevState) => ({
            name: "",
            email: "",
            position: "",
            file: "",
            phone: "",
        }));
        toast.success("form has been sent");
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
                <label htmlFor="position">Position</label>
                <div className="input-group">
                    <select
                        name="position"
                        id="position"
                        required
                        onChange={onChange}
                        value={position}
                    >
                        <option placeholder="Select" value=""></option>
                        <option value={ctx.jobs[0]}>{ctx.jobs[0]}</option>
                        <option value={ctx.jobs[1]}>{ctx.jobs[1]}</option>
                        <option value={ctx.jobs[2]}>{ctx.jobs[2]}</option>
                        <option value={ctx.jobs[3]}>{ctx.jobs[3]}</option>
                    </select>
                    <div className="input-group__icon">
                        <GiRank2 className="icon" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="file">Your CV (max: 1MB , .pdf)</label>
                <div className="input-group">
                    <input
                        type="file"
                        id="file"
                        accept=".pdf"
                        multiple
                        max="2"
                        required
                        value={file}
                        onChange={onChange}
                    />
                    <div className="input-group__icon">
                        <AiOutlineFilePdf className="icon" />
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

export default JobsForm;
