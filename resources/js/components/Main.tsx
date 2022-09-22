import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withRequestService from "./hoc/with-request-service";
import { Container, Box, Paper } from "@mui/material";
import Page404 from "./pages/404";
import Home from "./pages/Home";
import PleaseConfirm from "./pages/info/PleaseConfirm";
import Verify from "./pages/info/Verify";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Admin from "./pages/roles/admin/MainAdmin";
import AdminListAskers from "./pages/roles/admin/AdminListAskers";
import AskerCompany from "./pages/roles/asker/Company";
import AskerSurveysList from "./pages/roles/asker/SurveysList";
import AskerSurvey from "./pages/roles/asker/Survey/Survey";
import AskerAnalytics from "./pages/roles/asker/Analytics";
import AskerProfile from "./pages/roles/asker/Profile";
import AskerRespondersList from "./pages/roles/asker/RespondersList";
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
    asker: [
        "/asker",
        "/asker/surveyslist",
        "/asker/analytics",
        "/asker/profile",
        "/asker/survey",
        "/asker/respondersList"
    ],
    responder: ["/responder"],
};

const Main = ({ auth, role }: Props) => {
    // Защита маршрутов, каждая роль имеет право ходить только по разрешенным маршрутам
    function ProtectRole(path: string, children: JSX.Element) {
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
        <Box pt={"64px"} sx={{ height: "100vh" }}>
            <Drawer />
            <Container component="main" className="main-content-container">
                <Paper elevation={3} className="main-content-paper">
                    <Switch>
                        <UnAuthorizedRoute exact path="/signin">
                            <SignIn />
                        </UnAuthorizedRoute>
                        <UnAuthorizedRoute exact path="/signup">
                            <SignUp />
                        </UnAuthorizedRoute>
                        <UnAuthorizedRoute exact path="/pleaseConfirm">
                            <PleaseConfirm />
                        </UnAuthorizedRoute>
                        <AuthorizedRoute exact path="/admin">
                            <Admin />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/admin/listaskers">
                            <AdminListAskers />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/asker">
                            <AskerCompany />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/asker/surveyslist">
                            <AskerSurveysList />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/asker/survey">
                            <AskerSurvey />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/asker/analytics">
                            <AskerAnalytics />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/asker/profile">
                            <AskerProfile />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/asker/respondersList">
                            <AskerRespondersList />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/responder">
                            <Responder />
                        </AuthorizedRoute>
                        <AuthorizedRoute exact path="/">
                            <Home />
                        </AuthorizedRoute>
                        <Route path="/verify" component={Verify} />
                        <Route path="*" component={Page404} />
                    </Switch>
                </Paper>
            </Container>
        </Box>
    );
};

const mapStateToProps = ({ role, auth }: StateProps) => {
    return { role, auth };
};

export default compose(connect(mapStateToProps), withRequestService())(Main);
