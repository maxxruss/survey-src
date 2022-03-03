import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import withRouter from "./hoc/with-router";
import compose from "../utils/compose";

import CssBaseline from "@mui/material/CssBaseline";
import withRequestService from "./hoc/with-request-service";

import Page404 from "./Pages/404";
import Home from "./Pages/Home";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import store from "../redux/store";
import PropTypes from 'prop-types'

const RequireAuth = ({ children, location }) => {
    const store_data = store.getState();
    if (store_data.id) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

RequireAuth.propTypes = {
    children: PropTypes.node
}



const Main = (props) => {
    return (
        <>
            <CssBaseline />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                    path="/signin"
                    element={
                        <RequireAuth
                            children={<SignIn />}
                            location={props.location}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <RequireAuth
                            children={<SignUp />}
                            location={props.location}
                        />
                    }
                />
                <Route path="*" component={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

export default compose(withRequestService(), withRouter())(Main);
