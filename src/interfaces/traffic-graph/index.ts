import { DeviceInterface } from 'interfaces/device';
import { GetQueryInterface } from 'interfaces';

export interface TrafficGraphInterface {
  id?: string;
  time_stamp: any;
  incoming_traffic: number;
  outgoing_traffic: number;
  total_traffic: number;
  device_id: string;
  created_at?: any;
  updated_at?: any;

  device?: DeviceInterface;
  _count?: {};
}

export interface TrafficGraphGetQueryInterface extends GetQueryInterface {
  id?: string;
  device_id?: string;
}
