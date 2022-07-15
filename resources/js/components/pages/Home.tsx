import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface Props {
    auth: boolean;
    role: string;
}

type StateProps = {
    auth: boolean;
    role: string;
};

const Home = ({ role }: Props) => {
    // console.log("Home");
    return <div>{"home"}</div>;
};

const mapStateToProps = ({ auth, role }: StateProps) => {
    return { auth, role };
};

export default connect(mapStateToProps)(Home);
