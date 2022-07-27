export * from './UseCases';
import { CheckAddressQueryHandler, CheckWeatherQueryHandler } from './UseCases';

export const QueryHandlers = [
  CheckAddressQueryHandler,
  CheckWeatherQueryHandler,
];
