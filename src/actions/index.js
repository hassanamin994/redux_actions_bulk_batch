import * as actionTypes from './types';

export const setInBatchMode = inBatch => ({
    type: actionTypes.SET_INBATCHMODE,
    payload: inBatch,
})

export const addBatchedAction = action => ({
    type: actionTypes.ADD_BATCHED_ACTION,
    payload: action,
})

export const clearBatchedActions = () => ({
    type: actionTypes.CLEAR_BATCHED_ACTIONS,
})

export const startBatchMode = () => ({
    type: actionTypes.SET_INBATCHMODE,
    payload: true,
})

export const flushBatchedActions = () => ({
    type: actionTypes.FLUSH_BATCH_UPDATES,
})