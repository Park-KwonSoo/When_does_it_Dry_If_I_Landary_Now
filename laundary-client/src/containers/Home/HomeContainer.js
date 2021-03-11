import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HomeComponent } from '../../components/Home';
import * as baseActions from '../../redux/modules/base';

function HomeContainer () {
    const base = useSelector(state => state.base);
    const lon = base.getIn(['location', 'lon']);
    const lat = base.getIn(['location', 'lat']);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(baseActions.setHeaderHide());
        dispatch(baseActions.setError({
            message : null
        }));
        return () => {
            dispatch(baseActions.setHeaderVisible());
        };
    }, [dispatch]);

    const handleClick = async () => {
        try {
            navigator.geolocation.watchPosition((position) => {
                dispatch(baseActions.setLocation({
                    'lon' : position.coords.longitude,
                    'lat' : position.coords.latitude
                }));
            });
            
            dispatch(baseActions.getMyLocation({
                lon, lat
            }));

            history.push('/main');
        }   catch (e) {
            dispatch(baseActions.setError({
                message : "알 수 없는 에러가 발생했습니다."
            }));
            console.log(e);
        }
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