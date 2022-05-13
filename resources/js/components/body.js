import React, { useState, useEffect } from "react";
import withRequestService from "./hoc/with-request-service";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "../utils/compose";
import Main from "./main";
import Spinner from "./spinner";

const Body = (props) => {
    console.log('Body props - ', props)
    const [loading, setLoading] = useState(false);

    async function response() {
        const response = await props.requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            props.authDataLoaded(response.data);
        }

        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        response()
    }, []);

    if (loading) return <Spinner />;
    return (
        <>
            <Main />
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
