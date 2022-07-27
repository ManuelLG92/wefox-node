import { BadRequestException } from '@nestjs/common';
import { StringValueObject } from '../../../shared/Domain/ValueObjects';

export class EmailVo extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.valuePrimitive = EmailVo.format(value);
    this.validate();
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }

  protected validate(): void {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!regex.test(this.valuePrimitive)) {
      throw new BadRequestException(
        `Email not valid. "${this.valuePrimitive}"`,
      );
    }
  }
}
