import { Admin } from './admin';
import { Owner } from './owner';
import { Customer } from './customer';

export enum TokenType {
  BEARER = 'BEARER',
}

export interface Token {
  id?: number;
  token: string;
  tokenType: TokenType;
  revoked: boolean;
  expired: boolean;
  admin?: Admin | null;
  owner?: Owner | null;
  customer?: Customer | null;
}
