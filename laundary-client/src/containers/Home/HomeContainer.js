import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HomeComponent } from '../../components/Home';
import * as baseActions from '../../redux/modules/base';

function HomeContainer () {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(baseActions.setHeaderHide());
        return () => {
            dispatch(baseActions.setHeaderVisible());
        };
    }, [dispatch]);

    const handleClick = () => {
        history.push('/main');
    }

    return (
        <HomeComponent onClick = {handleClick}>
            지금 빨면
            <br></br>
            언제 말라?
        </HomeComponent>
    )
}

export default HomeContainer;