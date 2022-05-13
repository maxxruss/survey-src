import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

const withRouter = () => (Wrapped) => {
    return (props) => {
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
