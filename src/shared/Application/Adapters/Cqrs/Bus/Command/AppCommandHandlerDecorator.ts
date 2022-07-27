import { AppCommand } from './AppCommand';
import { applyDecorators } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

export const AppCommandHandlerDecorator = (commandHandler: AppCommand) => {
  return applyDecorators(CommandHandler(commandHandler));
};
