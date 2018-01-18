import fetch from 'isomorphic-fetch';

export const REQUEST_MINING_POOL_GROUP = 'REQUEST_MINING_POOL_GROUP';
export const RECEIVE_MINING_POOL_GROUP = 'RECEIVE_MINING_POOL_GROUP';

const APIUrlGetMiningPoolGroup = 'https://api.mixin.lindon-pool.win/api/pool/get_mining_group';

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

export function fetchMiningPoolGroup(filterId = null) {
    return dispatch => {
        dispatch(requestMiningPoolGroup());

        let APIUrl = APIUrlGetMiningPoolGroup;

        if (filterId) {
            APIUrl = `${APIUrlGetMiningPoolGroup}/by-id/${filterId}`;
        }

        return fetch(APIUrl)
            .then(req => req.json())
            .then(json => dispatch(receiveMiningPoolGroup(json)));
    };
}

function shouldFetchMiningPoolGroup(state, filterId = null) {
    const miningPoolGroups = state.miningPoolGroup.items;
    let miningPoolGroup = [];

    if (miningPoolGroup.length) {
        if (filterId) {
            for (miningPoolGroup in miningPoolGroups) {
                if (miningPoolGroup.hasOwnProperty('id')) {
                    if (miningPoolGroup.id === filterId) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

export function fetchMiningPoolGroupIfNeeded(filterId = null) {
    return (dispatch, getState) => {
        if (shouldFetchMiningPoolGroup(getState(), filterId)) {
            return dispatch(fetchMiningPoolGroup(filterId));
        }
    };
}
