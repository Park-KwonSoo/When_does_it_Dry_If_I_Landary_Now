import client from './client';

export const calculateResult = ({lon, lat}) => client.post('/api/dry/whendry', {lon, lat});
export const isPossible = ({Time, lon, lat}) => client.post('/api/dry/candry', {Time, lon, lat});