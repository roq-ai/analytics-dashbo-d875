import * as yup from 'yup';

export const trafficGraphValidationSchema = yup.object().shape({
  time_stamp: yup.date().required(),
  incoming_traffic: yup.number().integer().required(),
  outgoing_traffic: yup.number().integer().required(),
  total_traffic: yup.number().integer().required(),
  device_id: yup.string().nullable().required(),
});
