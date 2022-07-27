import { IdValueObject } from '../ValueObjects';

export abstract class AggregateRoot {
  protected constructor(protected readonly id: IdValueObject) {}
}
