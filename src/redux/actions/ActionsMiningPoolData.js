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

export function fetchMiningPoolData(filterId = null, filterGroupId = null) {
    return dispatch => {
        dispatch(requestMiningPoolData());

        let APIUrl = APIUrlGetMiningPoolData;

        if (filterId) {
            APIUrl = `${APIUrlGetMiningPoolData}/by-id/${filterId}`;
        }

        if (filterGroupId) {
            APIUrl = `${APIUrlGetMiningPoolData}/by-group-id/${filterGroupId}`;
        }
        return fetch(APIUrl)
            .then(req => req.json())
            .then(json => dispatch(receiveMiningPoolData(json)));
    };
}

function shouldFetchMiningPoolData(state, filterId = null, filterGroupId = null) {
    const miningPoolsData = state.miningPoolData.items;
    let miningPoolData = [];

    if (miningPoolData.length) {
        if (filterId) {
            for (miningPoolData in miningPoolsData) {
                if (miningPoolData.hasOwnProperty('id')) {
                    if (miningPoolData.id === filterId) {
                        return false;
                    }
                }
            }
        }

        if (filterGroupId) {
            for (miningPoolData in miningPoolsData) {
                if (miningPoolData.hasOwnProperty('group_id')) {
                    if (miningPoolData.group_id === filterGroupId) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

export function fetchMiningPoolDataIfNeeded(filterId = null, filterGroupId = null) {
    return (dispatch, getState) => {
        if (shouldFetchMiningPoolData(getState(), filterId, filterGroupId)) {
            return dispatch(fetchMiningPoolData(filterId, filterGroupId));
        }
    };
}

function updateFetchMiningPoolDataAWait(state) {
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
        return updateFetchMiningPoolDataAWait(getState());
    };
}