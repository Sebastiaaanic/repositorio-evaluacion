import { ParamsDictionary } from 'express-serve-static-core';
import qs from 'qs';
import { TaskReqDto } from './task.req.dto.js';
import { TaskCreateModel, TaskFiltersModel, TaskPatchModel, TaskReportModel } from '../../models/task.model.js';

export const toTaskCreateModel = (dto: TaskReqDto): TaskCreateModel => ({
  id:                crypto.randomUUID().replace(/-/g, ''),
  nameTask:          dto.TaskCreate!.title,
  descriptionTask:   dto.TaskCreate!.description,
  priorityTask:      dto.TaskCreate!.priority,
  idResponsableTask: dto.TaskCreate!.idResponsable,
  dateLimitTask:     dto.TaskCreate!.dateLimit
});

export const toTaskFiltersModel = (query: qs.ParsedQs): TaskFiltersModel => ({
  statusTask:      query.status      as string,
  responsable: query.responsable as string,
  desde:       query.desde       as string,
  hasta:       query.hasta       as string,
});

export const toTaskPatchModel = (params: ParamsDictionary): TaskPatchModel => ({
  idTask:   params.id as string,
  patchPriority: params.patchPriority as string
});

export const toTaskReportModel = (query: qs.ParsedQs): TaskReportModel => ({
  responsable:   query.responsable as string
});