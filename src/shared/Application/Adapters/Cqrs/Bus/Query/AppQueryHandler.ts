import { IQueryHandler } from '@nestjs/cqrs';
import { AppQuery } from './AppQuery';

export abstract class AppQueryHandler implements IQueryHandler {
  abstract execute(command: AppQuery): Promise<any | Error>;
}
