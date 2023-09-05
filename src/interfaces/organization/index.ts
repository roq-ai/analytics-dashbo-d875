import { AdminPanelInterface } from 'interfaces/admin-panel';
import { DeviceInterface } from 'interfaces/device';
import { SiteInterface } from 'interfaces/site';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  admin_panel?: AdminPanelInterface[];
  device?: DeviceInterface[];
  site?: SiteInterface[];
  user?: UserInterface;
  _count?: {
    admin_panel?: number;
    device?: number;
    site?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
