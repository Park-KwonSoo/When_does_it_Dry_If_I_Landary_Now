import client from './client';

export const calculateResult = () => client.get('/api/dry/whendry');
export const isPossible = ({Time}) => client.post('/api/dry/candry', { Time });