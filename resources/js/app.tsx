require("./bootstrap");
// import "../sass/app.scss";
import React from "react";
import { render } from "react-dom";
import {
    BrowserRouter,
    Route,
    useRouteMatch,
    useParams,
    useLocation,
} from "react-router-dom";
import ErrorBoundry from "./components/error-boundry";
import { ThemeProvider } from "@mui/material/styles";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ServiceProvider } from "./services/context";
// import RequestService from "./services/request";
import * as requestService from "./services/request";
import theme from "./theme";

type ValueTypes = any;

const { ...value }: ValueTypes = requestService;

render(
    <Provider store={store}>
        <ErrorBoundry>
            <BrowserRouter>
                <ServiceProvider value={value}>
                    <ThemeProvider theme={theme}>
                        <Body />
                    </ThemeProvider>
                </ServiceProvider>
            </BrowserRouter>
        </ErrorBoundry>
    </Provider>,
    document.getElementById("root")
);
