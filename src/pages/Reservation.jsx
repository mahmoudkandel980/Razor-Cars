import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase.config";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import CarsContext from "../context/Cars-context";

import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { AiFillRead } from "react-icons/ai";

import { toast } from "react-toastify";

function Reservation() {
    const user = getAuth();
    const params = useParams();
    const navigate = useNavigate();
    const FavCarsctx = useContext(CarsContext);

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [formData, setFormData] = useState({
        name: user.currentUser ? user.currentUser.displayName : "",
        carName: params.carId,
        phone: "",
    });

    const { carData } = FavCarsctx;

    useEffect(() => {
        if (!user.currentUser) {
            navigate("/signin");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const { name, carName, phone } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setBtnDisabled(true);

        await setDoc(doc(db, `${user.currentUser.uid}booking`, carName), {
            name,
            phone,
            carName,
            ...carData,
            timestamp: serverTimestamp(),
        });

        toast.success(`${carName} car is booked`);
        navigate("/profile");
    };

    return (
        <div className="reservation">
            <div className="container">
                <div className="reservation__content">
                    <h1 className="heading heading-secondary">Reservation</h1>
                    <div className="text reservation__text ">
                        <span>
                            We will contact you within 1 hour to confirm the
                            reservation and to specify the date of signing the
                            contract.
                        </span>
                        <br />
                        <div>
                            <span>If you are in a hurry, please call us</span>
                            <a href="tel:+201122442622">
                                <BsFillTelephoneFill className="reservation__icon" />
                            </a>
                        </div>
                    </div>
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
                        <div className="form-group">
                            <label htmlFor="carName">Car name</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="carName"
                                    readOnly
                                    required
                                    value={carName.replaceAll(/_/g, " ")}
                                    onChange={onChange}
                                />
                                <div className="input-group__icon">
                                    <AiFillRead className="icon" />
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
                        <Button
                            className={btnDisabled && "btn-disabled"}
                            onClick={submitHandler}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="reservation__img">
                    <img src={carData.imgUrl} alt={params.carId} />
                </div>
            </div>
        </div>
    );
}

export default Reservation;
