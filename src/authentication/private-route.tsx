import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, children, ...rest }: any) => {
    return (
        <Route {...rest}>
            {
                isLoggedIn ? children : <Redirect to="/sign-in" />
            }
        </Route>
    )
};

export default PrivateRoute;