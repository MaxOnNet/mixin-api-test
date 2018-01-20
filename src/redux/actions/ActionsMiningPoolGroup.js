/* eslint-disable guard-for-in */
import fetch from 'isomorphic-fetch';

export const REQUEST_MINING_POOL_GROUP = 'REQUEST_MINING_POOL_GROUP';
export const RECEIVE_MINING_POOL_GROUP = 'RECEIVE_MINING_POOL_GROUP';

const APIUrlGetMiningPoolGroup = 'https://api.mixin.lindon-pool.win/api/mining/get_pool_group';

function requestMiningPoolGroup() {
    return {
        type: REQUEST_MINING_POOL_GROUP
    };
}

function receiveMiningPoolGroup(json) {
    return {
        type: RECEIVE_MINING_POOL_GROUP,
        items: json.data,
        receivedAt: Date.now()
    };
}

export function fetchMiningPoolGroup(filterArrayId = []) {
    return dispatch => {
        dispatch(requestMiningPoolGroup());

        let APIUrl = APIUrlGetMiningPoolGroup;

        if (filterArrayId.length) {
            const filterArrayIdStr = filterArrayId.toString();
            
            APIUrl = `${APIUrlGetMiningPoolGroup}/by-group-id/${filterArrayIdStr}`;
        }

        return fetch(APIUrl)
            .then(req => req.json())
            .then(json => dispatch(receiveMiningPoolGroup(json)));
    };
}

function shouldFetchMiningPoolGroup(state, filterArrayId = []) {
    const miningPoolGroups = state.miningPoolGroup.items;
    let miningPoolGroup;
    let filterId;
    
    if (filterArrayId.length) {
        for (filterId in filterArrayId) {
            let filterArrayIdFound = false;
    
            for (miningPoolGroup in miningPoolGroups) {
                if (miningPoolGroup.hasOwnProperty('id')) {
                    if (miningPoolGroup.id === filterId) {
                        filterArrayIdFound = true;
                    }
                }
            }
            if (!filterArrayIdFound) {
                return true;
            }
        }
        
        return false;
    }

    return true;
}

export function fetchMiningPoolGroupIfNeeded(filterArrayId = []) {
    return (dispatch, getState) => {
        if (shouldFetchMiningPoolGroup(getState(), filterArrayId)) {
            return dispatch(fetchMiningPoolGroup(filterArrayId));
        }
    };
}
