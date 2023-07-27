import { Roles } from './roles';

export interface User {
  user_id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
  telephone?: string;
  role?: Roles;
  createdAt?: Date;
  updatedAt?: Date;
}
