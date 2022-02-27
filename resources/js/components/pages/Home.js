import React, { Component, PropTypes } from "react";
import Button from "@mui/material/Button";
import withRouter from "../hoc/with-router";
import withRequestService from "../hoc/with-request-service";
import compose from "../../utils/compose";
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    async logout() {
        var response = await this.props.requestService.auth({
            method: "logout",
        });

        if (response.result == "success") {
            this.props.authLogOut();
            this.props.navigate("/signin");
        }
    }

    render() {
        return (
            <div className="tender_test">
                <h1>Home</h1>
                <Button onClick={() => this.logout()}>Выйти</Button>
            </div>
        );
    }
}

// const mapStateToProps = ({ id, role, token, org, login }) => {
//     return { id, role, token, org, login };
// };

export default compose(
    withRequestService(),
    withRouter(),
    connect(null, actions)
)(Home);
