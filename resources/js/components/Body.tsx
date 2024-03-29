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
import { useCookies } from "react-cookie";


interface Props {
    requestService: {
        auth: (method: object) => {
            result: string;
            data: { [v: string]: any };
        };
    };
    authDataLoaded: (data: { [v: string]: any }) => {};
    setLanguage: (lang: string) => {};
    getLang: () => {};
    cookies: {
        set: (arg1: String, arg2: String) => {};
        get: (arg1: String) => {};
    };
}

const Body: React.FC<Props> = ({ requestService, authDataLoaded, setLanguage }) => {
    const theme = getTheme();
    const [loading, setLoading] = useState<boolean>(true);
    const [cookies, setCookie] = useCookies();
    const { lang } = cookies;
    let language = lang

    if (!language) {
        language = 'ru'
        setCookie("lang", language);
    }

    setLanguage(language)

    async function authCheck() {
        const response = await requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            const data = response.data;
            authDataLoaded(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        authCheck();
    }, []);

    const content = loading ? <Spinner /> : <Main />;

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ButtonAppBar />
                {content}
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
