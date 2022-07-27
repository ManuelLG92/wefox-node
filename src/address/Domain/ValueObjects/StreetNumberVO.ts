import { StringValueObject } from '../../../shared/Domain/ValueObjects';

export class StreetNumberVO extends StringValueObject {
  protected MAX_LENGTH = 100;
  protected NAME = 'Street Number';
}
