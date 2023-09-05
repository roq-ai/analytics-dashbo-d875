const mapping: Record<string, string> = {
  'admin-panels': 'admin_panel',
  devices: 'device',
  organizations: 'organization',
  sites: 'site',
  'traffic-graphs': 'traffic_graph',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
