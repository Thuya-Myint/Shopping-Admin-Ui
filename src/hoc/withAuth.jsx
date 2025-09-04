import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../helpers/helper';

const withAuth = (Component, allowedRoles = []) => {
    const AuthWrapper = (props) => {
        const userData = getItemFromLocalStorage('user-data');

        // Not logged in
        if (!userData?.token) return <Navigate to="/login" replace />;

        // Role check (if roles are provided)
        if (allowedRoles.length && !allowedRoles.includes(userData.role)) {
            return <Navigate to="/login" replace />;
        }

        return <Component {...props} />;
    };

    return AuthWrapper;
};

export default withAuth;