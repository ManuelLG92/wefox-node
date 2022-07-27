export type TJwt = {
  email: string;
  ip?: string;
  originalUrl?: string;
  hostname?: string;
  userAgent?: string;
  iat?: number;
  exp?: number;
};
