import client from './client';

export const calculateResult = () => client.get('/api/dry/whendry');