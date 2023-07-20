import { User } from './user';
import { Token } from './token';
import { Roles } from './roles';

export interface Admin extends User {
  level: number;
  tokens: Token[];
}
