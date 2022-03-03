import React, { Component, PropTypes } from "react";
import Button from "@mui/material/Button";
import withRouter from "../hoc/with-router";
import withRequestService from "../hoc/with-request-service";
import compose from "../../utils/compose";
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Home = (props) => {
    console.log('home props - ', props)
    const logout = async () => {
        var response = await props.requestService.auth({
            method: "logout",
        });

        if (response.result == "success") {
            props.authLogOut();
            props.navigate("/signin");
        }
    };

    return (
        <div className="tender_test">
            <h1>Home</h1>
            <Button onClick={() => logout()}>Выйти</Button>
        </div>
    );
};

export default compose(
    withRequestService(),
    withRouter(),
    connect(null, actions)
)(Home);
