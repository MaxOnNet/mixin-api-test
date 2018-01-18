import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { miningPoolGroup } from './ReducerMiningPoolGroup';
import { miningPoolData } from './ReducerMiningPoolData';
import { miningPool } from './ReducerMiningPool';

export const rootReducer = combineReducers({
    routerReducer,
    miningPoolGroup,
    miningPoolData,
    miningPool
});

export default { rootReducer };
