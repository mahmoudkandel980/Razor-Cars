import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GoSignOut } from "react-icons/go";

import { getAuth } from "firebase/auth";

import CarsContext from "../context/Cars-context";

function Logout(props) {
    const auth = getAuth();
    const navigate = useNavigate();
    const FavCarsctx = useContext(CarsContext);

    const [fromData, setFromData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    useEffect(() => {
        setFromData((prevState) => ({
            ...prevState,
            name: auth.currentUser.displayName,
        }));
    }, [auth.currentUser.displayName]);

    const logoutHandler = () => {
        FavCarsctx.cars.length = 0;
        auth.signOut();
        navigate("/");
    };

    return (
        <div className={`logout ${props.logoutSection}`}>
            <div className={`container ${props.logoutSection}`}>
                <div>
                    <h1
                        className={`heading heading-secondary ${props.logoutHeader}`}
                    >
                        Log out
                    </h1>
                    <main>
                        <div className="data">
                            <ul className="logout-list">
                                <li className="logout-listitem">
                                    Name : <span>{fromData.name}</span>
                                </li>
                                <li className="logout-listitem">
                                    Email : <span>{fromData.email}</span>
                                </li>
                            </ul>
                            <div className="pic-container">
                                <img
                                    src={auth.currentUser.photoURL}
                                    alt="profile img"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={logoutHandler}
                            className="btn logout-btn"
                        >
                            <GoSignOut className="icon" /> Log out
                        </button>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Logout;
