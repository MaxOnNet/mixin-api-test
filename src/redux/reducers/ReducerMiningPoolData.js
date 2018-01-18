import { RECEIVE_MINING_POOL_DATA, REQUEST_MINING_POOL_DATA } from '../actions/ActionsMiningPoolData';

export function miningPoolData(state = {
    isFetching: false,
    items: [],
    receiveAt: null
}, action) {
    switch (action.type) {
        case REQUEST_MINING_POOL_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_MINING_POOL_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items,
                receiveAt: action.receivedAt
            });
        default:
            return state;
    }
}
