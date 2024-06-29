import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RedirectRoute = ({ children, redirectTo }) => {
    const { auth } = useContext(AuthContext);

    if (auth?.token) {
        return <Navigate to={redirectTo} />;
    }

    return children;
};

export default RedirectRoute;
