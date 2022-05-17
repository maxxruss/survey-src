import React from "react";
import Button from "@mui/material/Button";
// import withRouter from "../hoc/with-router";
import withRequestService from "../hoc/with-request-service";
import compose from "../../utils/compose";
import * as actions from "../../redux/actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = (props: any) => {    
    const history = useHistory();

    const logout = async () => {
        var response = await props.requestService.auth({
            method: "logout",
        });

        if (response.result == "success") {
            props.authLogOut();
            props.setAuth(false);
            history.push('/signin')
        }
    };

    const about = async () => {       
        history.push('/about')
    };

    return (
        <div className="tender_test">
            <h1>Home</h1>
            <Button onClick={() => logout()}>Выйти</Button>
            <Button onClick={() => about()}>about</Button>
        </div>
    );
};

export default compose(
    withRequestService(),
    // withRouter(),
    connect(null, actions)
)(Home);
