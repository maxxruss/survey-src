import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withRequestService from "./hoc/with-request-service";
import Page404 from "./pages/404";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Drawer from "./ui/Drawer";
import { connect } from "react-redux";
import compose from "../utils/compose";

interface Props {
    auth: boolean;
}

type StateProps = {
    auth: boolean;
};

type RouteProps = {
    children: any;
    exact: boolean;
    path: string;
};

const Main = ({ auth }: Props) => {
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
                    <SignIn />
                </UnAuthorizedRoute>
                <UnAuthorizedRoute exact path="/signup">
                    <SignUp />
                </UnAuthorizedRoute>
                <Route path="*" component={Page404} />
            </Switch>
        </div>
    );
};

const mapStateToProps = ({ auth }: StateProps) => {
    return { auth };
};

export default compose(connect(mapStateToProps), withRequestService())(Main);
