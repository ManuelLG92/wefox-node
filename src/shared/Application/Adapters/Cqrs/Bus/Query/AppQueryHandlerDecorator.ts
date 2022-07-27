import { AppQuery } from './AppQuery';
import { applyDecorators } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

export const AppQueryHandlerDecorator = (handler: AppQuery) => {
  return applyDecorators(QueryHandler(handler));
};
