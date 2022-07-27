import { AppQuery } from '../../../../shared/Application';
import { Address } from '../../../Domain/Address';

export class CheckWeatherQuery implements AppQuery {
  private constructor(public readonly address: Address) {}

  static create(addressObject: Record<string, string>) {
    return new CheckWeatherQuery(Address.fromObject(addressObject));
  }
}
