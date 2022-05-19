import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import { v4 as uuidv4 } from "uuid";

import ToggleCarsPage from "../components/UI/ToggleCarsPage";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

import { AiFillCar } from "react-icons/ai";
import { IoTimerOutline } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsSpeedometer } from "react-icons/bs";
import { BsCloudUploadFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";

import { toast } from "react-toastify";

function SellCar() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser === null ? "" : auth.currentUser.displayName,
        carName: "",
        imgSrcText: "",
        carAcceleration: "",
        topSpeed: "",
        carPrice: "",
        image: "",
        carBhp: "",
        phone: "",
        userName: auth.currentUser.displayName,
        userEmail: auth.currentUser.email,
        userRef: auth.currentUser.uid,
    });

    const {
        carName,
        carAcceleration,
        topSpeed,
        carPrice,
        image,
        carBhp,
        phone,
    } = formData;

    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/");
            return;
        }
    }, [auth.currentUser, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
            imgSrcText: carName.replaceAll(/\s/g, "_"),
        }));

        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                image: e.target.files,
            }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        //store image in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${
                    image.name
                }-${uuidv4()}`;

                const storageRef = ref(storage, "images/" + fileName);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL);
                            }
                        );
                    }
                );
            });
        };

        const imgUrl = await Promise.all(
            [...image].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false);
            toast.error("image not uploaded");
            return;
        });

        const formDataCopy = {
            ...formData,
            imgUrl,
            timestamp: serverTimestamp(),
        };

        delete formDataCopy.image;

        const docRef = await addDoc(collection(db, "cars"), formDataCopy);
        console.log(docRef);
        setLoading(false);
        toast.success("Listing saved");
        navigate(`/`);
    };

    const SubmitBtn = () => {
        setBtnDisabled(true);
    };
    return (
        <>
            <div className="sell-car">
                <ToggleCarsPage />
                <div className="container mb-large">
                    <h1 className="heading heading-secondary">Sell your Car</h1>
                </div>

                <div className="container">
                    <form className="form" onSubmit={submitHandler}>
                        <div className="from-flex">
                            <Input
                                htmlFor="carName"
                                label="Car`s Name"
                                type="text"
                                id="carName"
                                placeholder="Enter Car Name"
                                value={carName}
                                onChange={onChange}
                            >
                                <AiFillCar className="icon" />
                            </Input>
                            <div className="form-group form-group-upload">
                                <label htmlFor="image">
                                    Car`s photo ( max: 1)
                                </label>
                                <div className="input-group">
                                    <input
                                        type="file"
                                        id="image"
                                        accept=".jpg,.png,.jpeg"
                                        multiple={false}
                                        max="1"
                                        required
                                        onChange={onChange}
                                    />
                                    <div className="input-group__icon">
                                        <BsCloudUploadFill className="icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="from-flex">
                            <Input
                                htmlFor="carAcceleration"
                                label={`0-100 km in ${carAcceleration} s`}
                                type="number"
                                id="carAcceleration"
                                placeholder="Enter car`s Acceleration"
                                value={carAcceleration}
                                min="2"
                                max="15"
                                step="0.1"
                                onChange={onChange}
                            >
                                <IoTimerOutline className="icon" />
                            </Input>
                            <Input
                                htmlFor="topSpeed"
                                label="Top Speed km"
                                type="number"
                                id="topSpeed"
                                min="100"
                                max="380"
                                placeholder="Enter Car`s top Speed"
                                value={topSpeed}
                                onChange={onChange}
                            >
                                <BsSpeedometer className="icon" />
                            </Input>
                        </div>
                        <div className="from-flex">
                            <Input
                                htmlFor="carPrice"
                                label="Car`s Price"
                                type="number"
                                id="carPrice"
                                placeholder="Enter Car`s Price"
                                value={carPrice}
                                min="50000"
                                max="5000000"
                                step="1000"
                                onChange={onChange}
                            >
                                <MdOutlineAttachMoney className="icon" />
                            </Input>
                            <Input
                                htmlFor="carBhp"
                                label="Car Bhp"
                                type="text"
                                id="carBhp"
                                placeholder="Enter Car`s Bhp"
                                value={carBhp}
                                onChange={onChange}
                            >
                                <AiOutlineThunderbolt className="icon" />
                            </Input>
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
                            <BsFillTelephoneFill className="icon" />
                        </Input>

                        <Button
                            className={btnDisabled && "btn-disabled"}
                            onClick={SubmitBtn}
                        >
                            Submit
                        </Button>
                    </form>
                    <div></div>
                </div>
            </div>
        </>
    );
}

export default SellCar;
