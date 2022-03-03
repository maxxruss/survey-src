import React, { useState, useEffect } from "react";
import withRequestService from "./hoc/with-request-service";
import withRouter from "./hoc/with-router";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "../utils/compose";
import Main from "./main";
import Spinner from "./spinner";

const Body = (props) => {
    console.log('props - ', props)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const response = async () => await props.requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            setLoading(false)
            props.authDataLoaded(response.data);
        } else {
            setLoading(false)

            props.navigate("/signin");
        }
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
    withRouter(),
    connect(mapStateToProps, mapDispatchToProps)
)(Body);
