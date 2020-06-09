
import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./reducer/rootReducer";
import {createLogger } from "redux-logger";
import { routerMiddleware, push } from 'react-router-redux';
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();
const routeMiddleware = routerMiddleware(browserHistory);

const store =  createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? compose(
              applyMiddleware(routeMiddleware),
              window.__REDUX_DEVTOOLS_EXTENSION__(),
          )
        : applyMiddleware(createLogger(),routeMiddleware),
);
export default store;