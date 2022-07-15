import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withRequestService from "./hoc/with-request-service";
import Page404 from "./pages/404";
import Home from "./pages/Home";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Admin from "./pages/roles/admin/MainAdmin";
import AdminListAskers from "./pages/roles/admin/AdminListAskers";
import Asker from "./pages/roles/asker/MainAsker";
import AskerProfile from "./pages/roles/asker/AskerProfile";
import Responder from "./pages/roles/responder/MainResponder";
import Drawer from "./ui/Drawer";
import { connect } from "react-redux";
import compose from "../utils/compose";

interface Props {
    auth: boolean;
    role: string;
}

type StateProps = {
    role: string;
};

type RouteProps = {
    children: any;
    exact: boolean;
    path: string;
};

type MapRoutes = {
    [key: string]: string[];
};

const mapRoutes: MapRoutes = {
    admin: ["/", "/admin", "/admin/listaskers"],
    asker: ["/", "/asker", "/asker/profile"],
    responder: ["/", "/responder"],
};

const Main = ({ auth, role }: Props) => {
    function ProtectRoute(path: string) {
        const r = mapRoutes[role];
        console.log("r: ", r);
        console.log("path: ", path);
        if (role && mapRoutes[role].indexOf(path) != -1) {
            console.log(
                "mapRoutes[role].indexOf(path): ",
                mapRoutes[role].indexOf(path)
            );
        }
    }

    function AuthorizedRoute(props: RouteProps) {
        const { children, exact, path } = props;
        console.log("path: ", path);
        console.log("auth: ", auth);
        // ProtectRoute(path);
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
        console.log("path: ", path);
        console.log("auth: ", auth);
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
                <UnAuthorizedRoute exact path="/signin">
                    <SignIn />
                </UnAuthorizedRoute>
                <UnAuthorizedRoute exact path="/signup">
                    <SignUp />
                </UnAuthorizedRoute>
                <AuthorizedRoute exact path="/admin">
                    <Admin />
                </AuthorizedRoute>
                <AuthorizedRoute exact path="/admin/listaskers">
                    <AdminListAskers />
                </AuthorizedRoute>
                <AuthorizedRoute exact path="/asker">
                    <Asker />
                </AuthorizedRoute>
                <AuthorizedRoute exact path="/asker/profile">
                    <AskerProfile />
                </AuthorizedRoute>
                <AuthorizedRoute exact path="/responder">
                    <Responder />
                </AuthorizedRoute>
                <AuthorizedRoute exact path="/">
                    <Home />
                </AuthorizedRoute>
                <Route path="*" component={Page404} />
            </Switch>
        </div>
    );
};

const mapStateToProps = ({ role }: StateProps) => {
    return { role };
};

export default compose(connect(mapStateToProps), withRequestService())(Main);
