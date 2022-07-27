import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withRequestService from "./hoc/with-request-service";
import { Container, Box, Paper } from "@mui/material";
import Page404 from "./pages/404";
import Home from "./pages/Home";
import SignIn from "./pages/auth/signin";
import SignUpMain from "./pages/auth/SignUpMain";
import Admin from "./pages/roles/admin/MainAdmin";
import AdminListAskers from "./pages/roles/admin/AdminListAskers";
import Asker from "./pages/roles/asker/MainAsker";
import AskerSurveys from "./pages/roles/asker/AskerSurveys";
import AskerAnalytics from "./pages/roles/asker/AskerAnalytics";
import Responder from "./pages/roles/responder/MainResponder";
import Drawer from "./ui/Drawer";
import { connect } from "react-redux";
import compose from "../utils/compose";

interface Props {
    auth: boolean;
    role: string;
}

type StateProps = {
    auth: boolean;
    role: string;
};

interface RouteProps {
    children: any;
    exact: boolean;
    path: string;
}

type MapRoutes = {
    [key: string]: string[];
};

const mapRoutes: MapRoutes = {
    admin: ["/admin", "/admin/listaskers"],
    asker: ["/asker", "/asker/surveys", "/asker/analytics"],
    responder: ["/responder"],
};

const Main = ({ auth, role }: Props) => {
    function ProtectRole(path: string, children: any) {
        if (mapRoutes[role].indexOf(path) != -1) {
            return children;
        } else {
            return <Redirect to={`/${role}`} />;
        }
    }

    function AuthorizedRoute(props: RouteProps) {
        const { children, exact, path } = props;        

        return (
            <Route
                exact={exact}
                path={path}
                render={({ location }) =>
                    auth && role ? (
                        ProtectRole(path, children)
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
        // console.log("UnAuthorizedRoute path: ", path);
        // console.log("UnAuthorizedRoute auth: ", auth);
        return (
            <Route
                exact={exact}
                path={path}
                render={({ location }) =>
                    !auth && !role ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: `/${role}`,
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
            <Container component="main">
                <Paper elevation={3}>
                    <Box sx={{ height: "100vh" }}>
                        <Switch>
                            <UnAuthorizedRoute exact path="/signin">
                                <SignIn />
                            </UnAuthorizedRoute>
                            <UnAuthorizedRoute exact path="/signup">
                                <SignUpMain />
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
                            <AuthorizedRoute exact path="/asker/surveys">
                                <AskerSurveys />
                            </AuthorizedRoute>
                            <AuthorizedRoute exact path="/asker/analytics">
                                <AskerAnalytics />
                            </AuthorizedRoute>
                            <AuthorizedRoute exact path="/responder">
                                <Responder />
                            </AuthorizedRoute>
                            <AuthorizedRoute exact path="/">
                                <Home />
                            </AuthorizedRoute>
                            <Route path="*" component={Page404} />
                        </Switch>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

const mapStateToProps = ({ role, auth }: StateProps) => {
    return { role, auth };
};

export default compose(connect(mapStateToProps), withRequestService())(Main);
