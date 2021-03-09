import React from 'react';
import { useHistory } from 'react-router-dom';
import { MainComponent } from '../../components/Main';

function MainContainer () {

    const history = useHistory();

    const handleGoBack = () => {
        history.push('/');
    }

    const handleGoWhenDry = () => {
        history.push('/dry/predict');
    }

    const handleGoDeadline = () => {
        history.push('/dry/possible')
    }

    return (
        <MainComponent back = {handleGoBack} 
        onClick1 = {handleGoWhenDry} 
        onClick2 = {handleGoDeadline}/> //toDO : 시간 내에 가능한지 구현
    )
};

export default MainContainer;