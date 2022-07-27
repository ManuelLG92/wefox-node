import { StringValueObject } from '../../../shared/Domain/ValueObjects';

export class CountryVO extends StringValueObject {
  protected MAX_LENGTH = 3;
  protected MIN_LENGTH = 2;
  protected NAME = 'Country iso code';
}
