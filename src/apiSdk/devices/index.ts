import axios from 'axios';
import queryString from 'query-string';
import { DeviceInterface, DeviceGetQueryInterface } from 'interfaces/device';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDevices = async (query?: DeviceGetQueryInterface): Promise<PaginatedInterface<DeviceInterface>> => {
  const response = await axios.get('/api/devices', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDevice = async (device: DeviceInterface) => {
  const response = await axios.post('/api/devices', device);
  return response.data;
};

export const updateDeviceById = async (id: string, device: DeviceInterface) => {
  const response = await axios.put(`/api/devices/${id}`, device);
  return response.data;
};

export const getDeviceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/devices/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDeviceById = async (id: string) => {
  const response = await axios.delete(`/api/devices/${id}`);
  return response.data;
};
