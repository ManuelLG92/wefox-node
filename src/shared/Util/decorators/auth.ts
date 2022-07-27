import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';

export const Auth = createParamDecorator(
  (_data: string, context: ExecutionContext): void => {
    checkData(context.switchToHttp().getRequest());
  },
);

export const checkData = (req: any): void => {
  const check = _.isEqual(
    {
      ip: req.user?.ip,
      hostname: req.user?.hostname,
      userAgent: req.user?.userAgent,
    },
    {
      ip: req.ip,
      hostname: req.headers?.host,
      userAgent: req.headers['user-agent'],
    },
  );

  if (!check) {
    throw new UnauthorizedException('Access forbidden');
  }
};
