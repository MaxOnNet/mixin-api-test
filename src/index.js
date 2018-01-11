import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/configureStore';


import Application from './components/Application';


let history = createHashHistory();
const store = configureStore();

const component = (
    <Provider store={store}>
        <HashRouter history={history}>
            <Application />
        </HashRouter>
    </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));

registerServiceWorker();
