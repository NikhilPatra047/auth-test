/* The need of using private route is to redirect the application to the login page after logging out
Normally when we logout, even though the user gets logged out, the app still renders the dashboard page 
because of how react-router-dom works */

import React from "react";
import { Outlet, Navigate } from "react-router-dom"
import { useGlobalContext } from "../contexts/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { currentUser } = useGlobalContext();

    return (
        currentUser ? <Outlet /> : <Navigate to='/login' />
    );
};

export default PrivateRoute;