/* eslint-disable guard-for-in */
import fetch from 'isomorphic-fetch';

export const REQUEST_MINING_POOL = 'REQUEST_MINING_POOL';
export const RECEIVE_MINING_POOL = 'RECEIVE_MINING_POOL';

const APIUrlGetMiningPool = 'https://api.mixin.lindon-pool.win/api/pool/get_mining_pool';

function requestMiningPool() {
    return {
        type: REQUEST_MINING_POOL
    };
}

function receiveMiningPool(json) {
    return {
        type: RECEIVE_MINING_POOL,
        items: json.data,
        receivedAt: Date.now()
    };
}

export function fetchMiningPool(filterArrayId = [], filterGroupArrayId = []) {
    return dispatch => {
        dispatch(requestMiningPool());

        let APIUrl = APIUrlGetMiningPool;

        if (filterArrayId.length) {
            const filterArrayIdStr = filterArrayId.toString();
        
            APIUrl = `${APIUrlGetMiningPool}/by-pool-id/${filterArrayIdStr}`;
        }

        if (filterGroupArrayId.length) {
            const filterArrayGroupIdStr = filterArrayId.toString();
        
            APIUrl = `${APIUrlGetMiningPool}/by-group-id/${filterArrayGroupIdStr}`;
        }

        return fetch(APIUrl)
            .then(req => req.json())
            .then(json => dispatch(receiveMiningPool(json)));
    };
}

function shouldFetchMiningPool(state, filterArrayId = [], filterGroupArrayId = []) {
    const miningPools = state.miningPool.items;
    let miningPool = [];
    let filterIdFound = false;
    let filterGroupIdFound = false;
    let filterId;
    let filterGroupId;
    
    if (filterArrayId.length) {
        for (filterId in filterArrayId) {
            let filterArrayIdFound = false;
            
            for (miningPool in miningPools) {
                if (miningPool.hasOwnProperty('id')) {
                    if (miningPool.id === filterId) {
                        filterArrayIdFound = true;
                    }
                }
            }
            if (!filterArrayIdFound) {
                filterIdFound = false;
            }
        }
    
        filterIdFound = true;
    }
    
    if (filterGroupArrayId.length) {
        for (filterGroupId in filterGroupArrayId) {
            let filterGroupArrayIdFound = false;
            
            for (miningPool in miningPools) {
                if (miningPool.hasOwnProperty('group_id')) {
                    if (miningPool.group_id === filterGroupId) {
                        filterGroupArrayIdFound = true;
                    }
                }
            }
            if (!filterGroupArrayIdFound) {
                filterGroupIdFound = false;
            }
        }
        
        filterGroupIdFound = true;
    }
    
    if (filterGroupIdFound && filterIdFound) {
        return false;
    }
    
    return true;
}

export function fetchMiningPoolIfNeeded(filterArrayId = [], filterGroupArrayId = []) {
    return (dispatch, getState) => {
        if (shouldFetchMiningPool(getState(), filterArrayId, filterGroupArrayId)) {
            return dispatch(fetchMiningPool(filterArrayId, filterGroupArrayId));
        }
    };
}
