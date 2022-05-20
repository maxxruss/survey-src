import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

interface Props {
    children: any;
}

export default class ErrorBoundry extends Component<Props> {
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
