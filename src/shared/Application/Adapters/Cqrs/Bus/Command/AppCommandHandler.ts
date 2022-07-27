import { ICommandHandler } from '@nestjs/cqrs';
import { AppCommand } from './AppCommand';

export abstract class AppCommandHandler implements ICommandHandler {
  abstract execute(command: AppCommand): Promise<any | Error>;
}
