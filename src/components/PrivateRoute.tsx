import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authStore from '../stores/authStore';
import { useJWT } from '../Hooks/useJWT';

const PrivateRoute: React.FC<any>= ({ children}) => {

    useJWT();

    return (
        <Route
            render={() => authStore.isSignIn ? (children) : (<Redirect to='/signin'/>)}
        />
    );
}

export default PrivateRoute;