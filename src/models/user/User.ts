export interface User {
  firstNames: string;
  lastNames: string;
  shortName: string;
  code?: string;
  lmsId?: number;
  ci: string;
  ciType: string;
  imageUrl?: string;
  address?: string;
  phoneNumber?: string;
  email: string;
  gender: string;
  birthDate: Date;
  roleId: number;
  id: string;
  tenantId: string;
}
