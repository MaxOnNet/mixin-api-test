import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { miningPoolGroup } from './ReducerMiningPoolGroup';
import { miningPoolData } from './ReducerMiningPoolData';
import { miningPool } from './ReducerMiningPool';
import { MUI } from './ReducerMUI';

export const rootReducer = combineReducers({
    routerReducer,
    MUI,
    miningPoolGroup,
    miningPoolData,
    miningPool
});

export default { rootReducer };
