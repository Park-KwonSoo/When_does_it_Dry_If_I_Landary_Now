import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable';


const INITIALIZE = 'base/SET_INITIALIZE';
const SET_ERROR = 'base/SET_ERROR';
const SET_HEADER_VISIBLE = 'base/SET_HEADER_VISIBILE';
const SET_HEADER_HIDE = 'base/SET_HEADER_HIDE';

export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const setHeaderVisible = createAction(SET_HEADER_VISIBLE);
export const setHeaderHide = createAction(SET_HEADER_HIDE);

const initialState = Map({
    error : null,
    headerVisible : true
});

export default handleActions({
    [INITIALIZE] : () => initialState,
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    [SET_HEADER_VISIBLE] : (state) => state.set('headerVisible', true),
    [SET_HEADER_HIDE] : (state) => state.set('headerVisible', false)
}, initialState)