import { combineReducers } from 'redux';
import base from './base'
import dry from './dry';

export default combineReducers({
    base,
    dry
});