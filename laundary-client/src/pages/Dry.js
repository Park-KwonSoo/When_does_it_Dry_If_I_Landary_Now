import React from 'react';
import { Route } from 'react-router-dom';
import { DryContainer } from '../containers/Dry';

function Dry() {
    return (
        <>
            <Route path = '/dry/predict' component = {DryContainer}/>
        </>
    );
}

export default Dry;