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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getTrafficGraphById, updateTrafficGraphById } from 'apiSdk/traffic-graphs';
import { trafficGraphValidationSchema } from 'validationSchema/traffic-graphs';
import { TrafficGraphInterface } from 'interfaces/traffic-graph';
import { DeviceInterface } from 'interfaces/device';
import { getDevices } from 'apiSdk/devices';

function TrafficGraphEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<TrafficGraphInterface>(
    () => (id ? `/traffic-graphs/${id}` : null),
    () => getTrafficGraphById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TrafficGraphInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTrafficGraphById(id, values);
      mutate(updated);
      resetForm();
      router.push('/traffic-graphs');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<TrafficGraphInterface>({
    initialValues: data,
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
              label: 'Update Traffic Graph',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Traffic Graph
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(TrafficGraphEditPage);
