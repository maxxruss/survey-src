import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// import withRouter from "./hoc/with-router";
import compose from "../utils/compose";

import CssBaseline from "@mui/material/CssBaseline";
import withRequestService from "./hoc/with-request-service";

import Page404 from "./Pages/404";
import Home from "./Pages/Home";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import store from "../redux/store";
import PropTypes from 'prop-types'

// const RequireAuth = ({ children, location }) => {
//     const store_data = store.getState();
//     console.log('RequireAuth')

//     // if (store_data.id) {
//     //     console.log('Navigate')
//     //     return <Navigate to="/" state={{ from: location }} replace />;
//     // }

//     return children;
// };

// RequireAuth.propTypes = {
//     children: PropTypes.node
// }

const Main = (props) => {
    return (
        <>
            <CssBaseline />
            <Switch>
                <Route path="/" component={Home} />
                <Route
                    exact
                    path="/signin"
                    component={
                        <RequireAuth
                            children={<SignIn />}
                            location={props.location}
                        />
                    }
                />
                <Route
                    exact
                    path="/signup"
                    component={
                        <RequireAuth
                            children={<SignUp />}
                            location={props.location}
                        />
                    }
                />
                <Route path="*" component={<Navigate to="/" />} />
            </Switch>
        </>
    );
};

// export default compose(withRequestService(), withRouter())(Main);
export default withRequestService()(Main);
