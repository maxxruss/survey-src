import React, { useState, useEffect } from "react";
import withRequestService from "./hoc/with-request-service";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "../utils/compose";
import Spinner from "./spinner";
import Main from "./Main"

const Body = (props) => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(true);

    async function authCheck() {       
        setLoading(true)

        const response = await props.requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            props.authDataLoaded(response.data);
            setAuth(true)
        } else {
            setAuth(false)
        }

        setLoading(false)
    }

    useEffect(() => {
        authCheck()
    }, []);

    if (loading) return <Spinner />;
    return (
        <>
            <Main auth={auth} setAuth={setAuth} />
        </>
    );
}

const mapStateToProps = ({ id, name, email }) => {
    return { id, name, email };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Body);
