import { createStore, applyMiddleware } from 'redux';
// import { createStore } from 'redux';
import reducer from "./reducers";
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

//applyMiddleware - библиотека в redux, которая встраивает сторонний enchencer
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(reducer,
    applyMiddleware(...middleware));

// const store = createStore(reducer);

export default store
