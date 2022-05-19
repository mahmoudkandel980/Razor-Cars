import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavigationList from "./NavigationList";

import logo from "../../assets/logo.png";

import { BsList } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

function Navigation() {
    const [openNavigation, setOpenNavigation] = useState(false);

    const onClickHandler = () => {
        setOpenNavigation((prevState) => !prevState);
    };

    return (
        <div className="navigation">
            <div className="navigation__logo">
                <div className="logo-swipin">
                    <Link to="/home">
                        <img
                            className="navigation__img"
                            src={logo}
                            alt="logo"
                        />
                    </Link>
                </div>
            </div>
            <NavigationList navigation__nav="navigation__nav-big" />
            <div
                className={
                    openNavigation ? "small-nav" : "small-nav small-nav__hide"
                }
            >
                <div className="small-nav__icon" onClick={onClickHandler}>
                    {!openNavigation ? (
                        <BsList className="icon" />
                    ) : (
                        <AiOutlineClose className="icon" />
                    )}
                </div>
                <div
                    className={`small-nav__navbar ${
                        openNavigation && "small-nav__navbar-active"
                    }`}
                />
                <NavigationList
                    onClick={onClickHandler}
                    navigation__nav={`navigation__nav-small ${
                        openNavigation
                            ? "navigation__nav-small-active"
                            : "navigation__nav-small-unactive"
                    }`}
                />
            </div>
        </div>
    );
}

export default Navigation;
