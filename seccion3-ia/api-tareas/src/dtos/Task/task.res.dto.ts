export interface TaskItemDto {
  id: string;
  nameTask: string;
  description: string;
  priority: string;
  dateLimit: string;
}

export interface TaskCreateDto {
  id: string;
  title: string;
  limitDate: string;
  status: string;
}

export interface TaskReportDetailDto {
  priorityTask: string;
  countTasks: number;
  promedioDias: number;
}

export interface TaskReportDto {
  Responsable: TaskReportDetailDto[];
}

export interface TaskResDto {
  responseCode: string;
  reasonText:   string;
  TaskCreate?:  TaskCreateDto | null;
  TaskList?:    TaskItemDto[]  | null;
  TaskReport?:  TaskReportDto | null;
}