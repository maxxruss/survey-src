import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withRequestService from "./hoc/with-request-service";
import Page404 from "./pages/404";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Drawer from "./ui/Drawer";

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
        <div className="main-content">
            <Drawer />
            <Switch>
                <AuthorizedRoute exact path="/">
                    <Home />
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
        </div>
    );
};

export default withRequestService()(Main);
