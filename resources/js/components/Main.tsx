import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withRequestService from "./hoc/with-request-service";
import CssBaseline from "@mui/material/CssBaseline";
import Page404 from "./pages/404";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";

interface Props {
    auth: boolean;
    setAuth: () => {};
}

type RouteProps = {
    children: any;
    exact: boolean;
    path: string;
};

const Main: React.FC<Props> = (props) => {
    const { auth, setAuth } = props;
    function AuthorizedRoute(props: RouteProps) {
        const { children, exact, path } = props;
        return (
            <Route
                exact={exact}
                path={path}
                render={({ location }) =>
                    auth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        );
    }

    function UnAuthorizedRoute(props: RouteProps) {
        const { children, exact, path } = props;
        return (
            <Route
                exact={exact}
                path={path}
                render={({ location }) =>
                    !auth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
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
                <AuthorizedRoute exact path="/">
                    <Home setAuth={setAuth} />
                </AuthorizedRoute>
                <AuthorizedRoute exact path="/about">
                    <About />
                </AuthorizedRoute>
                <UnAuthorizedRoute exact path="/signin">
                    <SignIn setAuth={setAuth} />
                </UnAuthorizedRoute>
                <UnAuthorizedRoute exact path="/signup">
                    <SignUp setAuth={setAuth} />
                </UnAuthorizedRoute>
                <Route path="*" component={Page404} />
            </Switch>
        </>
    );
};

export default withRequestService()(Main);
