import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/configureStore';


import Application from './components/Application';


const history = createHashHistory();
const store = configureStore();

const component = (
    <Provider store={store}>
        <Router history={history} >
            <Application />
        </Router>
    </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));

registerServiceWorker();
