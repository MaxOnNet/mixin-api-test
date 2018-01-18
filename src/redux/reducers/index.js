import { combineReducers } from 'redux';
// import { routerStateReducer } from 'redux-router';

import { miningPoolGroup } from './ReducerMiningPoolGroup';
import { miningPoolData } from './ReducerMiningPoolData';
import { miningPool } from './ReducerMiningPool';

export const rootReducer = combineReducers({
//    routerStateReducer,
    miningPoolGroup,
    miningPoolData,
    miningPool
});

export default { rootReducer };
