import { BaseValueObject } from './BaseValueObject';
import { BadRequestException } from '@nestjs/common';

export class StringValueObject extends BaseValueObject<string> {
  protected valuePrimitive?: string;
  protected MAX_LENGTH = 255;
  protected MIN_LENGTH = 1;
  protected NAME = 'Base String';

  protected constructor(value?: string) {
    super(value);
    this.valuePrimitive = value.trim();
    this.validate();
  }

  static create(value: string) {
    return new this(value);
  }

  protected validate(): void {
    if (
      !this.valuePrimitive ||
      this.valuePrimitive?.length > this.MAX_LENGTH ||
      this.valuePrimitive?.length < this.MIN_LENGTH
    ) {
      throw new BadRequestException(
        `${this.NAME} value should be at least ${this.MIN_LENGTH} and maximum ${this.MAX_LENGTH} characters.`,
      );
    }
  }
}
