import * as actionTypes from './types';
const INITIAL_TODO_STATE = {
    todos: [],
}

export default function todoReducer(state = INITIAL_TODO_STATE, action) {
    switch(action.type) {
        case actionTypes.ADD_TODO:
            return { ...state, todos: [...state.todos, action.payload ] };
        default:
            return state;
    }
}
