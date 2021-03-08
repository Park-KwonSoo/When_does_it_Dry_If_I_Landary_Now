import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as dryActions from '../../redux/modules/dry';

function DryContainer () {
    const dry = useSelector(state => state.dry);
    const dispatch = useDispatch();

    const calculate = () => {
        dispatch(dryActions.calculateResult());
    };

    return (
        <div>
            버튼을 클릭하세요.
            <button onClick = {calculate}/>
            {dry.get('result')}
        </div>
    )
};

export default DryContainer;