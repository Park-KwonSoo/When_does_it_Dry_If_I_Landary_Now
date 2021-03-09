import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as dryActions from '../../redux/modules/dry';
import { DryComponent } from '../../components/Dry';


function DryContainer () {
    const dry = useSelector(state => state.dry);
    const result = dry.get('result');
    //toDo : const error = dry.get('error');

    const history = useHistory();
    const dispatch = useDispatch();

    const calculate = () => {
        try {   
            dispatch(dryActions.calculateResult())
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
        <DryComponent onClick = {calculate} back = {handleGoBack}>
            {
                result && <div>{"예상 시간 " + result}</div>
            }
        </DryComponent>
    )
};

export default DryContainer;