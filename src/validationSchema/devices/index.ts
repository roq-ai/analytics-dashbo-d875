import * as yup from 'yup';

export const deviceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  model: yup.string().required(),
  serial_number: yup.string().required(),
  status: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
