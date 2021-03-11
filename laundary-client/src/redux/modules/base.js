import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable';


const INITIALIZE = 'base/SET_INITIALIZE';
const SET_ERROR = 'base/SET_ERROR';
const SET_HEADER_VISIBLE = 'base/SET_HEADER_VISIBILE';
const SET_HEADER_HIDE = 'base/SET_HEADER_HIDE';
const SET_LOCATION = 'base/SET_LOCATION';

export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const setHeaderVisible = createAction(SET_HEADER_VISIBLE);
export const setHeaderHide = createAction(SET_HEADER_HIDE);
export const setLocation = createAction(SET_LOCATION);

const initialState = Map({
    error : null,
    headerVisible : true,
    location : Map({
        lon : null, //경도
        lat : null  //위도
    })
});

export default handleActions({
    [INITIALIZE] : () => initialState,
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    [SET_HEADER_VISIBLE] : (state) => state.set('headerVisible', true),
    [SET_HEADER_HIDE] : (state) => state.set('headerVisible', false),
    [SET_LOCATION] : (state, action) => {
        const { lon, lat } = action.payload;
        return state.setIn(['location', 'lon'], lon).setIn(['location', 'lat'], lat);
    }
}, initialState)