import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CarsContext from "../../context/Cars-context";

import { getAuth } from "firebase/auth";
import { setDoc, doc, serverTimestamp, deleteDoc } from "firebase/firestore";

import { db } from "../../firebase.config";

import { toast } from "react-toastify";

import { BsFillHeartFill } from "react-icons/bs";
import { BsSpeedometer } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";

import Aos from "aos";

function Card(props) {
    const user = getAuth().currentUser;
    const navigate = useNavigate();

    const {
        imgUrl,
        carName,
        carTopSpeed,
        carAcceleration,
        carBhp,
        carPrice,
        favCar,
        userName,
        phone,
        userEmail,
        userRef,
    } = props;

    const FavCarsctx = useContext(CarsContext);
    const { isFavouriteCar, addCar, removeCar, addData } = FavCarsctx;

    useEffect(() => {
        Aos.init({});
    }, []);

    const toggleFavoriteHandler = async () => {
        if (!user) {
            navigate("/favourite");
            return;
        }

        if (!isFavouriteCar(carName.replaceAll(/\s/g, ""))) {
            addCar({
                id: carName.replaceAll(/\s/g, ""),
                imgUrl,
                carName,
                topSpeed: carTopSpeed,
                carAcceleration,
                carBhp,
                carPrice,
                userName,
                phone,
                userEmail,
                userRef,
            });
            toast.success(`${carName} added to your favorite list`);

            await setDoc(doc(db, user.uid, carName), {
                id: carName.replaceAll(/\s/g, ""),
                imgUrl,
                carName,
                topSpeed: carTopSpeed,
                carAcceleration,
                carBhp,
                carPrice,
                phone,
                userEmail,
                userRef,
                timestamp: serverTimestamp(),
            });
        } else {
            await deleteDoc(doc(db, user.uid, carName));

            removeCar(carName.replaceAll(/\s/g, ""));
            toast.info(`${carName} reomoved from your favorite list`);
        }
    };

    const carNameTrim = carName.replaceAll(/\s/g, "_");

    const reserveHandler = () => {
        addData({
            id: carName.replaceAll(/\s/g, ""),
            imgUrl,
            carName,
            carTopSpeed,
            carAcceleration,
            carBhp,
            carPrice,
            userName,
            phone,
            userEmail,
            userRef,
        });
    };

    return (
        <div
            className="card"
            data-aos={props.fade}
            data-aos-offset="50"
            data-aos-delay="200"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
        >
            <div className="card__img">
                <img src={imgUrl} alt={carName} />
                {/* <img src={require(imgUrl[0])} alt={carName} /> */}
            </div>
            <BsFillHeartFill
                className={
                    favCar
                        ? "heading heading-tertiary heart-icon favourite "
                        : "heading heading-tertiary heart-icon"
                }
                onClick={toggleFavoriteHandler}
            />
            <div className="card__content">
                <h4 className="heading heading-tertiary">{carName}</h4>
                <ul className="list">
                    <li className="list-item">
                        <div className="list-item--data">
                            <BsSpeedometer className="card__icon" /> Top speed
                        </div>
                        <span>{carTopSpeed} Kmph</span>
                    </li>
                    <li className="list-item">
                        <div className="list-item--data">
                            <IoTimerOutline className="card__icon" /> 0 - 100
                            time
                        </div>
                        <span>{carAcceleration} seconds</span>
                    </li>
                    <li className="list-item">
                        <div className="list-item--data">
                            <AiOutlineThunderbolt className="card__icon" /> Bhp
                        </div>
                        <span>{carBhp}</span>
                    </li>
                    <li className="list-item">
                        <div className="list-item--data">
                            <BsFillCreditCard2BackFill className="card__icon" />{" "}
                            Price
                        </div>
                        <span>
                            {carPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            &#xa3;
                        </span>
                    </li>
                </ul>
                <button className="btn btn-card">
                    <Link to={`/cars/${carNameTrim}`} onClick={reserveHandler}>
                        <BsCart3 /> <span>reserve</span>
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default Card;
