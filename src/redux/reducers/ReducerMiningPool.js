import { RECEIVE_MINING_POOL, REQUEST_MINING_POOL } from '../actions/ActionsMiningPool';

export function miningPool(state = {
    isFetching: false,
    items: [],
    receiveAt: null
}, action) {
    switch (action.type) {
        case REQUEST_MINING_POOL:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_MINING_POOL:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items,
                receiveAt: action.receivedAt
            });
        default:
            return state;
    }
}
