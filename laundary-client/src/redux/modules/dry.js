import { createAction, handleActions } from 'redux-actions';
import * as DryAPI from '../../lib/api/dry';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

//Action
const INITIALIZE = 'dry/INITIALIZE';
const SET_ERROR = 'dry/SET_ERROR';
const CALCULATE_RESULT = 'dry/CALCULATE_RESULT';

//Action Create
export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const calculateResult = createAction(CALCULATE_RESULT, DryAPI.calculateResult);

//Initial State
const initialState = Map({
    error : null,
    result : null,
});

//Reducer & Export
export default handleActions({
    [INITIALIZE] : () => initialState,
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    ...pender({
        type : CALCULATE_RESULT,
        onSuccess : (state, action) => state.set('result', action.payload.data)
    })
}, initialState)

