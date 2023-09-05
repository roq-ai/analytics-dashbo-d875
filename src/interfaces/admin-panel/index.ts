import { OrganizationInterface } from 'interfaces/organization';
import { DeviceInterface } from 'interfaces/device';
import { SiteInterface } from 'interfaces/site';
import { GetQueryInterface } from 'interfaces';

export interface AdminPanelInterface {
  id?: string;
  organization_id: string;
  device_id: string;
  site_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  device?: DeviceInterface;
  site?: SiteInterface;
  _count?: {};
}

export interface AdminPanelGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
  device_id?: string;
  site_id?: string;
}
