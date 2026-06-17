import client from './client';

export const createBooking = async (bookingData: any) => {
  const response = await client.post('/bookings', bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await client.get('/bookings');
  return response.data;
};

export const getBookingDetail = async (id: string) => {
  const response = await client.get(`/bookings/${id}`);
  return response.data;
};

export const cancelBooking = async (id: string) => {
  const response = await client.post(`/bookings/${id}/cancel`);
  return response.data;
};

export const checkAvailability = async (bagId: string, startDate: string, endDate: string) => {
  const response = await client.post('/bookings/availability', { bag_id: bagId, start_date: startDate, end_date: endDate });
  return response.data;
};
