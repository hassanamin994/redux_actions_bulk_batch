# redux-actions-bulk-batch 
###  A tiny package to batch redux updates on demand avoiding unnecessary re-renders

#### See examples folder

## Working example:

    import { createStore, combineReducers } from  'redux'
	import { reducer, reducerBatchUpdatesEnhancer, actions } from  'redux-actions-bulk-batch';
	import { ADD_TODO } from  './types';
	import  todoReducer  from  './todoReducer';

	function  createRootReducer(additionalReducers  = {}) {
		const  reducers  = {
			batchReduxUpdates: reducer,
			todo: todoReducer,
		}
		return  combineReducers(Object.assign({}, additionalReducers, reducers))
	}
	const  rootReducer  =  createRootReducer();
	const  store  =  createStore(
		reducerBatchUpdatesEnhancer(rootReducer),
	)

	// Start a transaction by dispatch startBatchMode action

    store.dispatch(actions.startBatchMode());

    

    store.subscribe(() => {

    console.log(store.getState())

    })

    // This should've triggered 100 state updates, however using the package it will just trigger one update;

    for(let  i  =  0; i  <  5; i++) {

    store.dispatch({ type: ADD_TODO, payload: 'DO SOMETHING '});

    }

    

    // Apply all updates at one go by dispatching flushBatchedActions

    store.dispatch(actions.flushBatchedActions());
