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

type StateProps = {
    id: string;
    name: string;
    email: string;
};

const Body: React.FC<Props> = (props) => {
    console.log("Body props", props);
    const { cookies } = props;
    const lang = cookies.get("lang");
    console.log("getTheme", getTheme());
    const theme = getTheme();

    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(true);

    async function authCheck() {
        setLoading(true);

        const response = await props.requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            const data = response.data;
            props.authDataLoaded(data);
            setAuth(true);
        } else {
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
                <ButtonAppBar />
                <Main auth={auth} setAuth={setAuth} />
            </ThemeProvider>
        </>
    );
};

const mapStateToProps = ({ id, name, email }: StateProps) => {
    return { id, name, email };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(actions, dispatch);

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispatchToProps),
    withCookies
)(Body);
