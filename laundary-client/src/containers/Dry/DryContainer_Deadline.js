import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as dryActions from '../../redux/modules/dry';
import { DryPossible } from '../../components/Dry';
import { Error } from '../../components/Base';


function DryContainter_Deadline () {
    const dry = useSelector(state => state.dry);
    const base = useSelector(state => state.base);
   
    const possible = dry.get('possible');
    const dateInfo = dry.get('dateInfo');
    const error = dry.get('error');

    const lon = base.getIn(['location', 'lon']);
    const lat = base.getIn(['location', 'lat']);


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect (() => {
        return () => {
            dispatch(dryActions.setError({
                message : null
            }));

            dispatch(dryActions.isPossibleInitialize());
        };
    }, [dispatch]);

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        dispatch(dryActions.changeInfo({
            name,
            value
        }));
    }

    const handleOnClick = () => {
        try {
            const Time = dateInfo.value;
            dispatch(dryActions.isPossible({
                Time,
                lon,
                lat
            }));

            dispatch(dryActions.setError({
                message : null
            }));

        }   catch(e) {
            dispatch(dryActions.setError({
                message : '날짜를 입력해야 합니다.'
            }));
            console.log(e);
        }
    }

    const handleGoBack = () => {
        history.push('/main');
    }

    return (
        <>
            <DryPossible back = {handleGoBack} onClick = {handleOnClick} onChange = {handleChangeInfo} name = 'Time'>
                {
                    possible ? 
                    <div>{possible}</div> : <div></div>
                }
            </DryPossible>
            {
                error && <Error visible = {true}>{error}</Error>
            }  
        </>
    )
}

export default DryContainter_Deadline;