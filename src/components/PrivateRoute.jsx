import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./UI/Spinner";

const PrivateRoute = () => {
    const { loggedIn, checkStatus } = useAuthStatus();

    if (checkStatus) {
        return <Spinner />;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/Signin" />;
};

export default PrivateRoute;
