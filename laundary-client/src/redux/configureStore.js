import { createStore, applyMiddleware } from 'redux';
import  { composeWithDevTools } from "redux-devtools-extension";
import penderMiddleware from 'redux-pender';
import reducer from './modules';

//toDo : implement Store
const configureStore = (initialState) => {
    const store  = createStore(reducer, initialState, composeWithDevTools(
        applyMiddleware(penderMiddleware())
    ));

    return store;
}

export default configureStore;