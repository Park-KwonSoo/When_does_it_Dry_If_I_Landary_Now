import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as dryActions from '../../redux/modules/dry';
import { DryPossible } from '../../components/Dry';


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
            }))
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
                message : '알 수 없는 에러가 발생했습니다'
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
                    <div>가능</div> : <div>불가능</div>
                }
            </DryPossible>
            {
                error && <div>{error}</div>
            }
        </>
    )
}

export default DryContainter_Deadline;