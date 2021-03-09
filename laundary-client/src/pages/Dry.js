import React from 'react';
import { Route } from 'react-router-dom';
import { DryContainer_Predict, DryContainter_Deadline } from '../containers/Dry';

function Dry() {
    return (
        <>
            <Route path = '/dry/predict' component = {DryContainer_Predict}/>
            <Route path = '/dry/possible' component = {DryContainter_Deadline}/>
        </>
    );
}

export default Dry;