export interface Permission {
  id: number;
  name: string;
  description: string;
  path: string;
  code: string;
}

export interface Category {
  id: number;
  name: string;
  path: string;
  subCategories?: Array<Category>;
  permissions?: Array<Permission>;
}

export interface Permissions {
  categories: Array<Category>;
}
