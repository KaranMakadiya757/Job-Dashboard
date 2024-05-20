import React from 'react';
import { Navigate } from 'react-router-dom';

export function AuthGuard({ children }) {
    let auth = undefined;
    if (!(sessionStorage.getItem('token') === null)) {
        console.log(sessionStorage.getItem('token'))
        console.log('yes')
        auth = true;
    }
    if (sessionStorage.getItem('token') === null) {
        console.log('no')
        auth = false;
    }


    if (auth) {
        return children;
    } else {
        return <Navigate to="/" />
    }
}

export function LoginAuth({ children }) {
    let auth = undefined;
    if (!(sessionStorage.getItem('token') === null)) {
        auth = true;
    }
    if (sessionStorage.getItem('token') === null) {
        auth = false;
    }


    if (!auth) {
        return children;
    } else {
        return <Navigate to="/dashboard" />
    }
}
