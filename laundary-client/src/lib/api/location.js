import client from './client';

export const getMyLocation = ({lon, lat}) => client.post('/api/location/getmylocate', {lon, lat});