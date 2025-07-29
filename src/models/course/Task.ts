export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  courseId: string;
  tenantId: string;
}

export interface TaskContent {
  id: string
  fileName: string
  extension: string
  url: string
  size: number
  ownerId: string
}
