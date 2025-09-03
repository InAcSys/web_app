export interface AcademicProgram {
  id?: string;                 // uuid
  name: string;
  description?: string | null;
  code: string;
  degree_type?: string | null;
  duration_type?: string | null;
  periods: number;
  tenant_id: string;          // uuid
}
