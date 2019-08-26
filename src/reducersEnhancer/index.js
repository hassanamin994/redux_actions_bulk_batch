import { FLUSH_BATCH_UPDATES } from '../actions/types';
import * as actions from '../actions';

export default (combinedReducers) => (state = {}, action) => {
    if (!state || !action) {
        return combinedReducers(state, action);
    }

    if (state && state.batchReduxUpdates) {
        const { inBatchMode } = state.batchReduxUpdates;
        if (inBatchMode & action.type !== FLUSH_BATCH_UPDATES) {
            let nextState = {...state};
            nextState = combinedReducers(nextState, actions.addBatchedAction(action));
            return nextState;
        }
    }

    switch (action.type) {
        case FLUSH_BATCH_UPDATES:
            let nextState = { ...state };
            const { batchedActions } = nextState.batchReduxUpdates;
            batchedActions.forEach(action => {
                nextState = combinedReducers(nextState, action);
            });
            nextState = combinedReducers(nextState, actions.setInBatchMode(false));
            nextState = combinedReducers(nextState, actions.clearBatchedActions())
            return nextState;
        default:
            return combinedReducers(state, action)
    }
}
