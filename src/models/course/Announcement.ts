export interface Announcement {
  id: string
  title: string;
  description: string;
  tenantId: string;
  authorId: string;
  subjectId: string;
  isActive: boolean;
  created: Date;
  updated: Date;
  deleted: Date;
}
