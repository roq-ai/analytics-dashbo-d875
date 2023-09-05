import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createTrafficGraph } from 'apiSdk/traffic-graphs';
import { trafficGraphValidationSchema } from 'validationSchema/traffic-graphs';
import { DeviceInterface } from 'interfaces/device';
import { getDevices } from 'apiSdk/devices';
import { TrafficGraphInterface } from 'interfaces/traffic-graph';

function TrafficGraphCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrafficGraphInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrafficGraph(values);
      resetForm();
      router.push('/traffic-graphs');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrafficGraphInterface>({
    initialValues: {
      time_stamp: new Date(new Date().toDateString()),
      incoming_traffic: 0,
      outgoing_traffic: 0,
      total_traffic: 0,
      device_id: (router.query.device_id as string) ?? null,
    },
    validationSchema: trafficGraphValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Traffic Graphs',
              link: '/traffic-graphs',
            },
            {
              label: 'Create Traffic Graph',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Traffic Graph
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="time_stamp" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Time Stamp
            </FormLabel>
            <DatePicker
              selected={formik.values?.time_stamp ? new Date(formik.values?.time_stamp) : null}
              onChange={(value: Date) => formik.setFieldValue('time_stamp', value)}
            />
          </FormControl>

          <NumberInput
            label="Incoming Traffic"
            formControlProps={{
              id: 'incoming_traffic',
              isInvalid: !!formik.errors?.incoming_traffic,
            }}
            name="incoming_traffic"
            error={formik.errors?.incoming_traffic}
            value={formik.values?.incoming_traffic}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('incoming_traffic', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Outgoing Traffic"
            formControlProps={{
              id: 'outgoing_traffic',
              isInvalid: !!formik.errors?.outgoing_traffic,
            }}
            name="outgoing_traffic"
            error={formik.errors?.outgoing_traffic}
            value={formik.values?.outgoing_traffic}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('outgoing_traffic', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Traffic"
            formControlProps={{
              id: 'total_traffic',
              isInvalid: !!formik.errors?.total_traffic,
            }}
            name="total_traffic"
            error={formik.errors?.total_traffic}
            value={formik.values?.total_traffic}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_traffic', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<DeviceInterface>
            formik={formik}
            name={'device_id'}
            label={'Select Device'}
            placeholder={'Select Device'}
            fetcher={getDevices}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/traffic-graphs')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'traffic_graph',
    operation: AccessOperationEnum.CREATE,
  }),
)(TrafficGraphCreatePage);
