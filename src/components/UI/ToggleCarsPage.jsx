import React from "react";
import { NavLink } from "react-router-dom";

function ToggleCarsPage() {
    return (
        <div className="toggle-pages">
            <ul className="toggle-pages-list">
                <li className={`razorcars-page`}>
                    <NavLink to={"/cars"} className="text">
                        Razor`s Cars
                    </NavLink>
                </li>
                <li className={`clientcars-page `}>
                    <NavLink to={"/clients-cars"} className="text">
                        Client`s Cars
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default ToggleCarsPage;
