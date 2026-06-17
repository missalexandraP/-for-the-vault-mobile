import client from './client';

export const login = async (email: string, password: string) => {
  const response = await client.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData: any) => {
  const response = await client.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await client.get('/auth/me');
  return response.data;
};

export const submitVerification = async (verificationData: any) => {
  const response = await client.post('/users/verifications', verificationData);
  return response.data;
};
