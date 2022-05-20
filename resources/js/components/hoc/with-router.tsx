import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

type WrappedTypes = any;
type Props = any;

const withRouter = () => (Wrapped: WrappedTypes) => {
    return (props: Props) => {
        // const location = useLocation();
        // const navigate = useNavigate();

        return (
            <Wrapped
                // location={location}
                // navigate={navigate}
                {...props}
            />
        );
    };
};

export default withRouter;
