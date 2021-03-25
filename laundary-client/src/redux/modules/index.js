import { combineReducers } from 'redux';
import base from './base'
import dry from './dry';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    dry,
    pender : penderReducer
});