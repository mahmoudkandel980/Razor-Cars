import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import CarsContext from "../../context/Cars-context";

import { getAuth } from "firebase/auth";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCar } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { AiOutlineContacts } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { ImEnter } from "react-icons/im";
import { FaUser } from "react-icons/fa";

function NavigationList(props) {
    const auth = getAuth();
    const FavCarsctx = useContext(CarsContext);
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);

    const { onClick } = props;
    const { cars } = FavCarsctx;

    useEffect(() => {
        if (auth) {
            setBtnIsHighLighted(true);

            const time = setTimeout(() => {
                setBtnIsHighLighted(false);
            }, 300);

            return () => {
                clearTimeout(time);
            };
        }
    }, [FavCarsctx.cars, auth]);

    return (
        <ul
            className={`navigation__nav navigation__list ${props.navigation__nav}`}
        >
            <li className="navigation__listitem">
                <NavLink to="/home" onClick={onClick}>
                    <AiOutlineHome />
                    <span>Home</span>
                </NavLink>
            </li>
            <li className="navigation__listitem">
                <NavLink to="/cars" onClick={onClick}>
                    <AiOutlineCar />
                    <span>Cars</span>
                </NavLink>
            </li>
            <li className="navigation__listitem">
                <NavLink to="/about" onClick={onClick}>
                    <FcAbout />
                    <span>About Us</span>
                </NavLink>
            </li>
            <li className="navigation__listitem">
                <NavLink to="/contactUs" onClick={onClick}>
                    <AiOutlineContacts />
                    <span>Contact Us</span>
                </NavLink>
            </li>
            <li className="navigation__listitem">
                <NavLink
                    onClick={onClick}
                    to="/favourite"
                    className={btnIsHighLighted && "favourite bump"}
                >
                    <BsFillHeartFill
                        className={
                            (FavCarsctx.cars.length > 0 || auth.currentUser) &&
                            "favourite"
                        }
                    />
                    <span>
                        Favourite <span>{cars.length}</span>
                    </span>
                </NavLink>
            </li>
            <li className="navigation__listitem">
                {!auth.currentUser ? (
                    <NavLink to="/signin" onClick={onClick}>
                        <ImEnter />
                        <span>Sign in</span>
                    </NavLink>
                ) : (
                    <NavLink to="/profile" onClick={onClick}>
                        <FaUser />
                        <span>Profile</span>
                    </NavLink>
                )}
            </li>
        </ul>
    );
}

export default NavigationList;
