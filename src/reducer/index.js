import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
    batchedActions: [],
    inBatchMode: false,
}
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionTypes.SET_INBATCHMODE:
            return { ...state, inBatchMode: action.payload };
        case actionTypes.ADD_BATCHED_ACTION:
            const newBatchedActions = state.batchedActions.slice();
            newBatchedActions.push(action.payload);
            return { ...state, batchedActions: newBatchedActions };
        case actionTypes.CLEAR_BATCHED_ACTIONS:
            return { ...state, batchedActions: [] };
        default:
            return state;
    }
}