import client from './client';

export const getInventory = async (filters?: any) => {
  const response = await client.get('/inventory', { params: filters });
  return response.data;
};

export const getBagDetail = async (id: string) => {
  const response = await client.get(`/inventory/${id}`);
  return response.data;
};

export const getBrands = async () => {
  const response = await client.get('/inventory/brands');
  return response.data;
};

export const getCategories = async () => {
  const response = await client.get('/inventory/categories');
  return response.data;
};
