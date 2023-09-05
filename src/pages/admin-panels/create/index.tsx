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

import { createAdminPanel } from 'apiSdk/admin-panels';
import { adminPanelValidationSchema } from 'validationSchema/admin-panels';
import { OrganizationInterface } from 'interfaces/organization';
import { DeviceInterface } from 'interfaces/device';
import { SiteInterface } from 'interfaces/site';
import { getOrganizations } from 'apiSdk/organizations';
import { getDevices } from 'apiSdk/devices';
import { getSites } from 'apiSdk/sites';
import { AdminPanelInterface } from 'interfaces/admin-panel';

function AdminPanelCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AdminPanelInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAdminPanel(values);
      resetForm();
      router.push('/admin-panels');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AdminPanelInterface>({
    initialValues: {
      organization_id: (router.query.organization_id as string) ?? null,
      device_id: (router.query.device_id as string) ?? null,
      site_id: (router.query.site_id as string) ?? null,
    },
    validationSchema: adminPanelValidationSchema,
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
              label: 'Admin Panels',
              link: '/admin-panels',
            },
            {
              label: 'Create Admin Panel',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Admin Panel
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <AsyncSelect<DeviceInterface>
            formik={formik}
            name={'device_id'}
            label={'Select Device'}
            placeholder={'Select Device'}
            fetcher={getDevices}
            labelField={'name'}
          />
          <AsyncSelect<SiteInterface>
            formik={formik}
            name={'site_id'}
            label={'Select Site'}
            placeholder={'Select Site'}
            fetcher={getSites}
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
              onClick={() => router.push('/admin-panels')}
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
    entity: 'admin_panel',
    operation: AccessOperationEnum.CREATE,
  }),
)(AdminPanelCreatePage);
