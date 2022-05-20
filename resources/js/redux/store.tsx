import { createStore, applyMiddleware } from "redux";
// import { createStore } from 'redux';
import reducer from "./reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const Logger: any = createLogger();

//applyMiddleware - библиотека в redux, которая встраивает сторонний enchencer
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
    middleware.push(Logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

// const store = createStore(reducer);

export default store;
