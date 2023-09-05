interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Network Administrator'],
  customerRoles: [],
  tenantRoles: ['Network Administrator'],
  tenantName: 'Organization',
  applicationName: 'Analytics Dashboard',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage Organization registration',
    'Manage devices under the Organization',
    'View time series traffic graph for a device',
    'Manage sites under the Organization',
  ],
};
