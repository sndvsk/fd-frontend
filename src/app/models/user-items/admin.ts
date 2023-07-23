import { User } from './user';
import { Token } from './token';

export interface Admin extends User {
  level: number;
  tokens: Token[];
}
