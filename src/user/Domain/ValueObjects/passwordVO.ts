import { BadRequestException } from '@nestjs/common';
import { StringValueObject } from '../../../shared/Domain/ValueObjects';

export class PasswordVO extends StringValueObject {
  MAX_LENGTH = 255;
  MIN_LENGTH = 8;

  constructor(value: string) {
    super(value);
    this.valuePrimitive = value.trim();
    this.validate();
  }

  protected validate(): void {
    if (
      !this.valuePrimitive ||
      this.valuePrimitive?.length > this.MAX_LENGTH ||
      this.valuePrimitive?.length < this.MIN_LENGTH
    ) {
      throw new BadRequestException(
        `Password field cannot be empty or longer than ${this.MAX_LENGTH} `,
      );
    }
  }
}
