import { AdminPanelInterface } from 'interfaces/admin-panel';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SiteInterface {
  id?: string;
  name: string;
  location: string;
  status: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  admin_panel?: AdminPanelInterface[];
  organization?: OrganizationInterface;
  _count?: {
    admin_panel?: number;
  };
}

export interface SiteGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  status?: string;
  organization_id?: string;
}
