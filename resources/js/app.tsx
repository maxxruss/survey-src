require("./bootstrap");
// import "../sass/app.scss";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundry from "./components/error-boundry";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ServiceProvider } from "./services/context";
// import RequestService from "./services/request";
import * as requestService from "./services/request";

type ValueTypes = any;

const theme = createTheme(
    {
        palette: {
            primary: { main: "#1976d2" },
        },
    },
    ruRU
);

// const requestService = new RequestService();

// if (module.hot) module.hot.accept();

// var root = document.getElementById('root')
// root.innerText = "ok11!"

const { ...value }: ValueTypes = requestService;

render(
    <Provider store={store}>
        <ErrorBoundry>
            <ServiceProvider value={value}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <Body />
                    </ThemeProvider>
                </BrowserRouter>
            </ServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById("root")
);
