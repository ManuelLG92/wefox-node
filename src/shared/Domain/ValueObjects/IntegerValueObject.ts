import { BaseValueObject } from './BaseValueObject';

export class IntegerValueObject extends BaseValueObject<number> {
  protected valuePrimitive: number;

  protected constructor(value: number) {
    super(value);
    this.valuePrimitive = value;
  }

  static create(value: number) {
    return new this(value);
  }
}
