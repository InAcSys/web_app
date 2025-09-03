export interface User {
  name: string;
  firstnames: string;
  lastnames: string;
  shortname: string;
  code?: string;
  lms_id?: number;
  ci: string;
  imageUrl?: string;
  address?: string;
  phone?: string;
  email: string;
  gender: string;
  birthdate: Date;
  role_id: number;
  id: string;
  tenant_id: string;
}
