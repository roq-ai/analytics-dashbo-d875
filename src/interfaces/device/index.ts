import { AdminPanelInterface } from 'interfaces/admin-panel';
import { TrafficGraphInterface } from 'interfaces/traffic-graph';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DeviceInterface {
  id?: string;
  name: string;
  model: string;
  serial_number: string;
  status: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  admin_panel?: AdminPanelInterface[];
  traffic_graph?: TrafficGraphInterface[];
  organization?: OrganizationInterface;
  _count?: {
    admin_panel?: number;
    traffic_graph?: number;
  };
}

export interface DeviceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  model?: string;
  serial_number?: string;
  status?: string;
  organization_id?: string;
}
