import React from "react";
import { ServiceConsumer } from "../../services/context";

const withRequestService = () => (Wrapped) => {
    return (props) => {
        return (
            <ServiceConsumer>
                {(requestService) => {
                    return (
                        <Wrapped {...props} requestService={requestService} />
                    );
                }}
            </ServiceConsumer>
        );
    };
};

export default withRequestService;
