import React, { useState, useEffect } from "react";
import withRequestService from "./hoc/with-request-service";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "../utils/compose";
import { withCookies } from "react-cookie";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "../theme";
import Spinner from "./spinner";
import Main from "./Main";
import ButtonAppBar from "./ui/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

interface Props {
    requestService: {
        auth: (method: object) => { result: string; data: string };
    };
    authDataLoaded: (data: any) => {};
    getLang: () => {};
    cookies: {
        set: (arg1: String, arg2: String) => {};
        get: (arg1: String) => {};
    };
}

const Body: React.FC<Props> = ({ cookies, requestService, authDataLoaded }) => {
    const lang = cookies.get("lang");
    const theme = getTheme();
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(true);

    async function authCheck() {
        setLoading(true);

        const response = await requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            const data = response.data;
            authDataLoaded(data);
            setAuth(true);
        } else if (response.result == "failed") {
            setAuth(false);
        }

        setLoading(false);
    }

    useEffect(() => {
        authCheck();
    }, []);

    if (loading) return <Spinner />;
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ButtonAppBar />
                <Main auth={auth} />
            </ThemeProvider>
        </>
    );
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(actions, dispatch);

export default compose(
    withRequestService(),
    connect(null, mapDispatchToProps),
    withCookies
)(Body);
