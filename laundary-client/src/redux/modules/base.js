import { createAction, handleActions } from 'redux-actions'
import * as LocationAPI from '../../lib/api/location';
import { pender } from 'redux-pender';
import { Map } from 'immutable';


const INITIALIZE = 'base/SET_INITIALIZE';
const SET_ERROR = 'base/SET_ERROR';
const SET_HEADER_VISIBLE = 'base/SET_HEADER_VISIBILE';
const SET_HEADER_HIDE = 'base/SET_HEADER_HIDE';
const SET_LOCATION = 'base/SET_LOCATION';
const GET_MY_LOCATION = 'base/GET_MY_LOCATION'

export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const setHeaderVisible = createAction(SET_HEADER_VISIBLE);
export const setHeaderHide = createAction(SET_HEADER_HIDE);
export const setLocation = createAction(SET_LOCATION);
export const getMyLocation = createAction(GET_MY_LOCATION, LocationAPI.getMyLocation);

const initialState = Map({
    error : null,
    headerVisible : true,
    location : Map({
        lon : null, //경도
        lat : null,  //위도
        address : null
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
    },
    ...pender ({
        type : GET_MY_LOCATION,
        onSuccess : (state, action) => state.setIn(['location', 'address'], action.payload.data)
    })
}, initialState)