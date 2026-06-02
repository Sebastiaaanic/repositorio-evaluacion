tengo un problema, como devuelvo directamente lo que me devuelve en el sp, pero esta vez, el sp puede devolver n cantidad de filas, y hay que mostrarlas todas, yo pensaba un arreglo de tipo modelo y le seteaba todo lo que venga de mi consulta, pero dime si hay que modificar el repo que ya tengo y el dto de respuesta que voy a mostrar:

repositorio:

    CustomTaskFind : async (model: TaskFiltersDto): Promise<Record<string, unknown>[]> => {
    const pool = await connectTDB();
    
    const result = await pool.request()
      .input('ID_OPERATION_TYPE', sql.NVarChar, 'CUSTOM_FIND')
      .input('RESPONSABLE', sql.NVarChar, model.responsable)
      .input('STATUS', sql.NVarChar, model.status)
      .input('DESDE', sql.NVarChar, model.desde)
      .input('HASTA', sql.NVarChar, model.hasta)
      .execute('SP_MANAGE_CUSTOMFIND');

    return result.recordset;

  }
service:

  getCustomTask: async (dto: TaskFiltersDto): Promise<TaskResDto> => {
    const result = await TaskRepository.CustomTaskFind(dto);
    const row    = result[0];

    return {
      responseCode: row['responseCode'] as string,
      reasonText:   row['reasonText']   as string,
      Task: {
        id:     model.id,
        title:  model.nameTask,
        limitDate: model.dateLimitTask,
        status: model.statusTask
      }
    };
  },
dto, si puedes apoyame a hacerlo





la creacion, si tengo el dto de entrada, y el modelo que se va ir a mi base de datos, por ejemplo en c# lo que hago es que con la libreria automapper, pero aqui en ts como podria hacerlo?

mport { CreateTaskDTO } from '../dtos/task.create.dto.js';
import { Task } from '../models/task.model.js';

const toTaskModel = (dto: CreateTaskDTO): Task => ({
  title:     dto.title,
  userId:    dto.userId,
  completed: false,
  createdAt: new Date()
});

export const createTask = async (dto: CreateTaskDTO): Promise<TaskResDto> => {
  const taskModel = toTaskModel(dto);  // mapeas aquí
  return createTaskSP(taskModel);
}


 centralizar todo en un objeto dto, y hacerlo con mini objetos de otras interfaces, algo asi como los res
 
 
export interface TaskCreateDto {
  title:         string;
  description:   string;
  priority:      string;
  idResponsable: string;
  dateLimit:     string;
  status:        string;
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
  status:   string;
}

// DTO centralizado
export interface TaskReqDto {
  TaskCreate?:  TaskCreateDto  | null;
  TaskFilters?: TaskFiltersDto | null;
  TaskPatch?:   TaskPatchDto   | null;
}
Y los mapeos crean el objeto centralizado:
typescript// task.profile.ts
import { ParamsDictionary } from 'express-serve-static-core';
import qs from 'qs';
import { TaskReqDto } from './task.req.dto.js';

export const toTaskCreateDto = (body: Record<string, string>): TaskReqDto => ({
  TaskCreate: {
    title:         body.title         ?? '',
    description:   body.description   ?? '',
    priority:      body.priority      ?? '',
    idResponsable: body.idResponsable ?? '',
    dateLimit:     body.dateLimit     ?? '',
    status:        body.status        ?? ''
  },
  TaskFilters: null,
  TaskPatch:   null
});

export const toTaskFiltersDto = (query: qs.ParsedQs): TaskReqDto => ({
  TaskCreate:  null,
  TaskFilters: {
    status:      (query.status      as string) ?? '',
    responsable: (query.responsable as string) ?? '',
    desde:       (query.desde       as string) ?? '',
    hasta:       (query.hasta       as string) ?? ''
  },
  TaskPatch: null
});

export const toTaskPatchDto = (params: ParamsDictionary, body: Record<string, string>): TaskReqDto => ({
  TaskCreate:  null,
  TaskFilters: null,
  TaskPatch: {
    idTask:   params.id      ?? '',
    priority: body.priority  ?? '',
    status:   body.status    ?? ''
  }
});