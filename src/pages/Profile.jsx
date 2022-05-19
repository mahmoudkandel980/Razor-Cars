import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAuth, updateProfile } from "firebase/auth";
import {
    updateDoc,
    doc,
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

import { toast } from "react-toastify";

import userPhoto from "../assets/profileUser.jpg";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";

import Input from "../components/UI/Input";
import ReservationCarsList from "../components/ReservationCarsList";
import Button from "../components/UI/Button";

function Profile() {
    const auth = getAuth();

    const [changeDetails, setChangeDetails] = useState(null);
    const [carsForSale, setCarsForSale] = useState([]);
    const [filterRevercedCars, setFilterRevercedCars] = useState([]);
    const [revercedCars, setRevercedCars] = useState([]);
    const [cars, setCars] = useState([]);

    const [jobs, setJobs] = useState([]);

    const [showReservationList, setShowReservationList] = useState(false);
    const [showSellCarsList, setShowSellCarsList] = useState(false);
    const [showJobsList, setShowJobsList] = useState(false);

    const [formData, setformData] = useState({
        name: auth.currentUser.displayName,
        profilePic: auth.currentUser.photoURL
            ? auth.currentUser.photoURL
            : userPhoto,
        email: auth.currentUser.email,
    });

    const { name, profilePic, email } = formData;

    useEffect(() => {
        const carsHandler = async () => {
            try {
                //get reference
                const carsRef = collection(db, `cars`);
                const q = query(carsRef, orderBy("timestamp", "desc"));

                //excute query
                const querySnap = await getDocs(q);
                let cars = [];

                querySnap.forEach((doc) => {
                    return cars.push({
                        ...doc.data(),
                    });
                });
                setCars(cars);
            } catch (error) {
                toast.error("couldn`t fetch listings");
            }
        };
        carsHandler();
    }, [auth.currentUser.uid, showReservationList]);

    useEffect(() => {
        const carsForSaleHandler = async () => {
            try {
                //get reference
                const carsRef = collection(db, `cars`);
                const q = query(carsRef, orderBy("timestamp", "desc"));

                //excute query
                const querySnap = await getDocs(q);
                let carsForSale = [];

                querySnap.forEach((doc) => {
                    return carsForSale.push(
                        doc.data().userRef === auth.currentUser.uid
                            ? {
                                  ...doc.data(),
                                  id: doc.id,
                              }
                            : ""
                    );
                });

                setCarsForSale(carsForSale.filter((car) => car.length !== 0));
            } catch (error) {
                toast.error("couldn`t fetch listings");
            }
        };

        const revercedCarsHandler = async () => {
            try {
                //get reference
                const carsRef = collection(
                    db,
                    `${auth.currentUser.uid}booking`
                );
                const q = query(carsRef, orderBy("timestamp", "desc"));

                //excute query
                const querySnap = await getDocs(q);
                let revercedCars = [];

                querySnap.forEach((doc) => {
                    return revercedCars.push({
                        ...doc.data(),
                    });
                });
                setRevercedCars(revercedCars);
            } catch (error) {
                toast.error("couldn`t fetch listings");
            }
        };

        const jobsHandler = async () => {
            try {
                //get reference
                const carsRef = collection(db, `${auth.currentUser.uid}Jobs`);
                const q = query(carsRef, orderBy("timestamp", "desc"));

                //excute query
                const querySnap = await getDocs(q);
                let jobs = [];

                querySnap.forEach((doc) => {
                    return jobs.push({
                        ...doc.data(),
                    });
                });
                setJobs(jobs);
            } catch (error) {
                toast.error("couldn`t fetch listings");
            }
        };

        carsForSaleHandler();
        revercedCarsHandler();
        jobsHandler();
    }, [auth.currentUser.uid]);

    useEffect(() => {
        let filterdCars = [];
        revercedCars.forEach((revercedCar) => {
            cars.forEach((car) => {
                revercedCar.carName === car.carName &&
                    filterdCars.push(car.carName);
            });
        });
        setFilterRevercedCars(filterdCars);
    }, [cars, revercedCars, showReservationList]);

    const changeHandler = async () => {
        if (changeDetails) {
            try {
                if (auth.currentUser.displayName !== name) {
                    await updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: profilePic,
                    });

                    const userRef = doc(db, "users", auth.currentUser.uid);
                    await updateDoc(userRef, { name: name });
                    toast.success(`Name has changed to ${name}`);
                } else {
                    toast.info(`Previous name is the same`);
                }
            } catch (error) {
                toast.error(
                    "Something went wrong couldn`t update profile data"
                );
            }
        }

        setChangeDetails((prevState) => !prevState);
    };

    const onChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const showReservationListHandler = () => {
        setShowReservationList((prevState) => !prevState);
    };

    const ShowSellCarsListHandler = () => {
        setShowSellCarsList((prevState) => !prevState);
    };

    const showJobsListHandler = () => {
        setShowJobsList((prevState) => !prevState);
    };

    const deleteReserveHandler = async (e) => {
        await deleteDoc(doc(db, `${auth.currentUser.uid}booking`, e.target.id));

        setRevercedCars((prevState) => {
            return prevState.filter(
                (resCar) =>
                    resCar.carName.replaceAll(/\s/g, "_") !== e.target.id
            );
        });
    };

    const deleteSellHandler = async (e) => {
        await deleteDoc(doc(db, `cars`, e.target.id));

        setCarsForSale((prevState) => {
            return prevState.filter((resCar) => resCar.id !== e.target.id);
        });
    };

    const deletejobsHandler = async (e) => {
        await deleteDoc(doc(db, `${auth.currentUser.uid}Jobs`, e.target.id));

        setJobs((prevState) => {
            return prevState.filter((job) => job.position !== e.target.id);
        });
    };

    return (
        <div className="profile">
            <div className="container">
                <h1 className="heading heading-secondary">Profile</h1>
                <main>
                    <h2 className="heading heading-tertiary">
                        Personal Details
                    </h2>
                    <div
                        className={`text profile-text ${
                            !changeDetails ? "change-text" : "done-text"
                        }`}
                        onClick={changeHandler}
                    >
                        <span>
                            <span>
                                {!changeDetails ? "Change Name" : "Done"}
                            </span>
                            <MdModeEditOutline className="icon" />
                        </span>
                    </div>
                    <div className="pic-container">
                        <img src={profilePic} alt="profile img" />
                    </div>
                    <form className="form">
                        <Input
                            htmlFor="name"
                            label="Your Name"
                            type="text"
                            id="name"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={onChange}
                            readOnly={!changeDetails}
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
                            readOnly={true}
                        >
                            <MdEmail className="icon" />
                        </Input>
                    </form>

                    <div className="reverce-section">
                        <h3
                            className="heading heading-tertiary reverce-section__heading "
                            onClick={ShowSellCarsListHandler}
                        >
                            Cars offered For Sale
                            {showSellCarsList ? (
                                <IoIosArrowDropupCircle className="icon" />
                            ) : (
                                <IoIosArrowDropdownCircle className="icon" />
                            )}
                        </h3>
                        {showSellCarsList && (
                            <div className="reverce-section">
                                {carsForSale.length > 0 &&
                                    carsForSale.map(
                                        (car) =>
                                            car.carName && (
                                                <ReservationCarsList
                                                    key={car.imgUrl}
                                                    carName={car.carName}
                                                    imgUrl={car.imgUrl}
                                                    userRef={car.userRef}
                                                    userName={car.userName}
                                                    phone={car.phone}
                                                    userEmail={car.userEmail}
                                                    timestamp={car.timestamp}
                                                    carTopSpeed={
                                                        car.carTopSpeed
                                                    }
                                                    carAcceleration={
                                                        car.carAcceleration
                                                    }
                                                    carBhp={car.carBhp}
                                                    carPrice={car.carPrice}
                                                    target={"sell"}
                                                    deleteSellHandler={
                                                        deleteSellHandler
                                                    }
                                                    id={car.id}
                                                    isExist={true}
                                                />
                                            )
                                    )}
                            </div>
                        )}
                    </div>

                    <div className="reverce-section">
                        <h3
                            className="heading heading-tertiary reverce-section__heading "
                            onClick={showReservationListHandler}
                        >
                            Cars Reservation List
                            {showReservationList ? (
                                <IoIosArrowDropupCircle className="icon" />
                            ) : (
                                <IoIosArrowDropdownCircle className="icon" />
                            )}
                        </h3>
                        {showReservationList && (
                            <div className="reverce-section">
                                {revercedCars.length > 0 ? (
                                    revercedCars.map((car) => (
                                        <ReservationCarsList
                                            key={car.imgUrl}
                                            carName={car.carName}
                                            imgUrl={car.imgUrl}
                                            userRef={car.userRef}
                                            userName={car.userName}
                                            phone={car.phone}
                                            userEmail={car.userEmail}
                                            timestamp={car.timestamp}
                                            carTopSpeed={car.carTopSpeed}
                                            carAcceleration={
                                                car.carAcceleration
                                            }
                                            carBhp={car.carBhp}
                                            carPrice={car.carPrice}
                                            target={"reversed"}
                                            deleteReserveHandler={
                                                deleteReserveHandler
                                            }
                                            isExist={filterRevercedCars.some(
                                                (filterRevercedCar) =>
                                                    car.carName ===
                                                    filterRevercedCar
                                                        ? true
                                                        : false
                                            )}
                                        />
                                    ))
                                ) : (
                                    <p className="text">No Cars Reserved</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="jobs-section">
                        <h3
                            className="heading heading-tertiary jobs-section__heading "
                            onClick={showJobsListHandler}
                        >
                            List of offered positions
                            {showJobsList ? (
                                <IoIosArrowDropupCircle className="icon" />
                            ) : (
                                <IoIosArrowDropdownCircle className="icon" />
                            )}
                        </h3>
                        {jobs.length > 0 &&
                            showJobsList &&
                            jobs.map((job) => (
                                <div className="job" key={job.position}>
                                    <ul className="job__list">
                                        <li className="job__list-item text listitem__text">
                                            {job.position}
                                        </li>
                                        <li className="job__list-item  listitem__deleteicon">
                                            <TiDelete
                                                id={job.position}
                                                className="delete-icon icon"
                                                onClick={deletejobsHandler}
                                            />
                                        </li>
                                    </ul>
                                </div>
                            ))}
                    </div>

                    <Link to="/sellCar">
                        <Button className="profile-btn">
                            <span>Sell your car</span>{" "}
                            <BsFillArrowRightCircleFill />
                        </Button>
                    </Link>
                </main>
                <Link to="/logout">
                    <Button className="logout-btn">
                        <span>Log out</span> <BsFillArrowRightCircleFill />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Profile;
