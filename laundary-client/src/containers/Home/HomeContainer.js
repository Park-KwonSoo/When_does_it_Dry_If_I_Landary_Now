import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HomeComponent } from '../../components/Home';
import * as baseActions from '../../redux/modules/base';
import storage from '../../lib/storage';

function HomeContainer () {
    const base = useSelector(state => state.base);

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

    const handleClick = () => {
        try {
            if(!navigator.geolocation) {
                dispatch(baseActions.setError({
                    message : "브라우저에서 위치를 읽어 올 수 없습니다."
                }));
                
                return;
            }

            navigator.geolocation.watchPosition((position) => {
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;
                
                dispatch(baseActions.setLocation({
                    lon,
                    lat
                }));
                
                dispatch(baseActions.getMyLocation({
                    lon,
                    lat
                }));
            }, (error) => {
                console.log(error);
            })

            const location = base.get('location');
            storage.set('location', location);
            
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