// require("./bootstrap");
import "../style/app.scss";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundry from "./components/error-boundry";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ServiceProvider } from "./services/context";
import * as requestService from "./services/request";
import { CookiesProvider } from "react-cookie";

interface IProps {
    [x: string]: any;
}

const { ...value }: IProps = requestService;

render(
    <Provider store={store}>
        <ErrorBoundry>
            <BrowserRouter>
                <ServiceProvider value={value}>
                    <CookiesProvider>
                        <Body />
                    </CookiesProvider>
                </ServiceProvider>
            </BrowserRouter>
        </ErrorBoundry>
    </Provider>,
    document.getElementById("root")
);
