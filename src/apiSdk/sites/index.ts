import axios from 'axios';
import queryString from 'query-string';
import { SiteInterface, SiteGetQueryInterface } from 'interfaces/site';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSites = async (query?: SiteGetQueryInterface): Promise<PaginatedInterface<SiteInterface>> => {
  const response = await axios.get('/api/sites', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSite = async (site: SiteInterface) => {
  const response = await axios.post('/api/sites', site);
  return response.data;
};

export const updateSiteById = async (id: string, site: SiteInterface) => {
  const response = await axios.put(`/api/sites/${id}`, site);
  return response.data;
};

export const getSiteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sites/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSiteById = async (id: string) => {
  const response = await axios.delete(`/api/sites/${id}`);
  return response.data;
};
