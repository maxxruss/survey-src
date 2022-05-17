import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import withRouter from "./hoc/with-router";
import compose from "../utils/compose";
import withRequestService from "./hoc/with-request-service";
import CssBaseline from "@mui/material/CssBaseline";
import Page404 from "./Pages/404";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";

const Main = ({ auth, setAuth }) => {

    function AuthorizedRoute({ children, ...rest }) {
        console.log({ ...rest })
        console.log(children)
        // console.log(path)
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    auth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        );
    }

    function UnAuthorizedRoute({ children, ...rest }) {
        console.log({ ...rest })
        console.log(children)
        // console.log(path)
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    !auth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        );
    }

    return (
        <>
            <CssBaseline />
            <Switch>
                <AuthorizedRoute exact path="/"><Home /></AuthorizedRoute>
                <AuthorizedRoute exact path="/about"><About /></AuthorizedRoute>
                <UnAuthorizedRoute exact path="/signin" ><SignIn setAuth={setAuth} /></UnAuthorizedRoute>
                <UnAuthorizedRoute exact path="/signup" ><SignUp setAuth={setAuth} /></UnAuthorizedRoute>
                <Route path="*" component={Page404} status={404} />
            </Switch>
        </>
    );
};

// export default compose(withRequestService(), withRouter())(Main);
export default withRequestService()(Main);
