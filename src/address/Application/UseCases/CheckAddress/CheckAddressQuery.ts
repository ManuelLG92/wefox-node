import { AppQuery } from '../../../../shared/Application';
import { Address } from '../../../Domain/Address';

export class CheckAddressQuery implements AppQuery {
  private constructor(public readonly address: Address) {}

  static create(addressObject: Record<string, string>) {
    return new CheckAddressQuery(Address.fromObject(addressObject));
  }
}
