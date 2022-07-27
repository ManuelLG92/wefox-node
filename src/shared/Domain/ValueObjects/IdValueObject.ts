import { BadRequestException } from '@nestjs/common';
import { v4 as uuidV4, validate } from 'uuid';
import { StringValueObject } from './StringValueObject';

export class IdValueObject extends StringValueObject {
  static generate(): IdValueObject {
    return new IdValueObject(uuidV4());
  }

  protected validate(): void {
    if (!validate(this.valuePrimitive)) {
      throw new BadRequestException(
        `Incorrect Uuid format. "${this.valuePrimitive}"`,
      );
    }
  }
}
