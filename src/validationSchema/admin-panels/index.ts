import * as yup from 'yup';

export const adminPanelValidationSchema = yup.object().shape({
  organization_id: yup.string().nullable().required(),
  device_id: yup.string().nullable().required(),
  site_id: yup.string().nullable().required(),
});
