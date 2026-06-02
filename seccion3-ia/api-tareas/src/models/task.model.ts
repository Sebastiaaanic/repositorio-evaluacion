export interface TaskCreateModel {
    id:                string;
    nameTask:          string;
    descriptionTask:   string;
    priorityTask:      string;
    idResponsableTask: string;
    dateLimitTask:     string;
}

export interface TaskFiltersModel {
    responsable: string;
    statusTask:  string ;
    desde:       string ;
    hasta:       string ;
}

export interface TaskPatchModel {
    idTask:        string;
    patchPriority: string;
}

export interface TaskReportModel {
    responsable:        string;
}