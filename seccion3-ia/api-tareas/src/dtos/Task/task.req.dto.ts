export interface TaskCreateDto {
  idTask:        string;
  title:         string;
  description:   string;
  priority:      string;
  idResponsable: string;
  dateLimit:     string;
}

export interface TaskFiltersDto {
  status:      string;
  responsable: string;
  desde:       string;
  hasta:       string;
}

export interface TaskPatchDto {
  idTask:   string;
  priority: string;
}

export interface TaskReqDto {
  typeOperation: string;
  TaskCreate?:  TaskCreateDto  | null;
  TaskFilters?: TaskFiltersDto | null;
  TaskPatch?:   TaskPatchDto   | null;
}