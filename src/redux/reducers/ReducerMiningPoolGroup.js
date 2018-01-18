import { RECEIVE_MINING_POOL_GROUP, REQUEST_MINING_POOL_GROUP } from '../actions/ActionsMiningPoolGroup';

export function miningPoolGroup(state = {
    isFetching: false,
    items: [],
    receiveAt: null
}, action) {
    switch (action.type) {
        case REQUEST_MINING_POOL_GROUP:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_MINING_POOL_GROUP:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items,
                receiveAt: action.receivedAt
            });
        default:
            return state;
    }
}
