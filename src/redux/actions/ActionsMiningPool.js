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

export function fetchMiningPool(filterId = null, filterGroupId = null) {
    return dispatch => {
        dispatch(requestMiningPool());

        let APIUrl = APIUrlGetMiningPool;

        if (filterId) {
            APIUrl = `${APIUrlGetMiningPool}/by-id/${filterId}`;
        }

        if (filterGroupId) {
            APIUrl = `${APIUrlGetMiningPool}/by-group-id/${filterGroupId}`;
        }
        return fetch(APIUrl)
            .then(req => req.json())
            .then(json => dispatch(receiveMiningPool(json)));
    };
}

function shouldFetchMiningPool(state, filterId = null, filterGroupId = null) {
    const miningPools = state.miningPool.items;
    let miningPool = [];

    if (miningPool.length) {
        if (filterId) {
            for (miningPool in miningPools) {
                if (miningPool.hasOwnProperty('id')) {
                    if (miningPool.id === filterId) {
                        return false;
                    }
                }
            }
        }

        if (filterGroupId) {
            for (miningPool in miningPools) {
                if (miningPool.hasOwnProperty('group_id')) {
                    if (miningPool.group_id === filterGroupId) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

export function fetchMiningPoolIfNeeded(filterId = null, filterGroupId = null) {
    return (dispatch, getState) => {
        if (shouldFetchMiningPool(getState(), filterId, filterGroupId)) {
            return dispatch(fetchMiningPool(filterId, filterGroupId));
        }
    };
}
