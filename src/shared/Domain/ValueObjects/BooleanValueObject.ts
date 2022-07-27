import { BaseValueObject } from './BaseValueObject';

export class BooleanValueObject extends BaseValueObject<boolean> {
  protected valuePrimitive: boolean;

  protected constructor(value: boolean) {
    super(value);
    this.valuePrimitive = value;
  }

  static create(value = false) {
    return new this(value);
  }
}
