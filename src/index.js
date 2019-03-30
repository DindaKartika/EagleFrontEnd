import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import AppRoute from './AppRoute';
import {Provider} from "unistore/react";
import {store} from './store';
import * as serviceWorker from './serviceWorker';

const render = Component =>{
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Component />
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
        );
}


render(AppRoute);
serviceWorker.unregister();