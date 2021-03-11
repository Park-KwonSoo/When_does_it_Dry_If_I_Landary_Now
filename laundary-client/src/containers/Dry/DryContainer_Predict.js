import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as dryActions from '../../redux/modules/dry';
import { DryPredict } from '../../components/Dry';


function DryContainer_Predict () {
    const dry = useSelector(state => state.dry);
    const base = useSelector(state => state.base);

    const result = dry.get('result');
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
        }
    }, [dispatch]);

    const handleOnClick = () => {
        try {
            dispatch(dryActions.calculateResult({
                lon,
                lat
            }));

            dispatch(dryActions.setError({
                message : null
            }));
            
        }   catch(e) {
            dispatch(dryActions.setError({
                message : "알 수 없는 에러가 발생헀습니다"
            }));
            console.log(e);
        }
    };

    const handleGoBack = () => {
        history.push('/main')
    }

    return (
        <>
            {   result ?
                <DryPredict onClick = {null} back = {handleGoBack} buttonName = {'확인'}>
                    {"예상 시간 " + result.Year + '년 ' + result.Month + '월 ' + result.date + '일 '
                    + ' ' + result.Hours + ' : ' + result.Minutes}
                </DryPredict> :
                <DryPredict onClick = {handleOnClick} back = {handleGoBack} buttonName = {'과연?'}/>
            }
            {
                error && <div>{error}</div>
            }
        </>
    )
};

export default DryContainer_Predict;