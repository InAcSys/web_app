import { Role } from "../role/Role";
import { User } from "../user/User";

export interface SessionData {
  user: User
  role: Role
}