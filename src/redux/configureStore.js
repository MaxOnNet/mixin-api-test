import { applyMiddleware,  createStore } from 'redux';
import { rootReducer } from './reducers';

import thunk from 'redux-thunk';

export default function (initialState = {}) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

