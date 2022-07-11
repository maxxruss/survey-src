import React, { useState, useEffect } from "react";
import withRequestService from "./hoc/with-request-service";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import compose from "../utils/compose";
import { useLocation } from "react-router-dom";
import Spinner from "./spinner";
import Main from "./Main";

interface Props {
    requestService: {
        auth: (method: object) => { result: string; data: string };
    };
    authDataLoaded: (data: any) => {};
    getLang: () => {}
}

type StateProps = {
    id: string;
    name: string;
    email: string;
};

const Body: React.FC<Props> = (props) => {
    const { pathname } = useLocation();
    const firstSegment = pathname.split("/")[1];
    console.log("firstSegment:", firstSegment);

    let lang = '';

    if (firstSegment === "eng") {
         lang = "eng";
    } else {
        lang =  "rus";
    }

    console.log('Body lang', lang)

    console.log('Body props', props)
    
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
            <Main auth={auth} setAuth={setAuth} />
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
    connect(mapStateToProps, mapDispatchToProps)
)(Body);
