import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as dryActions from '../../redux/modules/dry';
import { DryPossible } from '../../components/Dry';

//toDo : changeInfo, get Possible 등 가져오기
function DryContainter_Deadline () {
    const dry = useSelector(state => state.dry);
    const possible = dry.get('possible');
    const error = dry.get('error');

    const history = useHistory();
    const dispatch = useDispatch();

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        dispatch(dryActions.changeInfo({
            name,
            value
        }));
    }

    const handleOnClick = () => {
        try {
            
        }   catch(e) {
            dispatch(dryActions.setError({
                message : '알 수 없는 에러가 발생했습니다'
            }));
        }
    }

    const handleGoBack = () => {
        history.push('/main');
    }

    return (
        <>
            <DryPossible back = {handleGoBack} onClick = {handleOnClick} onChange = {handleChangeInfo} name = 'Time'>
                확인해보기
            </DryPossible>
            {
                error && <div>{error}</div>
            }
        </>
    )
}

export default DryContainter_Deadline;