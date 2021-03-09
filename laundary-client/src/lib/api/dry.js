import client from './client';

export const calculateResult = () => client.get('/api/dry/whendry');
export const isPossible = ({Year, Month, date}) => client.get('/api/dry/candry', { Year, Month, date });