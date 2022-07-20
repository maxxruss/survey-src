import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

type Props = {
    children: JSX.Element;
};

export default class ErrorBoundry extends Component {
    constructor(readonly props: Props) {
        super(props);
    }
    state = {
        hasError: false,
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        return this.props.children;
    }
}
