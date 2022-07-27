import { SetMetadata } from '@nestjs/common';

export const FORCE_AUTH = 'forceAuth';
export const ForceAuth = () => SetMetadata(FORCE_AUTH, true);
