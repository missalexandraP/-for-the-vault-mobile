import client from './client';

export const joinWaitlist = async (bagId: string, maxDailyRate: number, startDate: string, endDate: string) => {
  const response = await client.post('/waitlist', { bag_id: bagId, max_daily_rate: maxDailyRate, start_date: startDate, end_date: endDate });
  return response.data;
};

export const getMyWaitlist = async () => {
  const response = await client.get('/waitlist');
  return response.data;
};

export const leaveWaitlist = async (id: string) => {
  const response = await client.delete(`/waitlist/${id}`);
  return response.data;
};
