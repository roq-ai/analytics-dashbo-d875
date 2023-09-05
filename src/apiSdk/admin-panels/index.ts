import axios from 'axios';
import queryString from 'query-string';
import { AdminPanelInterface, AdminPanelGetQueryInterface } from 'interfaces/admin-panel';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAdminPanels = async (
  query?: AdminPanelGetQueryInterface,
): Promise<PaginatedInterface<AdminPanelInterface>> => {
  const response = await axios.get('/api/admin-panels', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAdminPanel = async (adminPanel: AdminPanelInterface) => {
  const response = await axios.post('/api/admin-panels', adminPanel);
  return response.data;
};

export const updateAdminPanelById = async (id: string, adminPanel: AdminPanelInterface) => {
  const response = await axios.put(`/api/admin-panels/${id}`, adminPanel);
  return response.data;
};

export const getAdminPanelById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/admin-panels/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAdminPanelById = async (id: string) => {
  const response = await axios.delete(`/api/admin-panels/${id}`);
  return response.data;
};
