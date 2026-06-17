import client from './client';

export const createPaymentIntent = async (bookingId: string) => {
  const response = await client.post('/payments/create-intent', { booking_id: bookingId });
  return response.data;
};

export const getMyPayments = async () => {
  const response = await client.get('/payments');
  return response.data;
};

export const getPaymentDetail = async (id: string) => {
  const response = await client.get(`/payments/${id}`);
  return response.data;
};
