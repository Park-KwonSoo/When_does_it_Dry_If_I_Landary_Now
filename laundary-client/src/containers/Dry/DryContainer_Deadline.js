import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as dryActions from '../../redux/modules/dry';
import { DryPossible } from '../../components/Dry';

//toDo : changeInfo, get Possible 등 가져오기
function DryContainter_Deadline () {
    const dry = useSelector(state => state.dry);

    const history = useHistory();

    const handleGoBack = () => {
        history.push('/main');
    }

    return (
        <DryPossible back = {handleGoBack}>
            확인해보기
        </DryPossible>
    )
}

export default DryContainter_Deadline;