import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import auth from '../../service/users';
import { render } from '@testing-library/react';

const ProtectedRoute = ({ component: Component, render, ...rest }) => {

    return (
        <Route
            {...rest}

            render={props => {
                if (!auth.currentUser()) return <Redirect to='/' />
                return Component ? <Component {...props} /> : render(props);
            }}

        />
    )
}

export default ProtectedRoute;