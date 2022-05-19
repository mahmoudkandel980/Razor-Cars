import React from "react";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineContacts } from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";
import homeCar from "../../assets/home.jpg";
import othersCar from "../../assets/home2.jpg";

import SlideUp from "../UI/SlideUp";

function SlidePhoto() {
    const location = useLocation().pathname;

    return (
        <div className="header">
            <div className="header__img">
                {
                    <img
                        src={location === "/home" ? homeCar : othersCar}
                        alt="car"
                        className="home-cover"
                    />
                }
            </div>
            <div className="header__layer"></div>
            <div className="header__content">
                <h1 className="heading heading-primary">Razor Motors</h1>
                <p className="header__text">
                    We are glad to have you with us you are in the right place.
                    Find your dream vehicle. Here you can get a lot of
                    suggestions for new and used vehicles as well
                </p>
                <button className="btn header-btn">
                    {location !== "/home" ? (
                        <Link to="/home">
                            <AiOutlineHome />
                            {"  "}
                            <span>Home Page</span>
                        </Link>
                    ) : (
                        <Link to="/contactUs">
                            <AiOutlineContacts />
                            {"  "}
                            <span>Contact Us</span>
                        </Link>
                    )}
                </button>
            </div>
            <SlideUp />
        </div>
    );
}

export default SlidePhoto;
