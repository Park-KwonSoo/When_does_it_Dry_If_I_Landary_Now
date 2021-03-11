import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Home, Main, Dry } from './pages';
import { Header } from './components/Base';

function App() {

  const base = useSelector(state => state.base);
  const address = base.getIn(['location', 'address']);
  const headerVisible = base.get('headerVisible');

  const history = useHistory();

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
