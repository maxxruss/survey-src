import React, { Component } from "react";
import withRequestService from "./hoc/with-request-service";
import withRouter from "./hoc/with-router";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "../utils/compose";
import Main from "./main";
import Spinner from "./spinner";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });
        var response = await this.props.requestService.auth({
            method: "check",
        });

        if (response.result == "success") {
            this.setState({
                loading: false,
            });
            this.props.authDataLoaded(response.data);
        } else {           
            this.setState({
                loading: false,
            });

            this.props.navigate("/signin");
        }
    }

    render() {
        if (this.state.loading) return <Spinner />;
        return (
            <>
                <Main />
            </>
        );
    }
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
