import { StringValueObject } from '../../../shared/Domain/ValueObjects';

export class PostalCodeVO extends StringValueObject {
  protected MAX_LENGTH = 10;
  protected MIN_LENGTH = 5;
  protected NAME = 'Postal code';
}
