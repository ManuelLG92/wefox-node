import { AppCommand } from '../../../../shared/Application';
import { ICreateUserPrimitives } from '../../../Domain/Interfaces';

export class CreateUserCommand implements AppCommand {
  constructor(public readonly data: ICreateUserPrimitives) {}
}
