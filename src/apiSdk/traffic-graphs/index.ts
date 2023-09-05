import axios from 'axios';
import queryString from 'query-string';
import { TrafficGraphInterface, TrafficGraphGetQueryInterface } from 'interfaces/traffic-graph';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTrafficGraphs = async (
  query?: TrafficGraphGetQueryInterface,
): Promise<PaginatedInterface<TrafficGraphInterface>> => {
  const response = await axios.get('/api/traffic-graphs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTrafficGraph = async (trafficGraph: TrafficGraphInterface) => {
  const response = await axios.post('/api/traffic-graphs', trafficGraph);
  return response.data;
};

export const updateTrafficGraphById = async (id: string, trafficGraph: TrafficGraphInterface) => {
  const response = await axios.put(`/api/traffic-graphs/${id}`, trafficGraph);
  return response.data;
};

export const getTrafficGraphById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/traffic-graphs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrafficGraphById = async (id: string) => {
  const response = await axios.delete(`/api/traffic-graphs/${id}`);
  return response.data;
};
