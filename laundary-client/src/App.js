import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Dry } from './pages';

function App() {
  return (
    <>
      <Route exact path = '/' component = { Home }/>
      <Route path = '/dry' component = { Dry } />
    </>
  );
}

export default App;
