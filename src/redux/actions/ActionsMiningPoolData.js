/* eslint-disable guard-for-in */
import fetch from 'isomorphic-fetch';

export const REQUEST_MINING_POOL_DATA = 'REQUEST_MINING_POOL_DATA';
export const RECEIVE_MINING_POOL_DATA = 'RECEIVE_MINING_POOL_DATA';

const APIUrlGetMiningPoolData = 'https://api.mixin.lindon-pool.win/api/pool/get_mining_pool_data';

function requestMiningPoolData() {
    return {
        type: REQUEST_MINING_POOL_DATA
    };
}

function receiveMiningPoolData(json) {
    return {
        type: RECEIVE_MINING_POOL_DATA,
        items: json.data,
        receivedAt: Date.now()
    };
}

export function fetchMiningPoolData(filterArrayId = [], filterGroupArrayId = []) {
    return dispatch => {
        dispatch(requestMiningPoolData());

        let APIUrl = APIUrlGetMiningPoolData;
    
        if (filterArrayId.length) {
            const filterArrayIdStr = filterArrayId.toString();
        
            APIUrl = `${APIUrlGetMiningPoolData}/by-pool-id/${filterArrayIdStr}`;
        }
    
        if (filterGroupArrayId.length) {
            const filterArrayGroupIdStr = filterArrayId.toString();
        
            APIUrl = `${APIUrlGetMiningPoolData}/by-group-id/${filterArrayGroupIdStr}`;
        }
        
        return fetch(APIUrl)
            .then(req => req.json())
            .then(json => dispatch(receiveMiningPoolData(json)));
    };
}

function shouldFetchMiningPoolData(state, filterArrayId = [], filterGroupArrayId = []) {
    const miningPoolsData = state.miningPoolData.items;
    let miningPoolData = [];
    let filterIdFound = false;
    let filterGroupIdFound = false;
    let filterId;
    let filterGroupId;
    
    if (filterArrayId.length) {
        for (filterId in filterArrayId) {
            let filterArrayIdFound = false;
            
            for (miningPoolData in miningPoolsData) {
                if (miningPoolData.hasOwnProperty('id')) {
                    if (miningPoolData.id === filterId) {
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
            
            for (miningPoolData in miningPoolsData) {
                if (miningPoolData.hasOwnProperty('group_id')) {
                    if (miningPoolData.group_id === filterGroupId) {
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

export function fetchMiningPoolDataIfNeeded(filterArrayId = [], filterGroupArrayId = []) {
    return (dispatch, getState) => {
        if (shouldFetchMiningPoolData(getState(), filterArrayId, filterGroupArrayId)) {
            return dispatch(fetchMiningPoolData(filterArrayId, filterGroupArrayId));
        }
    };
}

function updateFetchMiningPoolData(state) {
    let miningPoolsData = state.miningPoolData.items;

    for (let i = 0; i < miningPoolsData.length; i++) {
        let item = miningPoolsData[i];

        item.date_await = Date.now() - miningPoolsData[i].date_update;
        miningPoolsData[i] = item;
    }

    return {
        type: RECEIVE_MINING_POOL_DATA,
        items: miningPoolsData,
        receivedAt: Date.now()
    };
}

export function updateMiningPoolData() {
    return (dispatch, getState) => {
        return updateFetchMiningPoolData(getState());
    };
}
