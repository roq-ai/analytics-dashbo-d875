import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { deviceValidationSchema } from 'validationSchema/devices';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDevices();
    case 'POST':
      return createDevice();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDevices() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.device
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'device'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createDevice() {
    await deviceValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.admin_panel?.length > 0) {
      const create_admin_panel = body.admin_panel;
      body.admin_panel = {
        create: create_admin_panel,
      };
    } else {
      delete body.admin_panel;
    }
    if (body?.traffic_graph?.length > 0) {
      const create_traffic_graph = body.traffic_graph;
      body.traffic_graph = {
        create: create_traffic_graph,
      };
    } else {
      delete body.traffic_graph;
    }
    const data = await prisma.device.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
