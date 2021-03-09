import { createAction, handleActions } from 'redux-actions';
import * as DryAPI from '../../lib/api/dry';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

//Action
const INITIALIZE = 'dry/INITIALIZE';
const CHANGE_INFO = 'dry/CHANGE_INFO';
const SET_ERROR = 'dry/SET_ERROR';
const CALCULATE_RESULT = 'dry/CALCULATE_RESULT';
const IS_POSSIBLE = 'dry/IS_POSSIBLE';

//Action Create
export const initialize = createAction(INITIALIZE);
export const changeInfo = createAction(CHANGE_INFO);
export const setError = createAction(SET_ERROR);
export const calculateResult = createAction(CALCULATE_RESULT, DryAPI.calculateResult);
export const isPossible = createAction(IS_POSSIBLE, DryAPI.isPossible);

//Initial State
const initialState = Map({
    dateInfo : null,
    error : null,
    result : null,
    possible : null
});

//Reducer & Export
export default handleActions({
    [INITIALIZE] : () => initialState,
    [CHANGE_INFO] : (state, action) => state.set('dateInfo', action.payload),
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    ...pender({
        type : CALCULATE_RESULT,
        onSuccess : (state, action) => state.set('result', action.payload.data)
    }),
    ...pender({
        type : IS_POSSIBLE,
        onSuccess : (state, action) => state.set('possible', action.payload.data)
    })
}, initialState)

