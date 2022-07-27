import { BaseValueObject } from './BaseValueObject';
import { BadRequestException } from '@nestjs/common';

export class StringNullableValueObject extends BaseValueObject<string> {
  protected valuePrimitive?: string;
  MAX_LENGTH = 1000;
  protected MIN_LENGTH = 1;
  protected NAME = 'Base Nullable String';

  protected constructor(value?: string) {
    super(value);
    this.valuePrimitive = value?.trim() ?? null;
    this.validate();
  }

  static create(value: string) {
    return new this(value);
  }

  protected validate(): void {
    if (
      this.valuePrimitive &&
      (this.valuePrimitive?.length > this.MAX_LENGTH ||
        this.valuePrimitive?.length < this.MIN_LENGTH)
    ) {
      throw new BadRequestException(
        `${this.NAME} value should be at least ${this.MIN_LENGTH} and maximum ${this.MAX_LENGTH} characters.`,
      );
    }
  }
}
