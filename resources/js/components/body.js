import React, { useState, useEffect } from "react";
import withRequestService from "./hoc/with-request-service";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "../utils/compose";
import Spinner from "./spinner";
import { Switch, Route, Redirect } from "react-router-dom";
// import withRouter from "./hoc/with-router";

import CssBaseline from "@mui/material/CssBaseline";

import Page404 from "./Pages/404";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";

const Body = (props) => {
    // console.log('Body props - ', props)
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(false);

    async function authCheck() {
        console.log('authCheck')
        console.log('auth: ', auth)
        setLoading(true)

        const response = await props.requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            props.authDataLoaded(response.data);
            setAuth(true)
        } else {
            setAuth(false)
        }

        setLoading(false)
    }

    useEffect(() => {
        authCheck()
    }, []);

    // function AuthorizedRoute({ children, ...rest }) {
    //     console.log('auth: ', auth)
    //     console.log('children: ', children)
    //     console.log('rest: ', rest)
    //     // authCheck()
    //     return (
    //         <Route
    //             {...rest}
    //             render={({ location }) =>
    //                 auth ? (
    //                     children
    //                 ) : (
    //                     <Redirect
    //                         to={{
    //                             pathname: "/signin",
    //                             state: { from: location }
    //                         }}
    //                     />
    //                 )
    //             }
    //         />
    //     );
    // }

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


    if (loading) return <Spinner />;
    return (
        <>
            <CssBaseline />
            <Switch>
                <AuthorizedRoute exact path="/"><Home setAuth={setAuth} /></AuthorizedRoute>
                <AuthorizedRoute exact path="/about"><About setAuth={setAuth} /></AuthorizedRoute>
                {/* <Route exact path="/about">{!auth ? <Redirect to="/signin" /> : <About setAuth={setAuth} />}</Route> */}
                <UnAuthorizedRoute exact path="/signin" ><SignIn setAuth={setAuth} /></UnAuthorizedRoute>
                <UnAuthorizedRoute exact path="/signup" ><SignUp setAuth={setAuth} /></UnAuthorizedRoute>
                {/* <Route exact path="/">{!auth ? <Redirect to="/signin" /> : <Home setAuth={setAuth} />}</Route> */}
                {/* <Route exact path="/about"><About setAuth={setAuth} /></Route> */}
                {/* <Route exact path="/signin" ><SignIn setAuth={setAuth} /></Route> */}
                {/* <Route exact path="/signup" ><SignUp setAuth={setAuth} /></Route> */}
                {/* <Route exact path="/"><Home setAuth={setAuth} /></Route> */}
                <Route path="*" component={Page404} status={404} />
            </Switch>
        </>
    );
}

const mapStateToProps = ({ id, name, email }) => {
    return { id, name, email };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Body);
