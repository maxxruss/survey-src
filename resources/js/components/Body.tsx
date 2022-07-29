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
        auth: (method: object) => {
            result: string;
            data: { [v: string]: any };
        };
    };
    authDataLoaded: (data: { [v: string]: any }) => {};
    getLang: () => {};
    cookies: {
        set: (arg1: String, arg2: String) => {};
        get: (arg1: String) => {};
    };
}

const Body: React.FC<Props> = ({ requestService, authDataLoaded }) => {
    const theme = getTheme();
    const [loading, setLoading] = useState<boolean>(true);

    async function authCheck() {
        const response = await requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            const data = response.data;
            // console.log("data: ", data);

            // const dataUser = {
            //     id: data.id,
            //     name: data.name,
            //     email: data.email,
            //     role: data.company.role.title,
            // };

            authDataLoaded(data);
        } else if (response.result == "failed") {
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
                <Main />
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
