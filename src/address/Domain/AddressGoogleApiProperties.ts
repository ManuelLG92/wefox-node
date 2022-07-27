export enum AddressGoogleApiProperties {
  address = 'address',
  country = 'country',
  zipcode = 'zipcode',
}

export interface AddressGoogleApiPropertiesInterface {
  [AddressGoogleApiProperties.address]: string;
  [AddressGoogleApiProperties.country]: string;
  [AddressGoogleApiProperties.zipcode]: string;
}
