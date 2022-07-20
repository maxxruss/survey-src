import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

type WrappedTypes = any;
type Props = any;

const withRouter = () => (Wrapped: WrappedTypes) => {
    return (props: Props) => {
        return <Wrapped {...props} />;
    };
};

export default withRouter;
