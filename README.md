# redux-actions-bulk-batch 
###  A tiny package to batch redux updates on demand avoiding unnecessary re-renders

#### See examples folder

### Installation:

> npm i --save redux-actions-bulk-batch
### Usage:

 - dispatch a `startBatchMode()` action to halt the state update
 - dispatch all actions normally that you want batched
 - After all actions have been dispatched, dispatch `flushBatchedActions()` action to execute all actions from step 2 

### Notes:

- It's very important to have in your reducers the reducer this package uses with the key `batchReduxUpdates`, otherwise this will not work
- The root reducer that's returned from combinedReducers should be passed to the reducerBatchUpdatesEnhancer enhancer
- After calling `actions.startBatchMode()`, all state updates gets cached to be executed at one go when 
`flushBatchedActions()` is called.
- Make sure to eventually run `flushBatchedActions()` to give control back to the store

## Working example:

    import { createStore, combineReducers } from  'redux'
	import { reducer, reducerBatchUpdatesEnhancer, actions } from  'redux-actions-bulk-batch';
	import { ADD_TODO } from  './types';
	import  todoReducer  from  './todoReducer';

	function  createRootReducer(additionalReducers  = {}) {
        // It's very important to have in your reducers 
        // the reducer this package uses with the key
        // `batchReduxUpdates`, otherwise this will not work
		const  reducers  = {
			batchReduxUpdates: reducer,
			todo: todoReducer,
		}
		return  combineReducers(Object.assign({}, additionalReducers, reducers))
	}
	const  rootReducer  =  createRootReducer();

    // Pass the rootReducer to the reducerBatchUpdatesEnhancer from the package
	const  store  =  createStore(
		reducerBatchUpdatesEnhancer(rootReducer),
	)

	// Start a transaction by dispatch startBatchMode action
    store.dispatch(actions.startBatchMode());

    // This should've triggered 5 state updates for ADD_TODO, however using the package it will just trigger one update;
    for(let  i  =  0; i  <  5; i++) {

        store.dispatch({ type: ADD_TODO, payload: 'DO SOMETHING '});

    }

    

    // Apply all updates at one go by dispatching flushBatchedActions

    store.dispatch(actions.flushBatchedActions());
