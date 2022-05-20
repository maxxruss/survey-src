import React from "react";
import { ServiceConsumer } from "../../services/context";

type WrappedTypes = any;
type Props = any;

const withRequestService = () => (Wrapped: WrappedTypes) => {
    return (props: Props) => {
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
