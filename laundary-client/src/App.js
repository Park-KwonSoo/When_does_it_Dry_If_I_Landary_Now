import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

import storage from './lib/storage';
import * as baseActions from './redux/modules/base';

import { Home, Main, Dry } from './pages';
import { Header } from './components/Base';

function App() {

    const base = useSelector(state => state.base);
    const address = base.getIn(['location', 'address']);
    const headerVisible = base.get('headerVisible');

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect (() => {
        const location = storage.get('location');
        if(!location) return;
        
        dispatch(baseActions.setLocation(location));

        return () => {
            storage.remove('location');
        }

    }, [dispatch]);

    const handleGoHome = () => {
      history.push('/');
    }

    return (
      <>
        {
          headerVisible && <Header onClick = {handleGoHome}
          address = {address}>지금 빨면 언제 말라?</Header>
        }
        <Route exact path = '/' component = { Home }/>
        <Route path = '/main' component = { Main }/>
        <Route path = '/dry' component = { Dry } />
      </>
    );
}

export default App;
