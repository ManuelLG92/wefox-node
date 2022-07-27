import { BadRequestException } from '@nestjs/common';
import { StringNullableValueObject } from '../../../shared/Domain/ValueObjects';

export class AccessTokenVO extends StringNullableValueObject {
  MAX_LENGTH = 1000;
  MIN_LENGTH = 36;

  constructor(value?: string) {
    super(value ?? null);
    this.valuePrimitive = value ?? null;
    this.validate();
  }

  protected validate(): void {
    if (
      this.valuePrimitive &&
      (this.valuePrimitive?.length > this.MAX_LENGTH ||
        this.valuePrimitive?.length < this.MIN_LENGTH)
    ) {
      throw new BadRequestException(
        `Invalid Access Token. Min length: ${this.MIN_LENGTH},  and Max Length: ${this.MAX_LENGTH}`,
      );
    }
  }
}
