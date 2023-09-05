import * as yup from 'yup';

export const siteValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  status: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
