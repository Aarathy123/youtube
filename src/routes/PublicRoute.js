import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        !isAuthenticated ?
            (<div><Component {...props} /></div>) :
            (<Redirect to="/dashboard" />)
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
})

export default connect(mapStateToProps)(PublicRoute)