import React, { useState } from "react";

import { MdEmail } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

import { FaCrown } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsClockFill } from "react-icons/bs";

import { BsSpeedometer } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsFillCreditCard2BackFill } from "react-icons/bs";

function ReservationCarsList(props) {
    const [showCarsData, setShowCarsData] = useState(false);

    const {
        carName,
        imgUrl,
        userRef,
        userName,
        phone,
        userEmail,
        timestamp,
        carTopSpeed,
        carAcceleration,
        carBhp,
        carPrice,
        target,
        deleteReserveHandler,
        deleteSellHandler,
        id,
        isExist,
    } = props;

    const showCarDataHandler = () => {
        setShowCarsData((prevState) => !prevState);
    };

    console.log(isExist);

    return (
        <div className={`reverce ${!isExist && "notExist"}`} key={carName}>
            <ul className="reverce__list">
                <li className="cardata-carimage">
                    <div className="reverce__list-item listitem__image">
                        <div className="image-container">
                            <img src={imgUrl} alt={carName} />
                        </div>
                    </div>
                    <div className="reverce__list-item text listitem__text">
                        {carName.replaceAll(/_/g, " ")}
                        <div className="other-data">
                            <ul className="other-data__list">
                                <li className="other-data__list-item">
                                    <div className="icon-container">
                                        <FaCrown className="icon crown-icon" />
                                        <span>Owner :</span>
                                    </div>
                                    <span>
                                        {userRef ===
                                        "TPHWrvbU8WUOBQ215OJsUWcDnW32" ? (
                                            "Razor Company"
                                        ) : target === "sell" ? (
                                            <span className="owner-you">
                                                You
                                            </span>
                                        ) : (
                                            `${userName}`
                                        )}
                                    </span>
                                </li>
                                <li className="other-data__list-item">
                                    <div className="icon-container">
                                        <BsFillTelephoneFill className="icon tel-icon" />
                                        <span>Tel :</span>
                                    </div>
                                    <a
                                        href={`tel:${
                                            userRef ===
                                            "TPHWrvbU8WUOBQ215OJsUWcDnW32"
                                                ? "999-999-999"
                                                : `${phone}`
                                        }`}
                                    >
                                        {userRef ===
                                        "TPHWrvbU8WUOBQ215OJsUWcDnW32"
                                            ? "999-999-999"
                                            : `${phone}`}
                                    </a>
                                </li>
                                <li className="other-data__list-item">
                                    <div className="icon-container">
                                        <MdEmail className="icon email-icon" />
                                        <span>Mail :</span>
                                    </div>
                                    <a
                                        href={`mailto:${
                                            userRef ===
                                            "TPHWrvbU8WUOBQ215OJsUWcDnW32"
                                                ? "RazorCompany@gmail.com"
                                                : `${userEmail}`
                                        }`}
                                    >
                                        {userRef ===
                                        "TPHWrvbU8WUOBQ215OJsUWcDnW32"
                                            ? "RazorCompany@gmail.com"
                                            : `${userEmail}`}
                                    </a>
                                </li>
                                <li className="other-data__list-item">
                                    <div className="icon-container">
                                        <BsClockFill className="icon time-icon" />
                                        <span>Order Time :</span>
                                    </div>
                                    <div className="date-container">
                                        <span className="date-time">
                                            <span>
                                                {`${new Date(
                                                    timestamp.seconds * 1000
                                                ).getDate()} /
                                ${
                                    new Date(
                                        timestamp.seconds * 1000
                                    ).getMonth() + 1
                                } /
                                ${new Date(
                                    timestamp.seconds * 1000
                                ).getFullYear()}`}
                                            </span>
                                            <span>
                                                {new Date(
                                                    timestamp.seconds * 1000
                                                ).getHours() > 12
                                                    ? `${
                                                          new Date(
                                                              timestamp.seconds *
                                                                  1000
                                                          ).getHours() - 12
                                                      } : ${
                                                          new Date(
                                                              timestamp.seconds *
                                                                  1000
                                                          ).getMinutes() < 10
                                                              ? `0${new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getMinutes()}`
                                                              : new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getMinutes()
                                                      } : ${
                                                          new Date(
                                                              timestamp.seconds *
                                                                  1000
                                                          ).getSeconds() < 10
                                                              ? `0${new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getSeconds()}`
                                                              : new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getSeconds()
                                                      } PM`
                                                    : `${new Date(
                                                          timestamp.seconds *
                                                              1000
                                                      ).getHours()} : ${
                                                          new Date(
                                                              timestamp.seconds *
                                                                  1000
                                                          ).getMinutes() < 10
                                                              ? `0${new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getMinutes()}`
                                                              : new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getMinutes()
                                                      } : ${
                                                          new Date(
                                                              timestamp.seconds *
                                                                  1000
                                                          ).getSeconds() < 10
                                                              ? `0${new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getSeconds()}`
                                                              : new Date(
                                                                    timestamp.seconds *
                                                                        1000
                                                                ).getSeconds()
                                                      } AM`}
                                            </span>
                                        </span>
                                    </div>
                                </li>
                                <li className="other-data__list-item car-data__list">
                                    <div className="cardata">
                                        <div
                                            className="cardata-container"
                                            onClick={showCarDataHandler}
                                        >
                                            <span>Car`s Data</span>
                                            {showCarsData ? (
                                                <IoIosArrowDropupCircle className="icon" />
                                            ) : (
                                                <IoIosArrowDropdownCircle className="icon" />
                                            )}
                                        </div>
                                        {showCarsData && (
                                            <ul className="cardata__list">
                                                <li className="cardata__list-item">
                                                    <div className="cardata__list-item--data">
                                                        <BsSpeedometer className="cardata__list-item--data__icon" />
                                                        <span>Top speed :</span>
                                                    </div>
                                                    <span>
                                                        {carTopSpeed} Kmph
                                                    </span>
                                                </li>
                                                <li className="cardata__list-item">
                                                    <div className="cardata__list-item--data">
                                                        <IoTimerOutline className="cardata__list-item--data__icon" />
                                                        <span>0 - 100 :</span>
                                                    </div>
                                                    <span>
                                                        {carAcceleration} s
                                                    </span>
                                                </li>
                                                <li className="cardata__list-item">
                                                    <div className="cardata__list-item--data">
                                                        <AiOutlineThunderbolt className="cardata__list-item--data__icon" />
                                                        <span>Bhp :</span>
                                                    </div>
                                                    <span>{carBhp}</span>
                                                </li>
                                                <li className="cardata__list-item">
                                                    <div className="cardata__list-item--data">
                                                        <BsFillCreditCard2BackFill className="cardata__list-item--data__icon" />
                                                        <span>Price :</span>
                                                    </div>
                                                    <span>
                                                        {carPrice
                                                            .toString()
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ","
                                                            )}
                                                    </span>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </li>
                                {!isExist && (
                                    <li className="other-data__list-item car-data__list">
                                        <span className="deletecar">
                                            car owner {userName} delete this car
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="reverce__list-item  listitem__deleteicon">
                    <TiDelete
                        id={
                            target === "reversed"
                                ? carName.replaceAll(/\s/g, "_")
                                : `${id}`
                        }
                        className="delete-icon icon"
                        onClick={
                            target === "reversed"
                                ? deleteReserveHandler
                                : deleteSellHandler
                        }
                    />
                </li>
            </ul>
        </div>
    );
}

export default ReservationCarsList;
