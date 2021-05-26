import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authStore from '../stores/authStore';

const PrivateRoute: React.FC<any>= ({ children }) => {
    return (
        <Route
            render={() => authStore.user ? (children) : (<Redirect to='/signin'/>)}
        />
    );
}

export default PrivateRoute;