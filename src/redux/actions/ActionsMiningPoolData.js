/* eslint-disable guard-for-in */
import fetch from 'isomorphic-fetch';

export const REQUEST_MINING_POOL_DATA = 'REQUEST_MINING_POOL_DATA';
export const RECEIVE_MINING_POOL_DATA = 'RECEIVE_MINING_POOL_DATA';
export const UPDATE_MINING_POOL_DATA = 'UPDATE_MINING_POOL_DATA';

const APIUrlGetMiningPoolData = 'https://api.mixin.lindon-pool.win/api/mining/get_pool_data';

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

function updateMiningPoolData(data, receiveDate) {
    return {
        type: UPDATE_MINING_POOL_DATA,
        items: data,
        receivedAt: receiveDate
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

export function updateMiningPoolDataAWait() {
    return (dispatch, getState) => {
        const miningPoolsData = getState().miningPoolData.items;
        const miningPoolsDataReceiveAt = getState().miningPoolData.receiveAt;
        const miningPoolsDataNew = [];
    
        for (let i = 0; i < miningPoolsData.length; i++) {
            const item = miningPoolsData[i];
        
            if (!item.hasOwnProperty('date_await_init')) {
                item.date_await_init = item.date_await;
            }
        
            item.date_await = item.date_await_init + Math.round((Date.now() - miningPoolsDataReceiveAt) / 1000);
        
            miningPoolsDataNew.push(item);
        }
        return dispatch(updateMiningPoolData(miningPoolsDataNew, miningPoolsDataReceiveAt));
    };
}
